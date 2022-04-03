import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useSelector } from 'react-redux';

import Form from './Form';

export default function FormDialog({handleClose,handleFormSubmit}) {


  const {dialogOpenReducer,formDataReducer} =useSelector(state => state);
  const {id}= formDataReducer;
 console.log("formReducer:",formDataReducer);

  return (
    <div>
      <Dialog
        open={dialogOpenReducer}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{id?"Update Student":"Create new Student"}</DialogTitle>
        <DialogContent>
          <Form/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button type='submit'  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {id?"Update":"Submit"}
            
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
