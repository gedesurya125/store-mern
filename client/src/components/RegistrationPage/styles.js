import {makeStyles} from '@material-ui/core/styles';
import { height } from '@material-ui/system';
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
  }
}))