import React, { useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setGridApi,
  setFormData,
} from "../Redux/actions/studentActions";
import axios from "axios";

const initialValue = { id: "", name: "", email: "", classs: "", age: "" };

function Students() {
  const dispatch = useDispatch();
  const { gridApi } = useSelector((state) => state.setApiGridReducer);

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Class", field: "classs" },
    { headerName: "Age", field: "age" },
    {
      headerName: "Actions",
      field: "id",

      cellRendererFramework: (params) => (
        <div>
          {console.log("cell:", params)}
          <Link to={`/updateStudent/${params.data.id}`}>
            <Button
              variant="contained"
              data-testid={`${params.data.id}`}
              style={{
                backgroundColor: "#0068ac",
                width: "40%",
                margin: "2px",
                color: "white",
                fontWeight: "500",
              }}
              onClick={() => handleUpdate(params.data)}
            >
              Update
            </Button>
          </Link>
          <Button
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "lightRed",
              color: "white",
              width: "40%",
              margin: "2px",
              fontWeight: "500",
            }}
            onClick={() => handleDelete(params.value)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

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

  const handleUpdate = (data) => {
    dispatch(setFormData(data));
  };

  //deleting a user
  const handleDelete = (id) => {
    console.log("handle delete id is:", id);
    const confirm = window.confirm(
      "Are you sure, you want to delete this row",
      id
    );
    if (confirm) {
      axios.delete("/users" + `/${id}`).then((resp) => getUsers());
    }
  };

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
      filter: true,
      floatingFilter: true,
    }),
    []
  );

  return (
    <div>
      <div className="App">
        <h3>CRUD Operation with React Redux</h3>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div
            className="ag-theme-alpine"
            style={{
              height: "400px",
              width: "100%",
              margin: "auto",
            }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={gridApi}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize="5"
            ></AgGridReact>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Students;
