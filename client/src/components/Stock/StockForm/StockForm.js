import React, {useReducer} from 'react';
import {Typography, TextField, Button, Box, LinearProgress, Backdrop} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import {useStyles} from './style';
import {format} from 'date-fns';
import {useDispatch} from 'react-redux';
import {post} from '../../../actions/items';
import {toggleLoading} from '../../../actions/globals';



const initForm = (init) => ({
	brand: init.brand,
	name: init.name,
	price: init.price,
	expire: init.expire,
	stock: init.stock,
	image: init.image,
})

const initState = (init) => ({
	uploadProgress: init.uploadProgress,
	openBackdrop: init.openBackdrop,
});

const formReducer = (state, action) => {
	switch(action.type){
		case 'handleChange': return {...state, ...action.payload};
		case 'reset': return initForm(action.payload);
		default: throw new Error('No Action Match');
	}
}

const stateReducer = (state, action) => {
	switch(action.type) {
		case 'updateUploadProgress': return {...state, uploadProgress: action.payload};
		case 'reset': return initState(action.payload);
		case 'openBackdrop' : return {...state, openBackdrop: action.payload}
		default: throw new Error('No Action Match');
	}
}
//Reducer Action
const updateState = (e) => {
	const data = {
		[e.target.name]: e.target.value
	}

	return{
		type: 'handleChange',
		payload: data
	}
} 

const getFile = (file) => {
	const data = {
		image: file
	}
	return {
		type: 'handleChange',
		payload: data
	}
}


//Converting file to Base64
const toBase64 = async (file, cb) => {
	const reader = new FileReader();
	await reader.readAsDataURL(file);
	reader.onload = () => cb(null, reader.result);
	reader.onerror = (err) => cb(err, null);
}


//Component
const StockForm = (props) => {
	const classes = useStyles()

	const dispatch = useDispatch();

	const formInitial = {
		brand: '',
		name: '',
		price: 0,
		expire: format(new Date(), 'yyyy-MM-dd'),
		stock: 0,
		image: {
			name: '',
			type: '',
			size: 0,
			base64: ''
		},
	} 

	const stateInitial = {
		openBackdrop: false,
		uploadProgress: 0,
		
	}

	const [formData, dspForm] = useReducer(formReducer, formInitial, initForm);

	const [state, dspState] = useReducer(stateReducer, stateInitial, initState);

	const handleChangeForm = (e) => {
		e.preventDefault();
		dspForm(updateState(e));
		dspState({type: 'reset', payload: stateInitial});
	}

	const handleSubmitForm = (e) => {
		e.preventDefault();
	}

	const onClearClicked = (e) =>  {
		e.preventDefault();
		dspForm({type: 'reset', payload: formInitial});
		dspState({type: 'reset', payload: stateInitial});
	}

	const resetAll = () => {
		dspForm({type: 'reset', payload: formInitial});
		setTimeout(() => dspState({type: 'updateUploadProgress', payload: 0}));
		dspState({type: 'openBackdrop', payload: false});
	}

	const onSaveClicked =(e, afterSave) => {
		e.preventDefault();
		console.log('SAVE BUTTON CLIKKED');
		dspState({type: 'openBackdrop', payload: true});

		dispatch(post(formData, (loaded, total) => {
			let progress = Math.round(loaded * 100 / total);
			console.log(`loaded = ${progress} %`);
			dspState({type: 'updateUploadProgress', payload: progress});
		})).then(() => setTimeout(afterSave, 500)).catch(err => console.log(err));
	}

	const handleChangeFile = (e) => {
		const file = e.target.files[0];
		console.log('The Content of File is', e.target.files);
		toBase64(file, (err, res) => {
			err ? console.log('error reade file', err) : dspForm(getFile({
				name: file.name,
				type: file.type,
				size: file.size,
				base64: res
			}));
		});
		dspState({type: 'reset', payload: stateInitial});

	}

	return(
		<div>
			<Typography variant='h5'>
				Input New Item
			</Typography>
			<form onSubmit={handleSubmitForm}>
				<TextField value={formData.brand} onChange={handleChangeForm} name="brand" size="small" margin="dense" label="Brand" variant="outlined" fullWidth/>
				<TextField value={formData.name} onChange={handleChangeForm} name="name" size="small" margin="dense" label="Name" variant="outlined" fullWidth/>
				<TextField value={formData.price} onChange={handleChangeForm} name="price" size="small" margin="dense" label="Price" variant="outlined" fullWidth/>
				<TextField type="date" onChange={handleChangeForm} name="expire" size="small" margin="dense" label="Expire" variant="outlined" fullWidth value={formData.expire}/>
				<TextField value={formData.stock} onChange={handleChangeForm} name="stock" size="small" margin="dense" label="Stock" variant="outlined" fullWidth/>

				<Box className={classes.inputFile}>
					<label htmlFor="image" style={{
						color: '#757575', 
						position: 'absolute', 
						top:'-0.7em', 
						background: 'white',
						padding: '0 0.3em',
						borderRadius: '0.8em'
					}}> Choose Image </label>
					<input type="file" id="image-file-input" accept="image/*" onChange={handleChangeFile} style={{display: 'none'}}/>	
					<label htmlFor="image-file-input">
						<Button variant="contained" color="primary" component="span">
							{/* combination of htmlsFor = "input's id" property on parent label tag and component = "span" on  Button tag can controll input tag, its a MAGIC*/}
							Select Image
						</Button>	
					</label>

					<img src={formData.image.base64} alt="" className={classes.previewImg}/>

				</Box>

				<Box display="flex" justifyContent="center" pt="0.7em">
					<Button onClick={e => onSaveClicked(e, resetAll)} variant="contained" color="primary" size="large" className={classes.button} startIcon={<SaveIcon/>}>
						Save
					</Button>
					<Button payload={formInitial} onClick={onClearClicked} variant="contained" color="secondary" size="large" className={classes.button} startIcon={<ClearIcon/>}>
						Clear
					</Button>
				</Box>
			</form>	

			<Backdrop className={classes.backdrop} open={state.openBackdrop}>
				<div className={classes.progress}>
					<Typography variant='h5' align='center'>Plase Wait...</Typography>
					<LinearProgress variant="determinate" value={state.uploadProgress}/>
					<div style={{
						minWidth: '100%', 
						display: 'flex', 
						justifyContent: 'space-between',
						}}>
						<Typography>Upload Progress : {state.uploadProgress}%</Typography>
						{state.uploadProgress === 100 ? (<Typography color="primary">Success</Typography>): null}
					</div>
				</div>
			</Backdrop>
		</div>
		)
};

export default StockForm;