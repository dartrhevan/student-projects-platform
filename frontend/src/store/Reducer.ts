import {combineReducers} from "redux";
import AuthReducer from "./reducers/AuthReducer";
import MenuReducer from "./reducers/MenuReducer";
import PagingReducer from "./reducers/PagingReducer";
import DialogReducer from "./reducers/DialogReducer";

export default combineReducers({login: AuthReducer, menu: MenuReducer, paging: PagingReducer, dialog: DialogReducer});