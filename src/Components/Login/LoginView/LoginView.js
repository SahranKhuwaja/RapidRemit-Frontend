import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';




const LoginView = (props) => {

  return (

    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required')
          })}
          onSubmit={(values, {setSubmitting}) => {

            setTimeout(()=>{
              props.login(values)
              setSubmitting(false)
            },3000)
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
              <form onSubmit={handleSubmit} style={{marginTop:'100px'}}>
                <Box mb={3} style={{ textAlign: 'center' }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    style={{ fontWeight: 'bold' }}
                  >
                    SIGN IN
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
             
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={props.login}
                  >
                    Sign in now
                  </Button>
                  <div style={{textAlign:'center'}}>
                    <p style={{color:'red',fontWeight:'bold',fontSize:'18px'}}>{props.error}</p>
                  </div>
                </Box>
              </form>
            )}
        </Formik>

      </Container>
    </Box>
  );
};

export default LoginView;
