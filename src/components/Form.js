import { TextField, Button, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../Redux/actions/studentActions";
import { FaUserGraduate } from "react-icons/fa";
import "./Form.scss";

const Form = ({ error, handleClose, handleFormSubmit }) => {
  const dispatch = useDispatch();
  const { formDataReducer } = useSelector((state) => state);
  const { id, name, email, classs, age } = formDataReducer;

  //on change
  const onChange = (e) => {
    const { value, id } = e.target;
    console.log("value is :", value, "& id is :", id);

    dispatch(setFormData({ ...formDataReducer, [id]: value }));
  };

  return (
    <div>
      <form className="form">
        <div className="icon-box">
          <FaUserGraduate size={50} className="icon" />
        </div>
        <Typography>{id ? "Update Student" : "Create new Student"}</Typography>
        <hr />
        <p style={{ color: "red" }}>{error}</p>
        <TextField
          id="name"
          value={name}
          onChange={(e) => onChange(e)}
          placeholder="Enter name"
          label="Name"
          margin="dense"
          type="string"
          autoComplete="off"
          required
          fullWidth
          style={{ padding: "1px" }}
        />
        <TextField
          id="email"
          value={email}
          onChange={(e) => onChange(e)}
          placeholder="Enter email"
          label="Email"
          inputProps={{
            type: "email",
            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
          }}
          margin="dense"
          type="email"
          autoComplete="off"
          required
          fullWidth
        />
        <TextField
          id="classs"
          value={classs}
          onChange={(e) => onChange(e)}
          placeholder="Enter CLass"
          label="Class"
          margin="dense"
          autoComplete="off"
          required
          fullWidth
        />
        <TextField
          id="age"
          value={age}
          onChange={(e) => onChange(e)}
          placeholder="Enter Age"
          label="Age"
          inputProps={{ min: "18", max: "60", type: "number" }}
          margin="dense"
          autoComplete="off"
          required
          fullWidth
        />
        <hr />
        <div className="form-button">
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            color="primary"
            onClick={() => handleFormSubmit()}
            variant="contained"
          >
            {id ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
