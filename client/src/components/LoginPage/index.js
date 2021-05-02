import React from 'react';
import {Button, TextField, CssBaseline,Typography, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia} from '@material-ui/core';
import {useStyles} from './styles';
import image1 from '../../img/img1.jpg';
import * as yup from 'yup';
import {FormikProvider, useFormik} from 'formik';
import {useHistory} from 'react-router-dom';



const validationSchema = yup.object({
  username: yup.string('Enter your username').required('this field is required'),
  password: yup.string('Password is required').min(8, 'password should be minimum of 8 character lenght').required('password is required'),
})

export default function LoginPage({match}){
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues:{
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit:(values, action) => {
      alert(JSON.stringify(values));
      action.setSubmitting(false);
    }

  })

  return(
    <>
      <CssBaseline/>
      <Box className={classes.box} display="flex" justifyContent="center" alignItems="center" height="100vh">

        <Box>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={image1}
              title="laptop Store"
            />
            <CardContent>
              <Typography align="center" variant="h5">
              Login
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />

                <Button variant="contained" color="primary" type="submit" >Login</Button>
                <Button variant="contained" color="secondary" onClick={() => {history.push("/registration")}}>Register</Button>

              </form>
              

            </CardContent>
            <CardActions>

            </CardActions>
          </Card>
        </Box>


      </Box>
    </>

      

  )
}