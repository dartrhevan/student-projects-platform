import Action from "../../Action";
import {ActionType} from "../../ActionType";
import LoginState, {initState} from "../../state/LoginState";

export default function login() {
    return {
        type: ActionType.Login,
        payload: initState
    }
};