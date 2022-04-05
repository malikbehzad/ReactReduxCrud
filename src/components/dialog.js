import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { useSelector } from "react-redux";

import Form from "./Form";

export default function FormDialog({ error, handleClose, handleFormSubmit }) {
  const { dialogOpenReducer, formDataReducer } = useSelector((state) => state);
  console.log("formReducer:", formDataReducer);

  return (
    <div>
      <Dialog
        style={{ padding: "0px" }}
        open={dialogOpenReducer}
        onClose={handleClose}
      >
        <DialogContent
          style={{ padding: "0px", overflowX: "hidden", overflowY: "hidden" }}
        >
          <Form
            error={error}
            handleClose={handleClose}
            handleFormSubmit={handleFormSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
