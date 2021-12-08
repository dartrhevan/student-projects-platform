export enum UserType {
    ORGANIZER = 'org',//'Организатор',
    MENTOR = 'men',//'Ментор',
    STUDENT = 'std' //"Студент"
}

export default class UserRow {
    constructor(public name: string, public surname: string, public roles: string,
                public email: string, public typeUser: UserType, public skills: string,
                public username: string, public projectTitle: string, public interests: string, public messenger?: string) {
    }
}
