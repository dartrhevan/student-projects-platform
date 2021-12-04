import {StorageKeys} from "../../utils/StorageKeys";
import {UserLogin} from "../../model/UserProfile";

export class Login {
    constructor(public user: UserLogin, public accessToken: string | null, public refreshToken: string | null) {
    }
}

export function persist(login: Login) {
    localStorage.setItem(StorageKeys.Login, JSON.stringify(login.user));
    localStorage.setItem(StorageKeys.AccessToken, login.accessToken as string);
    localStorage.setItem(StorageKeys.RefreshToken, login.refreshToken as string);
}

export function restore() {
    return localStorage.getItem(StorageKeys.Login) !== null ?
        new Login(JSON.parse(localStorage.getItem(StorageKeys.Login) as string),
            localStorage.getItem(StorageKeys.AccessToken), localStorage.getItem(StorageKeys.RefreshToken)) : null;
}

export function getTokenHeader() {
    return { "Authorization": "Bearer " + localStorage.getItem(StorageKeys.AccessToken) };
}

export type LoginState = Login | null;

export const initState = restore();/*sessionStorage.getItem(StorageKeys.Login) !== null ?
    JSON.parse(<string>sessionStorage.getItem(StorageKeys.Login)) : null;
/*new Login((sessionStorage.getItem(StorageKeys.Login) !== null) ?
        JSON.parse(<string>sessionStorage.getItem(StorageKeys.Login)) : null,
    sessionStorage.getItem(StorageKeys.AccessToken), sessionStorage.getItem(StorageKeys.RefreshToken));*/
