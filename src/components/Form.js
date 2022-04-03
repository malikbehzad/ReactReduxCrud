import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Button, FormControlLabel, FormHelperText, Input, InputLabel, TextField } from '@material-ui/core';
import { setFormData } from '../Redux/actions/studentActions';
import { FormControl } from '@material-ui/core';

const Form = () => {

    const { formDataReducer } = useSelector(state => state);
    const {id,name,email,classs, age}= formDataReducer;
    const dispatch = useDispatch();

    //on change
    const onChange = (e) => {
    const { value, id } = e.target
    console.log("value is :",value , "& id is :",id)
    
    dispatch(setFormData({...formDataReducer, [id]: value } ))

}

  return (
    <div>
        <form >
             <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" margin="dense" type='string'  fullWidth />
             <TextField id="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email" label="Email" variant="outlined" margin="dense" type='email' required fullWidth />
             <TextField id="class" value={classs} onChange={e=>onChange(e)} placeholder="Enter CLass" label="Class" variant="outlined" margin="dense" required fullWidth />
             <TextField id="age" value={age} onChange={e=>onChange(e)} placeholder="Enter Age" label="Age" variant="outlined" margin="dense" type='number' required fullWidth />
             
         </form>
    </div>
  )
}

export default Form