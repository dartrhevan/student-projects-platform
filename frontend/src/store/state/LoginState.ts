export default class LoginState {
    constructor(public currentUsername: string | null) {
    }
}
export const initState = new LoginState(null);