import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Top from '../Top/Panel/index';
import DashboardView from './DashboardView/index';
import Loader from 'react-loader-spinner';
import axios from 'axios';
axios.defaults.withCredentials = true;


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://sahran-rapidremit.herokuapp.com/',
            totalUsers:0,
            totalPartners:0,
            totalRates:0
        }
    }

    componentDidMount = async () => {
        const totalUsers = await this.getTotalUsers();
        const totalPartners = await this.getTotalPartners();
        const totalRates = await this.getTotalRates();
        this.setState({
            totalUsers,
            totalPartners,
            totalRates
        })
    }

    getTotalUsers = async()=>{
        const total = await axios.get(`${this.state.url}user/total`);
        return total.data.total;
    }

    getTotalPartners =async()=>{
        const total = await axios.get(`${this.state.url}partner/total`);
        return total.data.total;
    }

    getTotalRates =async()=>{
        const total = await axios.get(`${this.state.url}rate/total`);
        return total.data.total;
    }


    render() {

        return (
            <div style={{ marginLeft: '260px', marginTop: '90px' }}>
                <DashboardView totalUsers={this.state.totalUsers} totalPartners={this.state.totalPartners} totalRates={this.state.totalRates} />
            </div>

        );
    }
}

export default Dashboard;