import {StorageKeys} from "../../utils/StorageKeys";
import {UserLogin} from "../../model/UserProfile";

export class Login {
    constructor(public user: UserLogin, public accessToken: string, public refreshToken: string) {
    }
}

export type LoginState = Login | null;

export const initState = sessionStorage.getItem(StorageKeys.Login) !== null ?
    JSON.parse(<string>sessionStorage.getItem(StorageKeys.Login)) : null;
/*new Login((sessionStorage.getItem(StorageKeys.Login) !== null) ?
        JSON.parse(<string>sessionStorage.getItem(StorageKeys.Login)) : null,
    sessionStorage.getItem(StorageKeys.AccessToken), sessionStorage.getItem(StorageKeys.RefreshToken));*/
