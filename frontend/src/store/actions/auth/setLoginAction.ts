import Action from "../../Action";
import {ActionType} from "../../ActionType";
import {LoginState} from "../../state/LoginState";

export default function setLoginAction(userLogin: LoginState): Action<LoginState> {
    return {
        type: ActionType.Login,
        payload: userLogin
    };
};
