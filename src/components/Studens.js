import React, { useEffect,useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, Button } from '@material-ui/core'
import FormDialog from './dialog';
import {useDispatch , useSelector} from 'react-redux'
import {setGridApi,setFormData,setDialogOpen} from '../Redux/actions/studentActions'
import axios from 'axios';

const initialValue = { id:"",name: "", email: "", classs: "", age: "" }

function Students() {
  const dispatch = useDispatch();
  const {gridApi}  = useSelector(state => state.setApiGridReducer);
  const {formDataReducer ,dialogOpenReducer }  = useSelector(state => state);
  const [error , setError] = useState('');
  console.log("error:",error)
  console.log("dialogOpenReducer :",dialogOpenReducer);
  
  const handleClickOpen = () => {

    dispatch(setDialogOpen(true));
  };

  const handleClose = () => {
    
    dispatch(setDialogOpen(false));
    dispatch(setFormData(initialValue))
  };

  const url = `http://localhost:4000/users`

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name", },
    { headerName: "Email", field: "email", },
    { headerName: "Class", field: "classs" },
    { headerName: "Age", field: "age" },
    {
      headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
        {console.log("cell:",params)}
        <Button variant="contained" color="primary" style={{width:"40%", margin: "2px"}} onClick={() => handleUpdate(params.data)}>Update</Button>
        <Button variant="contained" color="secondary" style={{backgroundColor: "crimson", color: "white", width:"40%", margin: "2px"}} onClick={() => handleDelete(params.value)}>Delete</Button>
      </div>
    }
  ]
  // useEffect
  useEffect(() => {
    getUsers()
  }, [])

  //fetching user data from server
  const getUsers = () => {
    axios.get(url).then(resp => {
      console.log("resp:",resp)
      dispatch(setGridApi(resp.data))
    })
  }
 
 
 
  const handleUpdate = (data) => {
    dispatch(setFormData(data))
    handleClickOpen()
  }
  //deleting a user
  const handleDelete = (id) => {
    console.log("handle delete id is:",id)
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
           axios.delete(url + `/${id}`).then(resp => getUsers())
    }
  }
  const handleFormSubmit = () => {
    if(formDataReducer.name === "") {
      return setError("Please fill all the fields")
    }
   
    if (formDataReducer.id) {
      
      //updating a user 

      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && axios.put(url + `/${formDataReducer.id}`, formDataReducer).then(resp => {
        handleClose()
        getUsers()
        dispatch(setFormData(initialValue))

      })
    } else {
      
      // adding new user
      axios.post(url, formDataReducer).then(resp => {
        getUsers()
        dispatch(setFormData(initialValue))
        handleClose()
      })
    }
  }

  const defaultColDef = {
    sortable: true,
    flex: 1, filter: true,
    floatingFilter: true
  }

  return (

    <div>
      <div className="App">
       <h1 align="center">Students Data</h1>
       <h3>CRUD Operation with React Redux</h3>
         </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Student</Button>
        </Grid>
        <Grid item xs={12}>
          <div
            className="ag-theme-alpine"
            style={{
              height: '400px',
              width: '100%',
              margin: 'auto'
              
            }}
          >
            <AgGridReact 
              columnDefs={columnDefs}
              rowData={gridApi}
              defaultColDef={defaultColDef}
              pagination={true}
               paginationPageSize="5"
            >
            </AgGridReact>
          </div>
        </Grid>
      </Grid>
      <FormDialog error={error}  handleClose={handleClose} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}


export default Students;