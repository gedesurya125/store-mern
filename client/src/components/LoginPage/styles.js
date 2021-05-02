import {makeStyles} from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors';
import bgImg from '../../img/Bermuda-Traingle.svg';


export const useStyles = makeStyles((theme) => ({

  box:{
    backgroundImage: `url(${bgImg})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    textAlign: 'center'
  },
  root:{
    maxWidth: 365,
    '& Button':{
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(2),
    }
  },

  media:{
    height: 200,
    minWidth: 300,
  }

}))