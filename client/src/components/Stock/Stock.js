import {Grid, Paper, Typography, Container, CssBaseline } from '@material-ui/core';
import { useStyles } from './style';
import React from 'react';
import StockForm from './StockForm/StockForm';
import ItemCard from './ItemCard/ItemCard';
import {useSelector} from 'react-redux';
import EditModal from './EditModal/EditModal';
import {BackdropCircularLoading} from '../../commons/circularLoadings';



const Stock = ({items}) => {

	

	const classes = useStyles();
	const {isLoading} = useSelector( state => state.globalReducer );


	// const orderedItems = items.slice().sort((a, b) => a.createdAt.localeCompare(b.createdAt));//order items based on date creation

	console.log('This is inside OrderedItems = ',items);


	
	//AddStock, View/edit/and Delete Stock
	return(
		<div className={classes.root}>
			<CssBaseline/>
			<Container disableGutters maxWidth="xl" className={classes.stockContainer}>
				<Grid container className={classes.gridContainer}>
					<Grid item xs={12} md={8}>
						<Paper className={classes.paper} square variant="outlined">
							<Typography variant="h5" className=""> Item List</Typography>
							<Grid container spacing={1}>

								{items.map((item, index) => {
									return(
										<Grid key={index} item xs={12} sm={6} md={4}>
											<ItemCard 
												id={item._id}
												image={item.image} 
												name={item.name} 
												brand={item.brand} 
												price={item.price} 
												stock={item.stock}
												expire={item.expire}
												createdAt={item.createdAt}
											/>
										</Grid>
								)})}								
							</Grid>
							
						</Paper>
					</Grid>
					<Grid item md={4}>
						<Paper className={classes.paper} square variant="outlined">
							<StockForm/>
						</Paper>
					</Grid>
				</Grid>
			</Container>

			<EditModal/>
			<BackdropCircularLoading open={isLoading} /> 

			

		</div>
		)
}

export default Stock;