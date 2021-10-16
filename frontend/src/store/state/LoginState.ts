import {StorageKeys} from "../../utils/StorageKeys";

export default class LoginState {
    constructor(public currentUsername: string | null) {
    }
}

export const initState = new LoginState(sessionStorage.getItem(StorageKeys.Login));
