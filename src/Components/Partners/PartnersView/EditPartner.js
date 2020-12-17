import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import "yup-phone";
import { Business, Info, LocationCity, Phone, Email, CameraAlt, LocationOn, Cancel, Link } from '@material-ui/icons';
import {
    Box, Card, Checkbox, Typography, makeStyles, Button, Container, FormHelperText, TextField, InputAdornment,
    Avatar, Chip, InputLabel, FormControlLabel, FormControl, FormGroup, FormLabel
} from '@material-ui/core';
import Logo from './avatar.jpg';
import ChipInput from 'material-ui-chip-input';


const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const EditPartner = ({ className, showPassword, invertView, showConfirmPassword, invertView2, save, selectedPartner,
    hoverState, hover, uploadImage, triggerUpload, saveImage, updatePartner, ...rest }) => {

    const classes = useStyles();

    let hoverStyle = {}
    if (hoverState) {
        hoverStyle = { opacity: '0.4' }
    }

    let paymentMethods = ['Credit Card', 'Debit Card', 'Checkque', 'Money Transfers', 'Recurring Cash'];
    let paymentTransferMethods = ['Online', 'Phone', 'Mailing a payment form to the bank'];

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
                            _id:selectedPartner._id,
                            Name: selectedPartner.Name,
                            CompanyType: selectedPartner.CompanyType,
                            AboutExchange: selectedPartner.AboutExchange,
                            Contact: selectedPartner.Contact,
                            Email: selectedPartner.Email,
                            Logo: selectedPartner.Logo,
                            MapCordinates: selectedPartner.MapCordinates!==undefined?selectedPartner.MapCordinates:{},
                            KeyFeatures: selectedPartner.KeyFeatures,
                            Documents: selectedPartner.Documents,
                            PaymentMethods: selectedPartner.PaymentMethods !== undefined ? selectedPartner.PaymentMethods : [],
                            PaymentTransferMethods: selectedPartner.PaymentTransferMethods !== undefined ?
                                selectedPartner.PaymentTransferMethods : [],
                            ISOURL: selectedPartner.ISOURL,
                            AndroidURL: selectedPartner.AndroidURL,
                            WebsiteURL: selectedPartner.WebsiteURL,

                        }}
                        enableReinitialize={true}
                        validationSchema={
                            Yup.object().shape({
                                Name: Yup.string().max(255).required('Name is required').min(4, 'Must have at least 4 characters'),
                                CompanyType: Yup.string().max(255).required('Company Type is required').min(4, 'Must have at least 4 characters'),
                                AboutExchange: Yup.string().max(255).required('About Exchange is required').min(30, 'Must have at least 30 characters'),
                                Contact: Yup.string().max(255).required('Contact is required').phone(),
                                Email: Yup.string().email('Must be a valid Email').max(255).required('Email is required'),
                            })
                        }
                        onSubmit={async (values, { resetForm }) => {
                            updatePartner(values)
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
                                            The administrator can add, update, and delete partners.
                  </Typography>
                                    </Box>
                                    <div onClick={triggerUpload}>
                                        <img
                                            name="Logo"
                                            style={{
                                                height: '200px', display: 'block', marginLeft: 'auto', marginRight: 'auto',
                                                borderRadius: '50%', ...hoverStyle
                                            }}
                                            src={values.Logo !== undefined ?
                                                `data:image/png;base64,${Buffer.from(values.Logo).toString('base64')}` : Logo}
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
                                        style={{ visibility: 'hidden' }} name="Logo" />

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
                                        label="Latitude"
                                        margin="normal"
                                        name="Latitude"
                                        onBlur={handleBlur}
                                        onChange={(event)=>setFieldValue('MapCordinates',{...values.MapCordinates,Latitude:event.target.value})}
                                        value={values.MapCordinates.Latitude}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOn style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        label="Longitude"
                                        margin="normal"
                                        name="Longitude"
                                        onBlur={handleBlur}
                                        onChange={(event)=>setFieldValue('MapCordinates',{...values.MapCordinates,Longitude:event.target.value})}
                                        value={values.MapCordinates.Longitude}
                                        variant="outlined"
                                        style={{ marginLeft: '40px', paddingLeft:'7px' }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOn style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <ChipInput
                                        fullWidth
                                        fullWidthInput
                                        error={Boolean(touched.KeyFeatures && errors.KeyFeatures)}
                                        helperText={touched.KeyFeatures && errors.KeyFeatures}
                                        label="KeyFeatures"
                                        margin="normal"
                                        name="KeyFeatures"
                                        onBlur={handleBlur}
                                        onChange={(value) => values.KeyFeatures.push({ Tag: value[value.length-1] })}
                                        variant="outlined"
                                        autoSave={true}
                                        defaultValue={values.KeyFeatures.map(e => e.Tag)}
                                        chipRenderer={({ value, chip, isFocused, isDisabled, handleDelete, handleRequestDelete }, key) => (
                                            <Chip
                                                avatar={<Avatar>{value[0]}</Avatar>}
                                                label={value}
                                                style={{ marginRight: '5px', marginBottom: '10px' }}
                                                clickable
                                                color="primary"
                                                onDelete={handleDelete}
                                                deleteIcon={<Cancel />}
                                            />
                                        )}
                                    />

                                    <ChipInput
                                        fullWidth
                                        fullWidthInput
                                        error={Boolean(touched.Documents && errors.Documents)}
                                        helperText={touched.Documents && errors.Documents}
                                        label="Documents"
                                        margin="normal"
                                        name="Documents"
                                        onBlur={handleBlur}
                                        onChange={(value) => values.Documents.push({ Name: value[value.length-1] })}
                                        variant="outlined"
                                        autoSave={true}
                                        defaultValue={values.Documents.map(e => e.Name)}
                                        chipRenderer={({ value, chip, isFocused, isDisabled, handleDelete, handleRequestDelete }, key) => (
                                            <Chip
                                                avatar={<Avatar>{value[0]}</Avatar>}
                                                label={value}
                                                style={{ marginRight: '5px', marginBottom: '10px' }}
                                                clickable
                                                color="primary"
                                                onDelete={handleDelete}
                                                deleteIcon={<Cancel />}
                                            />
                                        )}
                                    />

                                    <FormControl component="fieldset" className={classes.formControl} style={{ marginTop: '20px' }}>
                                        <FormLabel component="legend">Payment Methods</FormLabel>
                                        <FormGroup style={{ marginLeft: '15px' }}>
                                            {paymentMethods.map((e, i) =>
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        checked={values.PaymentMethods.some(value => value.Name === e)} 
                                                        onChange={(event) => {
                                                            values.PaymentMethods.some(value => value.Name === e) ?
                                                                setFieldValue('PaymentMethods',values.PaymentMethods.filter(el => el.Name !== e))
                                                                : setFieldValue('PaymentMethods',[...values.PaymentMethods, { Name: e }])
                                                        }} 
                                                        name={e} color="primary" />}
                                                        label={e} 
                                                        key={Math.random() + i}
                                                />
                                            )}
                                        </FormGroup>
                                    </FormControl>
                                    <FormControl component="fieldset" className={classes.formControl} style={{ marginTop: '21px' }}>
                                        <FormLabel component="legend">Payment Transfer Methods</FormLabel>
                                        <FormGroup style={{ marginLeft: '15px' }}>

                                            {paymentTransferMethods.map((e, i) =>
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        name={e} color="primary"
                                                        checked={values.PaymentTransferMethods.some(value => value.Name === e)}
                                                        onChange={(event) => {
                                                            values.PaymentTransferMethods.some(value => value.Name === e) ?
                                                                setFieldValue('PaymentTransferMethods',values.PaymentTransferMethods.filter(el => el.Name !== e))
                                                                : setFieldValue('PaymentTransferMethods',[...values.PaymentTransferMethods, { Name: e }])
                                                        }}
                                                    />}
                                                    label={e} key={Math.random() + i}
                                                />
                                            )}
                                        </FormGroup>
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        error={Boolean(touched.ISOURL && errors.ISOURL)}
                                        helperText={touched.ISOURL && errors.ISOURL}
                                        label="ISOURL"
                                        margin="normal"
                                        name="ISOURL"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.ISOURL}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Link style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        error={Boolean(touched.AndroidURL && errors.AndroidURL)}
                                        helperText={touched.AndroidURL && errors.AndroidURL}
                                        label="AndroidURL"
                                        margin="normal"
                                        name="AndroidURL"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.AndroidURL}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Link style={{ color: '#3f51b5' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        error={Boolean(touched.WebsiteURL && errors.WebsiteURL)}
                                        helperText={touched.WebsiteURL && errors.WebsiteURL}
                                        label="WebsiteURL"
                                        margin="normal"
                                        name="WebsiteURL"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.WebsiteURL}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Link style={{ color: '#3f51b5' }} />
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

EditPartner.propTypes = {
    className: PropTypes.string,
};

export default EditPartner;
