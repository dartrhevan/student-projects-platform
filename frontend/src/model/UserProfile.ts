import Tag from "./Tag";

export class UserLogin {
    constructor(public name: string, public surname: string, public username: string) {}
}

export default class UserProfile extends UserLogin {
    constructor(public name: string, public surname: string, public username: string,
                public comment: string, public roles: string[], public skills: Tag[]) {
        super(name, surname, username);
    }
}
