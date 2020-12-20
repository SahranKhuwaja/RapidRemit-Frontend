import React, { Component } from 'react';
import RatesView from './RatesView/index';
import Snackbar from '../Snackbar/Snackbar';
import axios from 'axios';
axios.defaults.withCredentials = true;

class Rates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://sahran-rapidremit.herokuapp.com/',
            formModal: false,
            formModal2: false,
            rates: [],
            partners: [],
            openSnackbar: false,
            type: '',
            message: '',
            selectedRate:{}
        }
    }

    btn = null;

    componentDidMount = () => {
        this.getRates();
        this.getPartners();
    }

    getRates = async () => {
        const request = await axios.get(`${this.state.url}rate/view`);
        if (request.data.rates) {
            this.setState({
                rates: request.data.rates
            })
        }
    }

    getPartners = async () => {
        const request = await axios.get(`${this.state.url}partner/get/partners`);
        if (request.data.partners) {
            this.setState({
                partners: request.data.partners
            })
        }
    }

    handleOpenModal = (add) => {
        const { formModal, formModal2 } = this.state;
        if (add) {
         return  this.setState({
                formModal: !formModal
            })
        }
        this.setState({
            formModal2: !formModal2
        })
    }

    submitForm = (btn) => {

        this.btn = btn;

    }

    triggerSubmitForm = () => {

        this.btn.click();

    }

    saveRate = async (Rate) => {

        const request = await axios.post(`${this.state.url}rate/add`, Rate);
        if (!request.data) {
            this.openSnackbar('error', `This Provider already had set the rates for the country ${Rate.Country}`, true);
            return false;
        }
        this.openSnackbar('success', 'Rate has been set successfully!', true);
        this.handleOpenModal(true)
        this.getRates();
        return true;
    }

    openSnackbar = (type, message, open) => {
        const { openSnackbar } = this.state;
        this.setState({
            openSnackbar: open !== undefined ? open : !openSnackbar,
            type,
            message,
        })
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.openSnackbar();
    };

    handleClickListner = (selectedRate) => {
          this.setState({
              selectedRate,
              formModal2:true
          })
    }

    deleteRate = async()=>{
        const {url, selectedRate, rates} = this.state;
        const request = await axios.delete(`${url}rate/delete/${selectedRate._id}`);
        if (request.data) {
            let updatedRates = await rates.filter(e => e._id !== selectedRate._id)
            this.setState({
                rates: updatedRates,
            })
            this.openSnackbar('success', 'Deleted Succesfully!', true);
            this.handleOpenModal(false)
        }
    }

    
    updateRate = async (Rate) => {
    
        const { rates, url, selectedRate, partners } = this.state;
        const request = await axios.put(`${url}rate/update/${Rate._id}`, Rate);
        if (!request.data) {
            this.openSnackbar('error',  `This Provider already had set the rates for the country ${Rate.Country}`, true);
            return false;
        }
        this.openSnackbar('success', 'Rate has been updated successfully!', true);
        const updated = await Promise.all(rates.map(async e => {
            if (e._id === Rate._id) {
                if(e.Provider!==Rate.Provider){
                   let findD = await partners.find(el=>el._id===Rate.Provider)
                    e = {...Rate,Name:await findD.Name, WebsiteURL:await findD.WebsiteURL }
                }else{
                    e = Rate
                }
            }
            return e;
        }))
        this.setState({
            rates: updated
        })
        this.handleOpenModal(false)
        return true;
    }

    render() {
        return (
            <div style={{ marginLeft: '260px', marginTop: '90px' }}>
                <RatesView rates={this.state.rates} partners={this.state.partners} handleOpenModal={this.handleOpenModal}
                    formModal={this.state.formModal} formModal2={this.state.formModal2} submitForm={this.submitForm} 
                    triggerSubmitForm={this.triggerSubmitForm} saveRate={this.saveRate} handleClickListner={this.handleClickListner}
                    selectedRate={this.state.selectedRate} deleteRate={this.deleteRate} updateRate={this.updateRate} />

                <Snackbar open={this.state.openSnackbar} close={this.handleClose} type={this.state.type}
                    message={this.state.message} />
            </div>
        )
    }



}


export default Rates;
