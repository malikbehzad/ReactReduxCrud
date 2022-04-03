import { DIALOG_OPEN, SET_FORM_DATA, SET_GRID_API } from "../constants/studentConstants";
const intialState = {
   gridApi: null
  };
  const initialValue = { name: "", email: "", classs: "", age: "" }

export const setApiGridReducer = (state = intialState, { type, payload }) => {
    switch (type) {
      case SET_GRID_API:
        return { ...state, gridApi: payload };
      default:
        return state;
    }
  };

export const formDataReducer = (state = initialValue, { type, payload }) => {
    switch (type) {
      case SET_FORM_DATA:
        return { ...state,  ...payload };
      default:
        return state;
    }
  }

export const dialogOpenReducer = (state = false, { type, payload }) => {
    switch (type) {
      case DIALOG_OPEN:
        return payload;
      default:
        return state;
    }
  }