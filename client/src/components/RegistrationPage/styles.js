import {makeStyles} from '@material-ui/core/styles';

import bgImg from '../../img/Bermuda-Traingle.svg';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: `url(${bgImg})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
  },
  paper: {
    maxWidth: 400,
    padding: 4,
  },

  imgInput: {
    marginTop: theme.spacing(1),
  },
  imgBox: {
    minHeight: '100px',
    width: '100%',
    border: '1px solid black',
  },

  fullWidth: {
    width: '100%'
  },

  img: {
    maxWidth: '100%',
  },

  my1: {
    marginTop: `1em`,
    marginBottom: `1em`,
  }
  
}))