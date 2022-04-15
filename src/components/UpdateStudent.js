import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDialogOpen,
  setFormData,
  setGridApi,
} from "../Redux/actions/studentActions";
import axios from "axios";
import Form from "./Form";

const UpdateStudent = () => {
  const initialValue = { id: "", name: "", email: "", classs: "", age: "" };
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { formDataReducer } = useSelector((state) => state);
  const navigate = useNavigate();

  // handling form close
  const handleClose = () => {
    dispatch(setFormData(initialValue));
    navigate("/");
  };

  // useEffect
  useEffect(() => {
    getUsers();
  }, []);

  //fetching user data from server
  const getUsers = () => {
    axios.get("/users").then((resp) => {
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
    if (
      !formDataReducer.age ||
      formDataReducer.age < 18 ||
      formDataReducer >= 60
    )
      return setError("Age is required");
    else if (formDataReducer.id) {
      //updating a user

      axios
        .put("/users" + `/${formDataReducer.id}`, formDataReducer)
        .then((resp) => {
          handleClose();
          getUsers();
          dispatch(setFormData(initialValue));
        });
      navigate("/");
    } else {
      // adding new user
      axios.post("/users", formDataReducer).then((resp) => {
        getUsers();
        dispatch(setFormData(initialValue));
        handleClose();
      });
    }
  };

  return (
    <div>
      <Form
        error={error}
        handleClose={handleClose}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UpdateStudent;
