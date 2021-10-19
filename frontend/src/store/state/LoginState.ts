import {StorageKeys} from "../../utils/StorageKeys";
import {UserLogin} from "../../model/UserProfile";

export class Login {
    constructor(public user: UserLogin, public accessToken: string | null, public refreshToken: string | null) {
    }
}

export function persist(login: Login) {
    sessionStorage.setItem(StorageKeys.Login, JSON.stringify(login.user));
    sessionStorage.setItem(StorageKeys.AccessToken, login.accessToken as string);
    sessionStorage.setItem(StorageKeys.RefreshToken, login.refreshToken as string);
}

export function restore() {
    return sessionStorage.getItem(StorageKeys.Login) !== null ?
        new Login(JSON.parse(sessionStorage.getItem(StorageKeys.Login) as string),
        sessionStorage.getItem(StorageKeys.AccessToken), sessionStorage.getItem(StorageKeys.RefreshToken)) : null;
}

export type LoginState = Login | null;

export const initState = restore();/*sessionStorage.getItem(StorageKeys.Login) !== null ?
    JSON.parse(<string>sessionStorage.getItem(StorageKeys.Login)) : null;
/*new Login((sessionStorage.getItem(StorageKeys.Login) !== null) ?
        JSON.parse(<string>sessionStorage.getItem(StorageKeys.Login)) : null,
    sessionStorage.getItem(StorageKeys.AccessToken), sessionStorage.getItem(StorageKeys.RefreshToken));*/
