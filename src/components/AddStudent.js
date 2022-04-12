import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from "@material-ui/core";
import { useDispatch , useSelector } from "react-redux";
import { setDialogOpen, setFormData, setGridApi } from "../Redux/actions/studentActions";
import FormDialog from './dialog';
import axios from 'axios';



const AddStudent = () => {
    const initialValue = { id: "", name: "", email: "", classs: "", age: "" };
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { formDataReducer, dialogOpenReducer } = useSelector((state) => state);
    const navigate = useNavigate();

    // handling form Open
    const handleClickOpen = () => {
        dispatch(setDialogOpen(true));
      };

      // handling form close
      const handleClose = () => {
        dispatch(setDialogOpen(false));
        dispatch(setFormData(initialValue));
      };

        // useEffect
  useEffect(() => {
    getUsers();
  }, []);

  //fetching user data from server
  const getUsers = () => {
    axios.get('/users').then((resp) => {
      console.log("resp:", resp);
      dispatch(setGridApi(resp.data));
    });
  };

// handleing form submit
      const handleFormSubmit = () => {
        // form validation
        if (!formDataReducer.name) return setError("Name is required");
        if (!formDataReducer.email) return setError("Email is required");
        if (!formDataReducer.classs) return setError("Class is required");
        if (!formDataReducer.age || formDataReducer.age<18 || formDataReducer>=60) return setError("Age is required");
    
        else {
          // adding new user
          axios.post('/users', formDataReducer).then((resp) => {   
            getUsers();
            dispatch(setFormData(initialValue));
            handleClose();
            
          });
          navigate('/');
        }
      };

  return (
    <div>
        <div className="App">
        
        <h3>CRUD Operation with React Redux</h3>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0068ac",
              color: "white",
              fontWeight: "600",
            }}
            onClick={handleClickOpen}
          >
            Add Student
          </Button>
        </Grid>
        </Grid>
        <FormDialog
         error={error}
         handleClose={handleClose}
         handleFormSubmit={handleFormSubmit}
      />
    </div>
  )
}

export default AddStudent