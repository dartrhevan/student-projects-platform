import {ActionType} from "../ActionType";
import Action from "../Action";
import {initState, Login, LoginState, persist} from "../state/LoginState";
import {StorageKeys} from "../../utils/StorageKeys";

export default function (state: LoginState = initState, action: Action<LoginState>): LoginState {
    switch (action.type) {
        case ActionType.Login:
            // sessionStorage.setItem(StorageKeys.Login, JSON.stringify(action.payload))
            persist(action.payload as Login);
            return action.payload;
        case ActionType.Logout:
            sessionStorage.removeItem(StorageKeys.Login)
            sessionStorage.removeItem(StorageKeys.RefreshToken)
            sessionStorage.removeItem(StorageKeys.AccessToken)
            return action.payload;
        default:
            return state;
    }
}
