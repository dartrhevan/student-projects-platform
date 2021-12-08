import {combineReducers} from "redux";
import AuthReducer from "./reducers/AuthReducer";
import MenuReducer from "./reducers/MenuReducer";
import PagingReducer from "./reducers/PagingReducer";
import DialogReducer from "./reducers/DialogReducer";
import LogReducer from "./reducers/LogReducer";
import TagsRefReducer from "./reducers/TagsRefReducer";

export default combineReducers({
    login: AuthReducer, menu: MenuReducer, paging: PagingReducer,
    dialog: DialogReducer, log: LogReducer, tags: TagsRefReducer
});
