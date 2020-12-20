import React,{Component} from 'react';
import LoginView from './LoginView/LoginView';
import axios from 'axios';
axios.defaults.withCredentials = true;

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            Url:'https://sahran-rapidremit.herokuapp.com/',
            Error:''
        }
    }

    login = (values)=>{
        this.requestToServer(values);
    }

    requestToServer = async({email,password})=>{

        const request = await axios.post(`${this.state.Url}admin/login`,{email,password});
        if(request.data.user){
                this.setState({
                Error:''
            })
            this.props.isAuthenticated();
        }
        setTimeout(()=>{
            this.setState({
            Error:'Invalid Email/Password!'
        })
        },3000)
        

    }

    render(){
        return(
            <>
                <LoginView login={this.login.bind(this)} error={this.state.Error}/>     
            </>
        );
    }
}

export default Login;