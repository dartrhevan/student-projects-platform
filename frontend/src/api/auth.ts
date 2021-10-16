import UserProfile from "../model/UserProfile";
import GenericResponse from "../model/dto/GenericResponse";

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
        'XXX', '', 'QWERTY', ['backend'], [])))); //TODO: implement
}

/**
 * @return current username
 */
export function login(login: string, password: string) {
    // console.log(user);
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
export function register(user: UserProfile, password: string) {
    console.log(user);
    return new Promise<string>((res, rej) => res("vovan")); //TODO: implement
}

/**
 * @return current username
 */
export function update(userId: string, user: UserProfile, password?: string, newPassword?: string) {
    console.log(user);
    return new Promise<string>((res, rej) => res("vovan")); //TODO: implement
}
