import {combineReducers} from "redux";
import AuthReducer from "./reducers/AuthReducer";
import MenuReducer from "./reducers/MenuReducer";

export default combineReducers({login: AuthReducer, menu: MenuReducer});