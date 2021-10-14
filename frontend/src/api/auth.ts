import UserLogin from "../model/UserLogin";
import User from "../model/User";

/**
 * @return current username
 */
export function getCurrentUser() {
    return new Promise<string>((res, rej) => rej('Not implemented yet')); //TODO: implement
}

/**
 * @return current username
 */
export function login(user: UserLogin) {
    console.log(user);
    return new Promise<string>((res, rej) => res("vovan")); //TODO: implement
}

/**
 * @return nothing
 */
export function logout() {
    return new Promise<string>((res, rej) => res('')); //TODO: implement
}

/**
 * @return current username
 */
export function register(user: User) {
    console.log(user);
    return new Promise<string>((res, rej) => res("vovan")); //TODO: implement
}
