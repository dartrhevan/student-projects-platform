import UserProfile from "../model/UserProfile";
import GenericResponse from "../model/dto/GenericResponse";
import {Login, LoginState} from "../store/state/LoginState";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultDownloadHandler} from "../utils/utils";
import RefreshToken from "../model/dto/RefreshToken";

/**
 * @return current username
 */
export function getCurrentUser() {
    if (sessionStorage.getItem(StorageKeys.AccessToken))
        return fetch('/api/auth/currentuser', {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
            }
        }).then(getDefaultDownloadHandler('Not authorized'));
}

/**
 * @return current user profile
 */
export function getCurrentUserProfile(): Promise<GenericResponse<UserProfile>> {
    return fetch('/api/auth/userprofile', {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(r => r.json())
}

/**
 * @return current username
 */
export function login(login: string, password: string) {
    // console.log(user);
    return fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
    }).then(getDefaultDownloadHandler('Ошибка авторизации'))
        .then((r: GenericResponse<Login>) => {
            return r.data;
        });
}

/**
 * @return current username
 */
export function register(user: UserProfile, password: string) {
    console.log(user);
    return fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: user.username,
            name: user.name,
            surname: user.surname,
            group: user.group,
            interests: user.comment,
            email: user.email,
            roles: user.roles,
            skills: user.skills,
            password
        })
    }).then(getDefaultDownloadHandler('Ошибка регистрации'));
}

/**
 * @return current username
 */
export function update(user: UserProfile, password?: string, newPassword?: string) {
    console.log(user);
    return new Promise<string>((res, rej) => res("vovan")); //TODO: implement
}


export function refreshToken(): Promise<GenericResponse<RefreshToken>> {
    return fetch(`/api/auth/refreshtoken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        },
        body: `{"tokenRefresh": "${sessionStorage.getItem(StorageKeys.RefreshToken)}"}`
    }).then(getDefaultDownloadHandler()).catch(console.log);
}

const REFRESH_TOKEN_TIMEOUT = 2000000;

function refreshTokenScheduler() {
    if (sessionStorage.getItem(StorageKeys.AccessToken) !== null) {
        refreshToken().then(r => r.data).then(r => {
            sessionStorage.setItem(StorageKeys.AccessToken, r.accessToken);
            sessionStorage.setItem(StorageKeys.RefreshToken, r.refreshToken);
            console.log(`Token refreshed access: ${r.accessToken} refresh: ${r.refreshToken}`);
        });
    }
    setTimeout(refreshTokenScheduler, REFRESH_TOKEN_TIMEOUT);
}

setTimeout(refreshTokenScheduler, REFRESH_TOKEN_TIMEOUT);
