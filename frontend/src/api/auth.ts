import UserProfile from "../model/UserProfile";
import GenericResponse from "../model/dto/GenericResponse";
import {Login, LoginState} from "../store/state/LoginState";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultDownloadHandler} from "../utils/utils";

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

export function refreshToken() {
    return new Promise<string>((res, rej) => res('')); //TODO: implement
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
