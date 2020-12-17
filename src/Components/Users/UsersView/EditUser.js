import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import 'yup-phone';
import { Formik } from 'formik';
import {
    CameraAlt, Visibility, VisibilityOff, Person, People, LocationOn, LocationCity, Wc, Email,
    Lock, ContactMail, Phone, Home, DateRange
} from '@material-ui/icons';
import {
    Box, Card, Typography, makeStyles, Button, Container, FormHelperText, TextField, InputAdornment, 
    FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import Dp from './Dp.png';
import Countries from '../../../Countries/Countries';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const EditUser = ({ className, showPassword, invertView, showConfirmPassword, invertView2, updateUser,
    selectedUser, hoverState, hover, triggerUpload, uploadImage, saveImage, ...rest }) => {

    const classes = useStyles();

    let hoverStyle = {}
    if (hoverState) {
        hoverStyle = { opacity: '0.4' }
    }

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
                            _id: selectedUser._id,
                            Email: selectedUser.Email,
                            FirstName: selectedUser.FirstName,
                            LastName: selectedUser.LastName,
                            Birthday: selectedUser.Birthday,
                            Gender: selectedUser.Gender,
                            Country: selectedUser.Country,
                            City: selectedUser.City,
                            StreetAddress: selectedUser.StreetAddress,
                            Address: selectedUser.Address,
                            Phone: selectedUser.Phone,
                            Role: selectedUser.Role,
                            Dp: selectedUser.Dp
                        }}
                        enableReinitialize={true}
                        validationSchema={
                            Yup.object().shape({
                                FirstName: Yup.string().max(255).required('First Name is required').min(4, 'Must have at least 4 characters'),
                                LastName: Yup.string().max(255).required('Last Name is required').min(4, 'Must have at least 4 characters'),
                                Gender: Yup.string().max(255).required('Gender is required').min(4, 'Must have at least 4 characters'),
                                Country: Yup.string().max(255).required('Country is required').min(4, 'Must have at least 4 characters'),
                                City: Yup.string().max(255).required('City is required').min(4, 'Must have at least 4 characters'),
                                Role: Yup.string().max(255).required('Role is required').min(4, 'Must have at least 4 characters'),
                                Email: Yup.string().email('Must be a valid Email').max(255).required('Email is required'),
                                Phone: Yup.string().max(255).phone()

                            })
                        }
                        onSubmit={async (values, { resetForm }) => {
                            
                            updateUser(values)

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
                                            The administrator can add, update, and delete users.
                  </Typography>
                                    </Box>

                                    <div onClick={triggerUpload}>
                                        <img
                                            name="Dp"
                                            style={{
                                                height: '200px', display: 'block', marginLeft: 'auto', marginRight: 'auto',
                                                borderRadius: '50%', ...hoverStyle
                                            }}
                                            src={values.Dp !== undefined ?
                                                `data:image/png;base64,${Buffer.from(values.Dp).toString('base64')}` : Dp}
                                            onMouseOver={hover.bind(this, true)} onMouseLeave={hover.bind(this, false)}
                                        />
                                        <CameraAlt style={{
                                            fontSize: '80px', marginTop: '-125px', color: 'darkblue',
                                            visibility: hoverState ? 'visible' : 'hidden', cursor: 'pointer',
                                            left: '55.8%', position: 'absolute'
                                        }}
                                            onMouseOver={hover.bind(this, true)} onMouseLeave={hover.bind(this, true)} />

                                    </div>
                                    <input type="file" ref={(input) => uploadImage(input)} onChange={saveImage}
                                        style={{ visibility: 'hidden' }} name="Dp" />
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
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            variant="dialog"
                                            inputVariant="outlined"
                                            fullWidth
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Birthday"
                                            format="dd/MM/yyyy"
                                            name="Birthday"
                                            value={values.Birthday}
                                            onChange={(date)=>setFieldValue('Birthday',date)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DateRange style={{ color: '#3f51b5' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

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
                                    <TextField
                                        error={Boolean(touched.StreetAddress && errors.StreetAddress)}
                                        fullWidth
                                        helperText={touched.StreetAddress && errors.StreetAddress}
                                        label="Street Address"
                                        margin="normal"
                                        name="StreetAddress"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.StreetAddress}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Home style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        error={Boolean(touched.Address && errors.Address)}
                                        fullWidth
                                        helperText={touched.Address && errors.Address}
                                        label="Address"
                                        margin="normal"
                                        name="Address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Address}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Home style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        error={Boolean(touched.Phone && errors.Phone)}
                                        fullWidth
                                        helperText={touched.Phone && errors.Phone}
                                        label="Phone"
                                        margin="normal"
                                        name="Phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Phone}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Phone style={{ color: '#3f51b5' }} />
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
                                    <Box my={2}>
                                        <Button
                                            color="primary"
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            UPDATE
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

EditUser.propTypes = {
    className: PropTypes.string,
};

export default EditUser;
