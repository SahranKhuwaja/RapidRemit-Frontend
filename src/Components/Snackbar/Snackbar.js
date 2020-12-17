import React from 'react';
import { Snackbar, Button } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {Close} from '@material-ui/icons';


const SnackbarAlert = (props) => {


    return (

        <>
            <Snackbar
                open={props.open}
                autoHideDuration={6000}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Alert onClose={props.close} autoHideDuration={6000} severity={props.type === 'success' ? 'success' : 'error'} variant="filled"
                        action={
                            <Button color="inherit" size="small" onClick={props.close}>
                                <Close />
                            </Button>
                          }>
                            {props.message}
                </Alert>
            </Snackbar>
        </>


    );
}

export default SnackbarAlert;