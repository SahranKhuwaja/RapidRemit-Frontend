import React from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Box, Card, Checkbox, Typography, makeStyles, Button, Container, FormHelperText, Link, TextField, InputAdornment,
    IconButton, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import { LocationOn, AttachMoney, Schedule, Business } from '@material-ui/icons';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Countries, { values } from '../../../Countries/Countries';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const Modal = (props) => {

    const classes = useStyles();

    return (
        <Dialog open={props.formModal} onClose={props.handleOpenModal} aria-labelledby="form-dialog-title" maxWidth="md">
            <DialogTitle id="form-dialog-title">Add Rates</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add rates, please select the provider and fill all the tax and fee requirements.
          </DialogContentText>
                <Formik
                    initialValues={{
                        Country: 'Afghanistan (AF)',
                        Rate: 0.0,
                        Tax: 0.0,
                        Fee: 0.0,
                        AmountReceivable:0.0,
                        TransferTime: 24,
                        Provider:'',
                    }}
                    validationSchema={
                        Yup.object().shape({
                            Country: Yup.string().max(255).required('Country is required'),
                            Rate: Yup.number().test(
                                'is-decimal',
                                'Rate is required',
                                value => (value + "").match(/^[-+]?\d*\.?\d*$/)),
                            Tax: Yup.number().test(
                                'is-decimal',
                                'Tax is required',
                                value => (value + "").match(/^[-+]?\d*\.?\d*$/)),
                            Fee: Yup.number().test(
                                'is-decimal',
                                'Fee is required',
                                value => (value + "").match(/^[-+]?\d*\.?\d*$/)),
                            AmountReceivable: Yup.number().test(
                                'is-decimal',
                                'Amount Receivable is required',
                                value => (value + "").match(/^[-+]?\d*\.?\d*$/)),
                            TransferTime: Yup.number().test(
                                'is-decimal',
                                'Transfer Time is required',
                                value => (value + "").match(/^[-+]?\d*\.?\d*$/)),
                            Provider: Yup.string().max(255).required('Provider is required')
                        })
                    }
                    onSubmit={async (values, { resetForm }) => {
                        props.saveRate(values)

                    }}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        touched,
                        values
                    }) => (
                            <form onSubmit={handleSubmit} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                <Box mb={3} style={{ textAlign: 'center' }}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h4"
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        Administrator Portal
                  </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        The administrator can add, update, and delete rates.
                  </Typography>
                                </Box>
                                <FormControl variant="outlined"
                                    className={classes.formControl}
                                    fullWidth margin="normal"
                                    label="Provider"
                                    name="Provider"
                                >
                                    <InputLabel id="country-label">Provider</InputLabel>
                                    <Select
                                        labelId="country-label"
                                        label="Provider"
                                        error={Boolean(touched.Provider && errors.Provider)}
                                        helperText={touched.Provider && errors.Provider}
                                        name="Provider"
                                        margin="normal"
                                        value={values.Provider}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Business style={{ color: '#3f51b5' }} />
                                            </InputAdornment>
                                        }
                                    >
                                        {
                                            props.partners.map((e, i) => {
                                                return <MenuItem value={e._id} key={Math.random() + i + "SK"}>{e.Name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined"
                                    className={classes.formControl}
                                    fullWidth margin="normal"
                                    error={Boolean(touched.Country && errors.Country)}
                                    helperText={touched.Country && errors.Country}
                                    label="Country"
                                    name="Country">
                                    <InputLabel id="country-label">Country</InputLabel>
                                    <Select
                                        labelId="country-label"
                                        label="Country"
                                        name="Country"
                                        margin="normal"
                                        value={values.Country}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LocationOn style={{ color: '#3f51b5' }} />
                                            </InputAdornment>
                                        }
                                    >
                                        {
                                            Countries.map((e, i) => {
                                                return <MenuItem value={e.name + ` (${e.code})`} key={Math.random() + i + "SK"}>{e.name + ` (${e.code})`}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    error={Boolean(touched.Rate && errors.Rate)}
                                    fullWidth
                                    helperText={touched.Rate && errors.Rate}
                                    label="Rate"
                                    margin="normal"
                                    name="Rate"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Rate}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoney style={{ color: '#3f51b5' }} />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                                <TextField
                                    error={Boolean(touched.Fee && errors.Fee)}
                                    fullWidth
                                    helperText={touched.Fee && errors.Fee}
                                    label="Fee"
                                    margin="normal"
                                    name="Fee"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Fee}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoney style={{ color: '#3f51b5' }} />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                                <TextField
                                    error={Boolean(touched.Tax && errors.Tax)}
                                    fullWidth
                                    helperText={touched.Tax && errors.Tax}
                                    label="Tax"
                                    margin="normal"
                                    name="Tax"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Tax}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoney style={{ color: '#3f51b5' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    error={Boolean(touched.AmountReceivable && errors.AmountReceivable)}
                                    fullWidth
                                    helperText={touched.AmountReceivable && errors.AmountReceivable}
                                    label="Amount Receivable"
                                    margin="normal"
                                    name="AmountReceivable"
                                    disabled
                                    onBlur={handleBlur}
                                    value={values.AmountReceivable=(parseFloat(values.Rate) - (parseFloat(values.Tax) + parseFloat(values.Fee))).toFixed(2)}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoney style={{ color: '#3f51b5' }} />
                                            </InputAdornment>
                                        ),
                                    }}

                                /> <TextField
                                    error={Boolean(touched.TransferTime && errors.TransferTime)}
                                    fullWidth
                                    helperText={touched.TransferTime && errors.TransferTime}
                                    label="Transfer Time (in hours)"
                                    margin="normal"
                                    name="TransferTime"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.TransferTime}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Schedule style={{ color: '#3f51b5' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button type="submit" ref={(input) => props.submitForm(input)} hidden/>
                            </form>
                        )}
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleOpenModal.bind(this,true)} color="primary">
                    Cancel
          </Button>
                <Button onClick={props.triggerSubmitForm} color="primary">
                    Add
          </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal;