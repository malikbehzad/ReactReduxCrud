import { combineReducers } from 'redux';
import { setApiGridReducer , formDataReducer , dialogOpenReducer } from './studentReducer';


const reducers = combineReducers({
    setApiGridReducer ,
    formDataReducer,
    dialogOpenReducer,
});

export default reducers;
