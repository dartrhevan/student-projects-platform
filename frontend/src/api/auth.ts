import UserProfile from "../model/UserProfile";
import GenericResponse from "../model/dto/GenericResponse";
import {Login, LoginState} from "../store/state/LoginState";

/**
 * @return current username
 */
export function getCurrentUser() {
    return new Promise<string>((res, rej) => rej('Not implemented yet')); //TODO: implement
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
            throw "Error auth";
        }
    }).then((r: GenericResponse<Login>) => {
        return r.success ? (alert(r.message), null) : r.payload;
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
        return r.success ? (alert(r.message), null) : r.payload;
    }).catch(r => (alert(r), null));//new Promise<string>((res, rej) => res("vovan")); //TODO: implement
}

/**
 * @return current username
 */
export function update(userId: string, user: UserProfile, password?: string, newPassword?: string) {
    console.log(user);
    return new Promise<string>((res, rej) => res("vovan")); //TODO: implement
}
