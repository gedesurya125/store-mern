
import {Modal, Backdrop, Fade, Paper, Typography, Grid, Box, TextField, Button, CircularProgress} from '@material-ui/core';
import {useStyles} from './style';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {toggleEditModal, toggleLoading} from '../../../actions/globals';
import {updateById, deleteById} from '../../../actions/items';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {format} from 'date-fns';
import React from 'react';
import {getFileWithBase64} from '../../../commons/commonFunction';
import {WarningButton, DangerButton} from '../../../commons/customComponent';


//Reducer initialization


//COMPONENT
export default function EditModal(){



  //Declaration Section
  const dispatch = useDispatch();
  const classes = useStyles();
  const {isEditModalOpen, editModalContent} = useSelector(state => state.globalReducer);
  const {id, image, name, brand, price, stock, expire} = editModalContent;
  const validationSchema = yup.object().shape({
    image: yup
      .object()
      .required('image is required'),
    brand: yup
      .string('please enter brand')
      .min(2, 'min 2 character length')
      .required('brand is required'),
    name: yup
      .string('please enter item name')
      .min(4, 'name should be minimum of 4 character')
      .required('item name is required'),
    price: yup
      .number('price should be a number')
      .required('price is required')
      .positive('price should be a positive integer value')
      .integer('price should be a positive integer value'),
    stock: yup
      .number('stock should be a positive integer number')
      .required('stock is required')
      .positive('stock should be a positive integer number')
      .integer('stock should be a positive integer number'),
    expire: yup
      .date('please enter the correct date').required('date is required'),
  });

  const formik = useFormik({
    initialValues:{
      image,
      brand,
      name,
      price,
      stock,
      expire: expire ? format(new Date(expire), 'yyyy-MM-dd') : null,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(toggleLoading());
      dispatch(updateById(id, values, () => {
        dispatch(toggleEditModal());
        actions.setSubmitting(false);
        dispatch(toggleLoading());
      }));
      

    
    },
    
  });

  //Action Section
  const handleClose = () => {
    dispatch(toggleEditModal());
  }
  
  //TEST AREA
  console.log('ini ini formik value', formik.values);
  //Use Effect

  const handleChange = (e) => {
    e.preventDefault();
    getFileWithBase64(e, (err, result) => {
      err ? console.log('error formating file : ', err) : formik.setFieldValue('image', result);
    })

  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(toggleLoading());
    dispatch(deleteById(id, () => {
      dispatch(toggleEditModal())
      dispatch(toggleLoading());
    }));
    

  }

  const handleReset = () => {
    let act = window.confirm('reset?');
    act && formik.resetForm();
  }



  return(
    <Modal
      className = { classes.modal }
      open = { isEditModalOpen } 
      onClose = { handleClose }
      closeAfterTransition
      BackdropComponent = { Backdrop }
      BackdropProps = {{timeout: 500}}
    >
      <Fade in={isEditModalOpen}>
        <Box className={classes.box}>
          <Typography className={classes.header} align="center" variant="body1" >EDIT {brand}</Typography>
          <Box className={classes.innerBox}>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Paper>
                  <form onSubmit={formik.handleSubmit}>

                    <Box>
                      <TextField
                      fullWidth
                      id="brand"
                      name="brand"
                      label="Brand"
                      value={formik.values.brand}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} //this is required of formik.touched
                      error={formik.touched.brand && Boolean(formik.errors.brand)}
                      helperText={formik.touched.brand && formik.errors.brand} 
                      />
                      <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} //this is required of formik.touched
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name} 
                      />
                      <TextField
                      fullWidth
                      id="price"
                      name="price"
                      label="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} //this is required of formik.touched
                      error={formik.touched.price && Boolean(formik.errors.price)}
                      helperText={formik.touched.price && formik.errors.price} 
                      />
                      <TextField
                      fullWidth
                      id="stock"
                      name="stock"
                      label="stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} //this is required of formik.touched
                      error={formik.touched.stock && Boolean(formik.errors.stock)}
                      helperText={formik.touched.stock && formik.errors.stock} 
                      />

                      <TextField
                      fullWidth
                      type="date"
                      id="expire"
                      name="expire"
                      label="expire"
                      value={formik.values.expire}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} //this is required of formik.touched
                      error={formik.touched.expire && Boolean(formik.errors.expire)}
                      helperText={formik.touched.expire && formik.errors.expire} 
                      />
                    </Box>

                    


                    <Box className={classes.buttonBox} display="flex" justifyContent="center">
                      <Button type="submit" variant="contained" color="primary">Save</Button>
                      <Button onClick={handleReset} variant="contained" color="secondary" >Reset</Button>
                      <DangerButton onClick={handleDelete} variant="contained">Delete</DangerButton>
                      <WarningButton onClick={handleClose} variant="contained" color="secondary">Cancle</WarningButton>
                    </Box>
                    
                    


                  </form>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper>
                  {formik.values.image ? <img src={formik.values.image.base64} alt={brand} width="100%"/> : null}
                  <Box display="flex" justifyContent="center" >
                    <input type="file" id="image" accept="image/*" onChange={handleChange} style={{display: 'none'}}/>
                    <label htmlFor="image" style={{margin: '1em'}}>
                      <Button component="span" variant="contained" color="primary" >Select Image</Button>
                    </label>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

EditModal.propTypes = {
  isOpen: PropTypes.bool,
}
