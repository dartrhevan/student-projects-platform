import UserProfile from "../model/UserProfile";
import GenericResponse from "../model/dto/GenericResponse";
import {Login, LoginState} from "../store/state/LoginState";
import {StorageKeys} from "../utils/StorageKeys";

/**
 * @return current username
 */
export function getCurrentUser() {
    if (sessionStorage.getItem(StorageKeys.AccessToken))
        return fetch('/api/auth/currentuser', {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
            }
        }).then(r => {
            if (!r.ok) {
                throw new Error("Not authorized");
            }
            return r.json();
        })//TODO: civil & universal error handling
}

/**
 * @return current user profile
 */
export function getCurrentUserProfile() {
    return new Promise<GenericResponse<UserProfile>>((res, rej) => res(new GenericResponse(new UserProfile(
        'XXX', '', 'QWERTY', '', ['backend'], [])))); //TODO: implement
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
    }).then(r => {
        if (r.ok) {
            return r.json();
        } else {
            // const obj = (r.json() as any);
            throw "Error auth"; //TODO: error catch
        }
    }).then((r: GenericResponse<Login>) => {
        return r.success ? (alert(r.message), null) : r.data;
    }).catch(r => (alert(r), null));
    // return new Promise<GenericResponse<LoginState>>((res, rej) => res("vovan")); //TODO: implement
}

/**
 * @return nothing
 */
// export function logout() {
//     return new Promise<string>((res, rej) => res('')); //TODO: implement
// }

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
    }).then(r => {
        if (r.ok) {
            return r.json();
        } else {
            // const obj = (r.json() as any);
            throw "Error auth";
        }
    }).then((r: GenericResponse<Login>) => {
        return r.success ? (alert(r.message), null) : r.data;
    }).catch(r => (alert(r), null));//new Promise<string>((res, rej) => res("vovan")); //TODO: implement
}

/**
 * @return current username
 */
export function update(userId: string, user: UserProfile, password?: string, newPassword?: string) {
    console.log(user);
    return new Promise<string>((res, rej) => res("vovan")); //TODO: implement
}
