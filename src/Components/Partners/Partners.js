import React, { Component } from 'react';
import PartnersView from './PartnersView/index';
import Snackbar from '../Snackbar/Snackbar'
import axios from 'axios';
axios.defaults.withCredentials = true;

class Partners extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'http://localhost:3001',
            showList: true,
            showPassword: false,
            showConfirmPassword: false,
            openSnackbar: false,
            type: '',
            message: '',
            partners: [],
            showEdit: false,
            selectedPartner: {},
            hover:false,

        }

    }

    fileInput = null;

    componentDidMount = async () => {

        this.getPartners();
    }

    getPartners = async () => {

        const request = await axios.get(`${this.state.url}/partner/view?limit=10&skip=0`);
        if (request.data.partners) {
            this.setState({
                partners: request.data.partners
            })
        }
    }

    addPartner = () => {
        this.invert(false, false)
    }

    invert = (viewPassword, viewEdit) => {
        const { showList, showPassword, showConfirmPassword, showEdit } = this.state;
        this.setState({
            showList: !showList,
            showPassword: viewPassword !== undefined ? viewPassword : showPassword,
            showConfirmPassword: viewPassword !== undefined ? viewPassword : showConfirmPassword,
            showEdit: viewEdit !== undefined ? viewEdit : showEdit
        })
    }


    handleClickShowPassword = () => {
        const { showPassword } = this.state;
        this.setState({
            showPassword: !showPassword
        })
    }

    handleClickShowConfirmPassword = () => {
        const { showConfirmPassword } = this.state;
        this.setState({
            showConfirmPassword: !showConfirmPassword
        })
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    openSnackbar = (type, message, open, show) => {
        const { openSnackbar, showList } = this.state;
        this.setState({
            openSnackbar: open !== undefined ? open : !openSnackbar,
            type,
            message,
            showList: show !== undefined ? show : showList
        })
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.openSnackbar();
    };


    savePartner = async (Partner) => {

        const request = await axios.post(`${this.state.url}/partner/add`, Partner);
        if (!request.data) {
            this.openSnackbar('error', 'This Email Address already exists!', true, false);
            return false;
        }
        this.openSnackbar('success', 'Partner has been created successfully!', true, true)
        this.getPartners();
        return true;
    }

    deletePartners = async (id) => {

            const {partners, url} = this.state;
            const request = await axios.delete(`${url}/partner/delete/${id}`);
            if (request.data) {
                let updatedPartners = await partners.filter(e => e._id !== id)
                this.setState({
                    partners: updatedPartners
                })
                this.openSnackbar('success', 'Deleted Succesfully!', true);
            }

    }
    openEdit = (selectedPartner) => {
        this.setState({
            selectedPartner
        })

        this.invert(false, true);
    }

    hover = (hover)=>{
        this.setState({
            hover
        })
    }

    uploadImage = async (fileInput) => {
        this.fileInput = fileInput
    }
    
    triggerUpload = () => {
        this.fileInput.click()
    }


    saveImage = async (event) => {

        const {selectedPartner, partners} = this.state;
        if (event.target.files[0]) {
            if(!this.validateImage(event.target.files[0].name.split('.')[1].toLowerCase())){
                return this.openSnackbar('error', 'Please upload an image!', true, false);
            }
            const fd = new FormData();
            fd.append('Logo', event.target.files[0]);
            fd.append('id', selectedPartner._id)
            const upload = await axios.post(`${this.state.url}/partner/upload`, fd);
            if (upload.data.image) {
                const updatedPartners = await partners.map(e=>{
                    if(e._id===selectedPartner._id){
                        e.Logo = upload.data.image
                    }
                    return e;
                }) 
                this.setState({
                    selectedPartner:{...selectedPartner, Logo:upload.data.image},
                    hover:false,
                    partners:updatedPartners
                })
                this.openSnackbar('success', 'Logo uploaded succesfully!', true);
            }
        }

    }

    validateImage = (type)=>{
        if(type === 'jpg' || type === 'jpeg' || type === 'png' ){
            return true;
        }
        return false;
    }

    updatePartner = async (Partner) => {

        const { partners, url} = this.state;
        const request = await axios.put(`${url}/partner/update/${Partner._id}`, {...Partner,Logo:undefined});
        if (!request.data) {
            this.openSnackbar('error', 'This Email Address already exists!', true, false);
            return false;
        }
        this.openSnackbar('success', 'Partner has been updated successfully!', true, true)
        const updated = await partners.map(e => {
            if (e._id === Partner._id) {
                e = Partner
            }
            return e;
        }).sort((a,b)=>a.Name>b.Name?1:-1)
        this.setState({
            partners: updated
        })
        return true;
    }


    
    render() {
        return (
            <div style={{ marginLeft: '260px', marginTop: '90px', marginBottom: '20px' }}>
                <PartnersView showList={this.state.showList} showEdit={this.state.showEdit}
                    addPartner={this.addPartner} partners={this.state.partners} invert={this.invert}
                    showPassword={this.state.showPassword} invertView={this.handleClickShowPassword}
                    showConfirmPassword={this.state.showConfirmPassword} invertView2={this.handleClickShowConfirmPassword}
                    save={this.savePartner} delete={this.deletePartners} openEdit={this.openEdit} 
                    selectedPartner={this.state.selectedPartner} hoverState={this.state.hover} hover={this.hover}
                    uploadImage={this.uploadImage} triggerUpload={this.triggerUpload} saveImage={this.saveImage}
                    updatePartner={this.updatePartner}
                />
                <Snackbar open={this.state.openSnackbar} close={this.handleClose} type={this.state.type}
                    message={this.state.message} />
            </div>
        )
    }

}

export default Partners;