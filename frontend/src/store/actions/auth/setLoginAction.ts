import Action from "../../Action";
import {ActionType} from "../../ActionType";
import LoginState from "../../state/LoginState";

export default function setLoginAction(currentUsername: string): Action<LoginState> {
    return {
        type: ActionType.Login,
        payload: new LoginState(currentUsername)
    };
};