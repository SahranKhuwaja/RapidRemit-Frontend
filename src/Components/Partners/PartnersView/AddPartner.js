import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import "yup-phone";
import { Visibility, VisibilityOff, Business,Info,LocationCity,Phone, Email, Lock,  } from '@material-ui/icons';
import {
    Box, Card, Checkbox, Typography, makeStyles, Button, Container, FormHelperText, Link, TextField,InputAdornment,
    IconButton, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const AddPartner = ({ className, showPassword, invertView, showConfirmPassword, invertView2, save, ...rest }) => {

    const classes = useStyles();

    return (
        <Card className={clsx(classes.root, className)}{...rest} style={{ marginBottom: '20px' }}>
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            Name: '',
                            CompanyType:'',
                            AboutExchange:'',
                            Contact:'',
                            Email: '',
                            Password: '',
                            ConfirmPassword:'',
                            KeyFeatures:[{tag:'Key Features'}],
                            Documents:[{Name:'Documents'}],
                            policy: false
                        }}
                        validationSchema={
                            Yup.object().shape({
                                Name: Yup.string().max(255).required('Name is required').min(4,'Must have at least 4 characters'),
                                CompanyType: Yup.string().max(255).required('Company Type is required').min(4,'Must have at least 4 characters'),
                                AboutExchange: Yup.string().max(255).required('About Exchange is required').min(30,'Must have at least 30 characters'),
                                Contact: Yup.string().max(255).required('Contact is required').phone(),
                                Email: Yup.string().email('Must be a valid Email').max(255).required('Email is required'),
                                Password: Yup.string().max(255).required('Password is required').matches(
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                                    "Must contain at least 8 characters and one uppercase, one lowercase, one number and one special character"
                                  ).min(4,'Must have at least 4 characters'),
                                ConfirmPassword: Yup.string().max(255).required('Confirm Password is required').when("Password", {
                                    is: val => (val && val.length > 0 ? true : false),
                                    then: Yup.string().oneOf(
                                      [Yup.ref("Password")],
                                      "Password doesn't match"
                                    )}),
                                policy: Yup.boolean().oneOf([true], 'Please agree with the terms')
                            })
                        }
                        onSubmit={async (values,{resetForm}) => {
                            if(await save(values)){
                                await resetForm({})
                            }
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
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
                                            The administrator can add, update, and delete partners.
                  </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.Name && errors.Name)}
                                        fullWidth
                                        helperText={touched.Name && errors.Name}
                                        label="Name"
                                        margin="normal"
                                        name="Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Name}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Business style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        error={Boolean(touched.CompanyType && errors.CompanyType)}
                                        fullWidth
                                        helperText={touched.CompanyType && errors.CompanyType}
                                        label="Company Type"
                                        margin="normal"
                                        name="CompanyType"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.CompanyType}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationCity style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        error={Boolean(touched.AboutExchange && errors.AboutExchange)}
                                        fullWidth
                                        helperText={touched.AboutExchange && errors.AboutExchange}
                                        label="About Exchange"
                                        margin="normal"
                                        name="AboutExchange"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.AboutExchange}
                                        variant="outlined"
                                        multiline
                                        rows={5}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Info style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        error={Boolean(touched.Contact && errors.Contact)}
                                        fullWidth
                                        helperText={touched.Contact && errors.Contact}
                                        label="Contact"
                                        margin="normal"
                                        name="Contact"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Contact}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Phone style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    
                                    <TextField
                                        error={Boolean(touched.Email && errors.Email)}
                                        fullWidth
                                        helperText={touched.Email && errors.Email}
                                        label="Email Address"
                                        margin="normal"
                                        name="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="Email"
                                        value={values.Email}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        error={Boolean(touched.Password && errors.Password)}
                                        fullWidth
                                        helperText={touched.Password && errors.Password}
                                        label="Password"
                                        margin="normal"
                                        name="Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        value={values.Password}
                                        variant="outlined"
                                        //onMouseDown={handleMouseDownPassword}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton onClick={invertView}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),

                                        }}
                                    />
                                    <TextField
                                        error={Boolean(touched.ConfirmPassword && errors.ConfirmPassword)}
                                        fullWidth
                                        helperText={touched.ConfirmPassword && errors.ConfirmPassword}
                                        label="Confirm Password"
                                        margin="normal"
                                        name="ConfirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={values.ConfirmPassword}
                                        variant="outlined"
                                        //onMouseDown={handleMouseDownPassword}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton onClick={invertView2}>
                                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),

                                        }}
                                    />
                                    <Box
                                        alignItems="center"
                                        display="flex"
                                        ml={-1}
                                    >
                                        <Checkbox
                                            checked={values.policy}
                                            name="policy"
                                            onChange={handleChange}
                                        />
                                        <Typography
                                            color="textSecondary"
                                            variant="body1"
                                        >
                                            I have read the
                  {' '}
                                            <Link
                                                color="primary"
                                                to="#"
                                                underline="always"
                                                variant="h6"
                                            >
                                                Terms and Conditions
                  </Link>
                                        </Typography>
                                    </Box>
                                    {Boolean(touched.policy && errors.policy) && (
                                        <FormHelperText error>
                                            {errors.policy}
                                        </FormHelperText>
                                    )}
                                    <Box my={2}>
                                        <Button
                                            color="primary"
                                            disabled={Boolean(values.policy===false)}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            ADD
                </Button>
                                    </Box>
                                </form>
                            )}
                    </Formik>
                </Container>
            </Box>
        </Card>
    );



};

AddPartner.propTypes = {
    className: PropTypes.string,
};

export default AddPartner;
