import UserLogin from "./UserLogin";

export default class User extends UserLogin {
    constructor(public name: string, public surname: string, public username: string, public password: string) {
        super(username, password);
    }
}
