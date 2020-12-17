import React from 'react';
import {
  Box,
  Container,
} from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';
import AddPartner from './AddPartner';
import EditPartner from './EditPartner';


const CustomerListView = (props) => {

  let display = (
    <Results partners={props.partners} delete={props.delete} openEdit={props.openEdit}/>
  );

  if (!props.showList) {
    if (!props.showEdit) {
      display = (
        <AddPartner showPassword={props.showPassword} invertView={props.invertView}
          showConfirmPassword={props.showConfirmPassword}
          invertView2={props.invertView2} save={props.save} />
      )
    }else{
      display=(
        <EditPartner showPassword={props.showPassword} invertView={props.invertView}
          showConfirmPassword={props.showConfirmPassword}
          invertView2={props.invertView2} selectedPartner={props.selectedPartner}
          hoverState={props.hoverState} hover={props.hover} uploadImage={props.uploadImage} triggerUpload={props.triggerUpload}
          saveImage={props.saveImage} updatePartner={props.updatePartner}/>
      )
    }
  }

  return (

    <Container maxWidth={false}>
      <Toolbar addPartner={props.addPartner} showList={props.showList} showEdit={props.showEdit} invert={props.invert} />
      <Box mt={3}>
        {display}
      </Box> 
    </Container>

  );
};

export default CustomerListView;
