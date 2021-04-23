import React from 'react';
import { useStyles } from './style';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import { toggleEditModal, setEditModalContent } from '../../../actions/globals';
import { isoDateToPlain } from '../../../commons/commonFunction';




//COMPONENT
const ItemCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();


  const handleOpenEditModal = () => {
    dispatch(setEditModalContent(props));
    dispatch(toggleEditModal());
    
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleOpenEditModal}>
        <CardMedia
          component="div"
          className={classes.media}
          image={props.image.base64}
          title={props.name}
        />
        
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.brand} 
          </Typography>
           
          <Typography gutterBottom variant="body1">
            {props.name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Rp. {props.price},-
          </Typography>
          <Typography>
            Stock : {props.stock}
          </Typography>
          <Typography>
            Expire : {isoDateToPlain(props.expire)}
          </Typography>

          
        </CardContent>
      </CardActionArea>

    </Card>
  );
}

export default ItemCard;
ItemCard.propTypes = {
  img: PropTypes.object,
  brand: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  stock: PropTypes.number,
  expire: PropTypes.string
}