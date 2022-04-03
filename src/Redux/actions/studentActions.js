const { SET_GRID_API, SET_FORM_DATA, DIALOG_OPEN} = require('../constants/studentConstants');

//create action for list students
export  const setGridApi = (gridApi) => {
    return {
        type: SET_GRID_API,
        payload: gridApi  
    }
}

export const setFormData = (formData) => {
    return {
        type: SET_FORM_DATA,
        payload: formData
    }
}

export const setDialogOpen = (boolean) => {
    return {
        type: DIALOG_OPEN,
        payload: boolean
    }
}

