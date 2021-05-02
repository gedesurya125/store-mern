import {Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {yellow, red} from '@material-ui/core/colors';


export const WarningButton  = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow['A200']),
    backgroundColor: yellow['A200'],
    '&:hover' : {
      backgroundColor: yellow['A100']
    }
  }
}))(Button);

export const DangerButton  = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[900]),
    backgroundColor: red[900],
    '&:hover' : {
      backgroundColor: red[800],
    }
  }
}))(Button);