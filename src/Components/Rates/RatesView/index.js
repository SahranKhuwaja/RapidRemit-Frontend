import React from 'react';
import {
  Box,
  Container,
} from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';
import Modal from './Modal';
import Modal2 from './EditAndDeleteModal';

const RatesView = (props) => {

  return (

    <Container maxWidth={false}>
      <Toolbar handleOpenModal={props.handleOpenModal} />
      <Box mt={3}>
        <Results rates={props.rates} handleClickListner={props.handleClickListner} />
        <Modal partners={props.partners} handleOpenModal={props.handleOpenModal} formModal={props.formModal}
          submitForm={props.submitForm} triggerSubmitForm={props.triggerSubmitForm} saveRate={props.saveRate} />
        {Object.keys(props.selectedRate).length!==0?
          <Modal2 partners={props.partners} handleOpenModal={props.handleOpenModal} formModal2={props.formModal2}
            submitForm={props.submitForm} triggerSubmitForm={props.triggerSubmitForm} selectedRate={props.selectedRate}
            deleteRate={props.deleteRate} updateRate={props.updateRate} /> : null}
      </Box>
    </Container>

  );
};

export default RatesView;
