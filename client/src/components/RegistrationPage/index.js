import React from 'react';

import {
  CssBaseline, 
  Box, 
  Paper, 
  TextField, 
  Typography, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  InputAdornment,
  IconButton, 
  Input,
} from '@material-ui/core';

import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'

import {useFormik} from 'formik';
import * as yup from 'yup';
import {useStyles} from './styles';
import {countryCodes} from '../../commons/countryCodes';
import {format} from 'date-fns';
import {classX, getFileWithBase64} from '../../commons/commonFunction';
import {useHistory} from 'react-router-dom';

const validationSchema = yup.object().shape({
  fullName: yup.string('Please fill full name').required('full name is required'),
  nickName: yup.string('Please fill your nick name').required('Nick Name is Required'),
  userName: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null],'password must match').required('please confirm the password above'),
  email: yup.string('Please Fill email').email('please fill correct email').required('Email is required'),
  phone: yup.string('Please Enter Phone Number').required('phone is required'),
  dateOfBirth: yup.date(),
  photo: yup.mixed(),
})



const initialValuesPhoneReducer = {
  countryName: 'INA',
  countryFullName: 'Indonesia',
  phoneCode: '+62',
  phoneNumber: '',
}

const initPhoneReducer = (data) => ({
  countryName: data.countryName,
  countryFullName: data.countryFullName,
  phoneCode: data.phoneCode,
  phoneNumber: data.phoneNumber,
})


const phoneReducer = (state, action) => {
  switch(action.type){

    case "SET_VALUE": return {
      ...state, 
      [action.payload.stateName]:  action.payload.stateValue
    };

    case "SET_VALUES" : return {
      ...state, 
      countryName: action.payload.countryName,
      countryFullName: action.payload.countryFullName,
      phoneCode: action.payload.phoneCode,
      phoneNumber: action.payload.phoneNumber,
    };
    case "RESET" :return initPhoneReducer(initialValuesPhoneReducer);

    default: throw new Error('No action.type matched');
  }
}

const phoneReducerAction = {
  setValue: (stateName, stateValue) => ({type: 'SET_VALUE', payload:{
    stateName, stateValue
  }}),
  setValues: (countryName, countryFullName, phoneCode, phoneNumber) => ({type: 'SET_VALUES', payload: {
    countryName, countryFullName, phoneCode,phoneNumber
  }}),
  reset: () => ({type: 'RESET'})
}


//LOCAL STATE REDUCER MANAGEMENT
const initialState = {
  regForm: {
    isShowPassword: false,
  },
}
const init = (initialState) => ({
  regForm: {
    isShowPassword: initialState.regForm.isShowPassword,
  },
})
const reducer =(state, action) => {
  switch(action.type){
    case 'TOGGLE_SHOW_PASSWORD': return {...state, regForm:{...state.regForm, isShowPassword: !state.regForm.isShowPassword}}
    default: throw new Error('no matched action.type')
  }
};
const stateActions = {
  toggleShowPassword: () => ({type: 'TOGGLE_SHOW_PASSWORD'}),
}



