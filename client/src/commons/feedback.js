import React from 'react'
import {Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Paper, Button} from '@material-ui/core';
import PropTypes from 'prop-types';


export const SimpleDialog = (props) => {
  const {openDialog} = props;
  const [open, setOpen] = React.useState(false);


  openDialog && setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={Paper}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SimpleDialog.propTypes = {
  openDialog: PropTypes.bool,
};

SimpleDialog.defaultProps = {
  openDialog: false,
}