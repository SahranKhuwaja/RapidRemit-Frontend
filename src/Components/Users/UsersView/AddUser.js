import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Visibility, VisibilityOff, Person, People, LocationOn, LocationCity, Wc, Email, Lock, ContactMail } from '@material-ui/icons';
import {
    Box, Card, Checkbox, Typography, makeStyles, Button, Container, FormHelperText, Link, TextField, InputAdornment,
    IconButton, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import Countries from '../../../Countries/Countries';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const AddUser = ({ className, showPassword, invertView, showConfirmPassword, invertView2, save, ...rest }) => {

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
                            Email: '',
                            FirstName: '',
                            LastName: '',
                            Gender:'Male',
                            Country:'Afghanistan',
                            City:'',
                            Role:'Individual',
                            Password: '',
                            ConfirmPassword:'',
                            policy: false
                        }}
                        validationSchema={
                            Yup.object().shape({
                                FirstName: Yup.string().max(255).required('First Name is required').min(4,'Must have at least 4 characters'),
                                LastName: Yup.string().max(255).required('Last Name is required').min(4,'Must have at least 4 characters'),
                                Gender: Yup.string().max(255).required('Gender is required').min(4,'Must have at least 4 characters'),
                                Country: Yup.string().max(255).required('Country is required').min(4,'Must have at least 4 characters'),
                                City: Yup.string().max(255).required('City is required').min(4,'Must have at least 4 characters'),
                                Role: Yup.string().max(255).required('Role is required').min(4,'Must have at least 4 characters'),
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
                                            The administrator can add, update, and delete users.
                  </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.FirstName && errors.FirstName)}
                                        fullWidth
                                        helperText={touched.FirstName && errors.FirstName}
                                        label="First name"
                                        margin="normal"
                                        name="FirstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.FirstName}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}

                                    />
                                    <TextField
                                        error={Boolean(touched.LastName && errors.LastName)}
                                        fullWidth
                                        helperText={touched.LastName && errors.LastName}
                                        label="Last name"
                                        margin="normal"
                                        name="LastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.LastName}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <People style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormControl variant="outlined"
                                        className={classes.formControl}
                                        fullWidth
                                        margin="normal"
                                        error={Boolean(touched.Gender && errors.Gender)}
                                        helperText={touched.Gender && errors.Gender}
                                        label="Gender"
                                        name="Gender">
                                        <InputLabel id="gender-label">Gender</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            label="Gender"
                                            name="Gender"
                                            margin="normal"
                                            value={values.Gender}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Wc style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            }

                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
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
                                                    return <MenuItem value={e.name} key={Math.random() + i + "SK"}>{e.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        error={Boolean(touched.City && errors.City)}
                                        fullWidth
                                        helperText={touched.City && errors.City}
                                        label="City"
                                        margin="normal"
                                        name="City"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.City}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationCity style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormControl variant="outlined"
                                        className={classes.formControl}
                                        fullWidth margin="normal"
                                        error={Boolean(touched.Role && errors.Role)}
                                        helperText={touched.Role && errors.Role}
                                        label="Role"
                                        name="Role">
                                        <InputLabel id="role-label">Role</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            label="Role"
                                            name="Role"
                                            margin="normal"
                                            value={values.Role}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <ContactMail style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            }

                                        >
                                            <MenuItem value="Individual">Individual</MenuItem>
                                            <MenuItem value="Business">Business</MenuItem>
                                        </Select>
                                    </FormControl>


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

AddUser.propTypes = {
    className: PropTypes.string,
};

export default AddUser;
