import {ActionType} from "../ActionType";
import Action from "../Action";
import LoginState, {initState} from "../state/LoginState";

export default function (state: LoginState = initState, action: Action<LoginState>): LoginState {
    switch (action.type) {
        case ActionType.Login:
        case ActionType.Logout:
            return action.payload;
        default:
            return state;
    }
}