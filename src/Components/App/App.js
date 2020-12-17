import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../GlobalStyles/GlobalStyles';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Users from '../Users/Users';
import Partners from '../Partners/Partners';
import Rates from '../Rates/Rates';
import Loader from 'react-loader-spinner';
import Layout from '../../Hoc/Layout/Layout';
import axios from 'axios';
axios.defaults.withCredentials = true;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'http://localhost:3001',
      loggedInUser: {},
      Loading: true
    }
  }
  componentDidMount = () => {

    this.isAuthenticated();

  }

  isAuthenticated = async () => {

    const request = await axios.get(`${this.state.url}/admin/profile/about`);
    if (request.data.user) {
      this.setUserData(request.data.user);
    } else {
      this.setUserData({})
    }
  }

  setUserData = (loggedInUser) => {
    this.setState({
      Loading: false,
      loggedInUser,
    })
  }

  logout = async()=>{
   const request = await axios.post(`${this.state.url}/admin/logout`);
   if(request.data){
     this.setState({
       Loading:true
     })
     this.isAuthenticated()
   } 
  }
  render() {
    let display = (
      <Loader type="Grid" color="#00BFFF" height={100} width={100} timeout={3000} style={{ textAlign: 'center', marginTop: '300px' }} />
    );
    let routes = null;

    if (!this.state.Loading) {
      if (Object.keys(this.state.loggedInUser).length !== 0) {
        routes = (
          <Switch>
            <Route path="/Admin/Dashboard" exact component={Dashboard}></Route>
            <Route path="/Admin/Users" component={Users}></Route>
            <Route path="/Admin/Partners" component={Partners} />
            <Route path="/Admin/Rates" component={Rates}></Route>
            <Redirect from="*" to="/Admin/Dashboard" /> 
          </Switch>
        )
      } else {
        routes = (
          <Switch>
            <Route path="/" exact render={() => <Login isAuthenticated={this.isAuthenticated} />}></Route>
            <Redirect to="/" />
          </Switch>
        )
      }
      display = (

        <Layout user={this.state.loggedInUser} logout={this.logout}>
          {routes}   
        </Layout>

      )
    }
    return (
      <>
        { display}

      </>
    );
  }
}

export default App;
