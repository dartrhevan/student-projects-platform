import {StorageKeys} from "../../utils/StorageKeys";
import {getUsername} from "../../api/auth";

export default class LoginState {
    constructor(public currentUsername: string | null) {
    }
}

export const initState = new LoginState(sessionStorage.getItem(StorageKeys.Login));