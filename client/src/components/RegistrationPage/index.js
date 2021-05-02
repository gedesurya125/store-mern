import React from 'react';
import {CssBaseline, Box, Paper, TextField, Typography, Button, FormControl, InputLabel, Select } from '@material-ui/core';
import {Form, useFormik} from 'formik';
import * as yup from 'yup';
import {useStyles} from './styles';
import {countryCode} from '../../commons/countryCode';

const validationSchema = yup.object().shape({
  fullName: yup.string('Please fill full name').required('full name is required'),
  nickName: yup.string('Please fill your nick name').required('Nick Name is Required'),
  email: yup.string('Please Fill email').email('please fill correct email').required('Email is required'),
  phone: yup.string('Please Enter Phone Number').required('phone is required'),
  dateOfBirth: yup.date(),
  photo: yup.mixed(),
})


const initialValuesPhoneReducer = {
  countryName: '',
  countryFullName: '',
  phoneCode: '',
  phoneNumber: '',
}

const initPhoneReducer = (data) => ({
  countryName: data.countryName,
  countryFullName: data.countryFullName,
  phoneCode: data.phoneCode,
  phoneNumber: data.phoneNumeber,
})


const phoneReducer = (state, action) => {
  switch(action.type){
    case "SET_COUNTRY_NAME": return {...state, countryName: action.payload};
    case "SET_COUNTRY_FULL_NAME": return {...state, countryFullName: action.payload};
    case "SET_PHONE_CODE": return {...state, phoneCode: action.payload};
    case "SET_PHONE_NUMBER": return {...state, phoneNumber: action.payload};
    default: throw new Error('No action.type matched');
  }
}

const phoneReducerAction = {
  setCountryName : (payload) => ({type: 'SET_COUNTRY_NAME', payload}),
  setCountryFullName: (payload) => ({type: 'SET_COUNTRY_FULL_NAME', payload}),
  setPhoneCode: (payload) => ({type: 'SET_PHONE_CODE', payload}),
  setPhoneNumber: (payload) => ({type: 'SET_PHONE_NUMBER', payload}),
}



export default function RegistrationPage({match}){

  const [phone, dispatchPhone] = React.useReducer(phoneReducer, initialValuesPhoneReducer, initPhoneReducer);


  // const [phoneVal, setPhoneVal] = React.useState('');
  // const [countryName, setCountryName] = React.useState('Country Name');

  const classes = useStyles();

  const formik = useFormik({
    initialValues:{
      fullName: '',
      nickName: '',
      email: '',
      phone: '',
      dateOfBirth: new Date(),
      photo: {},
    },
    validationSchema,
    onSubmit: (values, action) => {
      alert(JSON.stringify(values));
      action.setSubmitting(false);
    }
  })

  const handlePhoneChange = (e) => {
    e.preventDefault();
    const {value} = e.target;
    dispatchPhone(phoneReducerAction.setPhoneNumber);
    console.log('ini panjang value: ', value.length);
    
  }
  console.log('===========================================');
  console.log('ini isi value formik phone', formik.values.phone);

  
  

  return(
    <React.Fragment>
      <CssBaseline/>
      <Box className={classes.root} display="flex" justifyContent="center" alignItems="center">
        <Paper className={classes.paper}>
          <Typography align="center" variant="h5">
            Registration Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="FullName"
              value={formik.values.fullName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              fullWidth={true}
              id="nickName"
              name="nickName"
              label="nickName"
              value={formik.values.nickName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.nickName && Boolean(formik.errors.nickName)}
              helperText={formik.touched.nickName && formik.errors.nickName}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {/* handle by manual */}  
            <FormControl>
              <InputLabel htmlFor="countryName" >{countryName}</InputLabel>
              <Select

              >

              </Select>
            </FormControl>

            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={phoneNumber}
              // onBlur={formik.handleBlur}
              onChange={handlePhoneChange}
              // error={formik.touched.phone && Boolean(formik.errors.phone)}
              // helperText={formik.touched.phone && formik.errors.phone}
            />



          </form>
          
        </Paper>
      </Box>
    </React.Fragment>
  )
}