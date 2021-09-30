import {combineReducers} from "redux";
import AuthReducer from "./reducers/AuthReducer";
import MenuReducer from "./reducers/MenuReducer";
import PagingReducer from "./reducers/PagingReducer";

export default combineReducers({login: AuthReducer, menu: MenuReducer, paging: PagingReducer});