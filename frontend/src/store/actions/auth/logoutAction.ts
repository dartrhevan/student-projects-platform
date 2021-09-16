import {ActionType} from "../../ActionType";
import  {initState} from "../../state/LoginState";

export default function logoutAction() {
    return {
        type: ActionType.Logout,
        payload: initState
    }
};