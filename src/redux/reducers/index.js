import { combineReducers } from "redux";
import { shoesReducer } from "./shoesReducer";
import { SNACKBAR_SHOW } from "./snackBar";

const rootReducer = combineReducers({
    snackBar: SNACKBAR_SHOW,
    shoes: shoesReducer,
});

export default rootReducer;
