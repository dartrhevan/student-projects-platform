import { createSelector } from 'reselect';
import {LoginState} from "../store/state/LoginState";

interface ILoginState {
    login: LoginState
}

export default createSelector(
    (state: ILoginState) => {
        return state.login;
    },
    login => login
);
