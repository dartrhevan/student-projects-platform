import UserProfile from "../model/UserProfile";
import GenericResponse from "../model/dto/GenericResponse";
import {getTokenHeader, Login, LoginState} from "../store/state/LoginState";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultDownloadHandler, getDefaultUploadHandler} from "../utils/utils";
import RefreshToken from "../model/dto/RefreshToken";

/**
 * @return current username
 */
export function getCurrentUser() {
    if (localStorage.getItem(StorageKeys.AccessToken))
        return fetch('/api/users/currentuser', {
            headers: getTokenHeader()
        }).then(getDefaultDownloadHandler('Not authorized'));
}

/**
 * @return current user profile
 */
export function getCurrentUserProfile(): Promise<GenericResponse<UserProfile>> {
    return fetch('/api/users/', {
        headers: getTokenHeader()
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
            messenger: user.messenger,
            password
        })
    }).then(getDefaultDownloadHandler('Ошибка регистрации'));
}

/**
 * @return current username
 */
export function update(user: UserProfile, password?: string, newPassword?: string) {
    let user_json;
    if (newPassword) {
        user_json = {
            login: user.username,
            name: user.name,
            surname: user.surname,
            group: user.group,
            interests: user.comment,
            email: user.email,
            roles: user.roles,
            skills: user.skills,
            messenger: user.messenger,
            password: password,
            newPassword: newPassword
        }
    } else {
        user_json = {
            login: user.username,
            name: user.name,
            surname: user.surname,
            group: user.group,
            interests: user.comment,
            email: user.email,
            roles: user.roles,
            skills: user.skills,
            messenger: user.messenger,
            password: password
        }
    }
    return fetch(`/api/users/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify(user_json)
    }).then(getDefaultUploadHandler());
}


export function refreshToken(): Promise<GenericResponse<RefreshToken>> {
    return fetch(`/api/auth/refreshtoken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: `{"tokenRefresh": "${localStorage.getItem(StorageKeys.RefreshToken)}"}`
    }).then(getDefaultDownloadHandler()).catch(console.log);
}

const REFRESH_TOKEN_TIMEOUT = 2000000;

function refreshTokenScheduler() {
    if (localStorage.getItem(StorageKeys.AccessToken) !== null) {
        refreshToken().then(r => r.data).then(r => {
            localStorage.setItem(StorageKeys.AccessToken, r.accessToken);
            localStorage.setItem(StorageKeys.RefreshToken, r.refreshToken);
            console.log(`Token refreshed access: ${r.accessToken} refresh: ${r.refreshToken}`);
        });
    }
    setTimeout(refreshTokenScheduler, REFRESH_TOKEN_TIMEOUT);
}

setTimeout(refreshTokenScheduler, REFRESH_TOKEN_TIMEOUT);
