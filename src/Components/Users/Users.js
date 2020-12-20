import React, { Component } from 'react';
import UsersView from './UsersView/index';
import Snackbar from '../Snackbar/Snackbar';
import axios from 'axios';
axios.defaults.withCredentials = true;


class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://sahran-rapidremit.herokuapp.com/',
            showList: true,
            showPassword: false,
            showConfirmPassword: false,
            openSnackbar: false,
            type: '',
            message: '',
            users: [],
            newSelectedUserIds: [],
            showEdit: false,
            selectedUser: {},
            hover:false,
        }
    }

    componentDidMount = async () => {

        this.getUsers();
    }

    getUsers = async () => {

        const request = await axios.get(`${this.state.url}user/view?limit=10&skip=0`);
        if (request.data.users) {
            this.setState({
                users: request.data.users
            })
        }
    }

    addUser = () => {
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

    saveUser = async (User) => {

        const request = await axios.post(`${this.state.url}user/add`, User);
        if (!request.data) {
            this.openSnackbar('error', 'This Email Address already exists!', true, false);
            return false;
        }
        this.openSnackbar('success', 'User has been created successfully!', true, true)
        this.getUsers();
        return true;
    }

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

    handleSelectAll = (event) => {

        let newSelectedUserIds;
        if (event.target.checked) {
            newSelectedUserIds = this.state.users.map((user) => user._id);
        } else {
            newSelectedUserIds = [];
        }

        this.setState({
            newSelectedUserIds
        })
    };

    handleSelectOne = (id) => {
        const { newSelectedUserIds } = this.state;
        const selectedIndex = newSelectedUserIds.indexOf(id);
        let newnewSelectedUserIds = [];

        if (selectedIndex === -1) {
            newnewSelectedUserIds = newnewSelectedUserIds.concat(newSelectedUserIds, id);
        } else if (selectedIndex === 0) {
            newnewSelectedUserIds = newnewSelectedUserIds.concat(newSelectedUserIds.slice(1));
        } else if (selectedIndex === newSelectedUserIds.length - 1) {
            newnewSelectedUserIds = newnewSelectedUserIds.concat(newSelectedUserIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newnewSelectedUserIds = newnewSelectedUserIds.concat(
                newSelectedUserIds.slice(0, selectedIndex),
                newSelectedUserIds.slice(selectedIndex + 1)
            );
        }

        this.setState({
            newSelectedUserIds: newnewSelectedUserIds
        })
    };

    deleteUsers = async () => {

        const { newSelectedUserIds, url, users } = this.state;
        if (newSelectedUserIds.length === 1) {
            const request = await axios.delete(`${url}user/delete/${newSelectedUserIds[0]}`);
            if (request.data) {
                let updatedUsers = await users.filter(e => e._id !== newSelectedUserIds[0])
                this.setState({
                    users: updatedUsers,
                    newSelectedUserIds: []
                })
                this.openSnackbar('success', 'Deleted Succesfully!', true);
            }
        } else {

            const request = await axios.post(`${url}user/deletemultiple`, newSelectedUserIds);
            if (request.data) {
                const updatedUsers = users.filter(e => {
                    return !newSelectedUserIds.includes(e._id);
                });
                this.setState({
                    users: updatedUsers,
                    newSelectedUserIds: []
                })
                this.openSnackbar('success', 'Deleted Succesfully!', true);
            }

        }

    }

    openEdit = (selectedUser) => {
        this.setState({
            selectedUser
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

        const {selectedUser, users} = this.state;
        if (event.target.files[0]) {
            if(!this.validateImage(event.target.files[0].name.split('.')[1].toLowerCase())){
                return this.openSnackbar('error', 'Please upload an image!', true, false);
            }
            const fd = new FormData();
            fd.append('Dp', event.target.files[0]);
            fd.append('id', selectedUser._id)
            const upload = await axios.post(`${this.state.url}user/upload`, fd);
            if (upload.data.image) {
                const updatedUsers = await users.map(e=>{
                    if(e._id===selectedUser._id){
                        e.Dp = upload.data.image
                    }
                    return e;
                }) 
                this.setState({
                    selectedUser:{...selectedUser, Dp:upload.data.image},
                    hover:false,
                    users:updatedUsers
                })
                this.openSnackbar('success', 'Dp uploaded succesfully!', true);
            }
        }

    }

    validateImage = (type)=>{
        if(type === 'jpg' || type === 'jpeg' || type === 'png' ){
            return true;
        }
        return false;
    }


    updateUser = async (User) => {

        const { users, selectedUser, url } = this.state;
        const request = await axios.put(`${url}user/update/${User._id}`, {...User,Dp:undefined});
        if (!request.data) {
            this.openSnackbar('error', 'This Email Address already exists!', true, false);
            return false;
        }
        this.openSnackbar('success', 'User has been updated successfully!', true, true)
        const updated = await users.map(e => {
            if (e._id === User._id) {
                e = User
            }
            return e;
        })
        this.setState({
            users: updated
        })
        return true;
    }
    render() {

        return (

            <div style={{ marginLeft: '260px', marginTop: '90px' }}>

                <UsersView showList={this.state.showList} add={this.addUser} invert={this.invert}
                    showPassword={this.state.showPassword} invertView={this.handleClickShowPassword}
                    showConfirmPassword={this.state.showConfirmPassword} invertView2={this.handleClickShowConfirmPassword}
                    save={this.saveUser} users={this.state.users} handleSelectAll={this.handleSelectAll}
                    handleSelectOne={this.handleSelectOne} newSelectedUserIds={this.state.newSelectedUserIds}
                    deleteUsers={this.deleteUsers} openEdit={this.openEdit} showEdit={this.state.showEdit}
                    selectedUser={this.state.selectedUser} hoverState={this.state.hover} hover={this.hover}
                    uploadImage={this.uploadImage} triggerUpload={this.triggerUpload} saveImage={this.saveImage} 
                    updateUser={this.updateUser} />

                <Snackbar open={this.state.openSnackbar} close={this.handleClose} type={this.state.type}
                    message={this.state.message} />
            </div>

        );
    }
}

export default Users;