import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    background: theme.palette.primary.main,
    padding: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    fontWeight: 'bolder',
  },

  box: {
    [theme.breakpoints.up('xs')]:{
      width: '95%',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
    }
  },

  innerBox: {
    padding: theme.spacing(1),
    background: theme.palette.background.paper,
  },
  buttonBox: {
    '& Button':{
      margin: theme.spacing(1),
    }
  }

}))