export default function RegistrationPage({match}){
  const history = useHistory();

  const [phone, dispatchPhone] = React.useReducer(phoneReducer, initialValuesPhoneReducer, initPhoneReducer);
  const [state, localDispatch] = React.useReducer(reducer, initialState, init);


  // const [phoneVal, setPhoneVal] = React.useState('');
  // const [countryName, setCountryName] = React.useState('Country Name');

  const classes = useStyles();

  const formik = useFormik({

    initialValues:{
      fullName: '',
      nickName: '',
      userName: '',
      password: '',
      passwordConfirm: '',
      email: '',
      phone: '',
      dateOfBirth: format(new Date(), 'yyyy-MM-dd'),
      photo: {},
    },
    validationSchema,
    onSubmit: (values, action) => {
      alert(JSON.stringify(values));
      action.setSubmitting(false);
    },
    // enableReinitialize: true,
  })


  const formatPhone = (value) => {
    if (!value) return value;
    const val = value.replace(/-/g, '');
    console.log('ini isi dari val', val)
    if(val.length <= 3) return val;
    if(val.length > 3 && val.length <= 6 ) return `${val.slice(0, 3)}-${val.slice(3, 6)}`;
    if(val.length > 6 ) return `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6, 10)}`;
  }

  const setFormikValue = (field, value) => {
    formik.setFieldValue(field, value);
  }

  const mergePhoneNumber = (phoneCode, phoneNumber) => {
    if(!phoneNumber) return;
    const normalizedPhone = phoneNumber.replace(/-/g, '');
    const phoneMerged = phoneCode+normalizedPhone;
    return phoneMerged
  }

  const handlePhoneChange = (e) => {
    e.preventDefault();
    const {value} = e.target;
    const phn = formatPhone(value);
    console.log('ini panjang value: ', phn);
    dispatchPhone(phoneReducerAction.setValue('phoneNumber', phn));
    
    

  }
  const handlePhoneKeyUp = (e) => {
    e.preventDefault();
    const phoneMerged = mergePhoneNumber(phone.phoneCode, phone.phoneNumber);
    console.log('phonemerged: ', phoneMerged);
    setFormikValue('phone',phoneMerged);
  }
  
  /**
   * 
   * @param {{name: string, value:any}} e 
   * @returns 
   */
  const handleOnchangePhoneCode = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    const data = countryCodes.find(countryCode => countryCode.code === value);
    if(value === "") return;
    dispatchPhone(phoneReducerAction.setValue(name, value));
    dispatchPhone(phoneReducerAction.setValue('countryFullName', data.fullName));
    dispatchPhone(phoneReducerAction.setValue('countryName', data.name));
  }
  

  const handleFileSelect = (e) => {
      e.preventDefault();
      getFileWithBase64(e, (err, result) => {
        err ? console.log('error formating file : ', err) : setFormikValue('photo', result);
      })
  }

  const handleShowPassword = (e) => {
    e.preventDefault();
    localDispatch(stateActions.toggleShowPassword());
  }

  const handleUserNameChange = (e) => {
    const {value} = e.target;
    const trimmed = value.replace(/\s/g, '');
    console.log(trimmed);
    setFormikValue('userName', trimmed);
  }

  return(
    <React.Fragment>
      <CssBaseline/>
      <Box className={classes.root} display="flex" justifyContent="center">
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
              fullWidth={true}
              id="userName"
              name="userName"
              label="User Name"
              value={formik.values.userName}
              onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              onChange={handleUserNameChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />

            <TextField
              fullWidth={true}
              type={state.regForm.isShowPassword ? "text" : "password"}
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment:
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} onMouseDown={(e) => e.preventDefault()}>
                    {state.regForm.isShowPassword ? <Visibility/> : <VisibilityOff/>} 
                  </IconButton>
                </InputAdornment>
              }}
            />

            <TextField
              fullWidth={true}
              type={state.regForm.isShowPassword ? "text" : "password"}
              id="passwordConfirm"
              name="passwordConfirm"
              label="PasswordConfirm"
              value={formik.values.passwordConfirm}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
              InputProps={{
                endAdornment:
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} onMouseDown={(e) => e.preventDefault()}>
                    {state.regForm.isShowPassword ? <Visibility/> : <VisibilityOff/>} 
                  </IconButton>
                </InputAdornment>
              }}
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
           
            <Grid container>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="phoneCode-label" >{phone.countryName}</InputLabel>
                  <Select 
                    fullWidth
                    labelId="phoneCode-label"
                    id="phoneCode"
                    name="phoneCode"
                    value={phone.phoneCode}
                    onChange={handleOnchangePhoneCode}
                    
                  >
                      {
                      /**
                       * Show the country code list
                       */
                      countryCodes.map((countryCode, index) => (
                        <MenuItem key={index} value={countryCode.code}>{countryCode.code}</MenuItem>
                      ))
                    }
                  </Select>
                  <FormHelperText>{phone.countryFullName}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  value={phone.phoneNumber}
                  onBlur={formik.handleBlur}
                  onChange={handlePhoneChange}
                  onKeyUp={handlePhoneKeyUp}
                  
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              id="dateOfBirth"
              name="dateOfBirth"
              label="Birthday"
              type="date"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
              helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Grid container className={classes.imgInput} spacing={1}>
              <Grid item xs={6}>
                <Box className={classes.imgBox}>
                  <img className ={classes.img} src={formik.values.photo ? formik.values.photo.base64 : null} alt="no Gambar"/>
                </Box>
                <input id="regImage" name="photo" type="file" accept="image/*" onChange={handleFileSelect} style={{display: 'none'}}/>
                <label htmlFor="regImage" >
                  <Button className={classX([classes.fullWidth])} component="span" variant="contained" color="primary">Select Image</Button>
                </label>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" className={classX([classes.fullWidth])} name="submit" variant="contained" color="primary">Submit</Button>
                <Button onClick={() => history.push('/')} className={classX([classes.fullWidth, classes.my1])} name="cancle" variant="contained" color="secondary">Cancle</Button>
              </Grid>
              
            </Grid>
          </form>
          
        </Paper>
      </Box>
    </React.Fragment>
  )
}