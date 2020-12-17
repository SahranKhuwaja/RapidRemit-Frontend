import React from 'react';
import {
  Box,
  Container,
} from '@material-ui/core';

import Results from './Results';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Toolbar from './Toolbar';


const UsersView = (props) => {

  let display = (
    <Results users={props.users}
      handleSelectAll={props.handleSelectAll}
      handleSelectOne={props.handleSelectOne}
      newSelectedUserIds={props.newSelectedUserIds}
      openEdit={props.openEdit}
    />
  );

  if (!props.showList) {
    if (!props.showEdit) {
      display = (
        <AddUser showPassword={props.showPassword} invertView={props.invertView}
          showConfirmPassword={props.showConfirmPassword}
          invertView2={props.invertView2} save={props.save} />
      )
    }else{
      display=(
        <EditUser showPassword={props.showPassword} invertView={props.invertView}
          showConfirmPassword={props.showConfirmPassword}
          invertView2={props.invertView2} selectedUser={props.selectedUser} 
          hoverState={props.hoverState} hover={props.hover} uploadImage={props.uploadImage} triggerUpload={props.triggerUpload}
          saveImage={props.saveImage} updateUser={props.updateUser}  />
      )
    }
  }

  return (

    <Container maxWidth={false}>
      <Toolbar add={props.add} showList={props.showList} showEdit={props.showEdit} invert={props.invert} 
        newSelectedUserIds={props.newSelectedUserIds.length} deleteUsers={props.deleteUsers} />
      <Box mt={3}>
        {display}
      </Box>
    </Container>

  );
};

export default UsersView;
