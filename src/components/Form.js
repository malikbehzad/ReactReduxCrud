import { TextField } from '@material-ui/core';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setFormData } from '../Redux/actions/studentActions';

const Form = ({error}) => {

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
              <p style={{color: "red"}}>{error}</p>
             <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" margin="dense" type='string' autoComplete='off' required  fullWidth />
             <TextField id="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email" label="Email" variant="outlined" margin="dense" type='email' autoComplete='off' required fullWidth />
             <TextField id="classs" value={classs} onChange={e=>onChange(e)} placeholder="Enter CLass" label="Class" variant="outlined" margin="dense" autoComplete='off' required fullWidth />
             <TextField id="age" value={age} onChange={e=>onChange(e)} placeholder="Enter Age" label="Age" variant="outlined" margin="dense" type='number' autoComplete='off' required fullWidth />
             
         </form>
    </div>
  )
}

export default Form