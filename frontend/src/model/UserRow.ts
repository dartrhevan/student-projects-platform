export enum UserType {
    ORGANIZER = 'Организатор',
    MENTOR = 'Ментор',
    STUDENT = "Студент"
}

export default class UserRow {
    constructor(public name: string, public surname: string, public roles: string,
                public email: string, public userType: UserType, public skills: string,
                public username: string, public projectTitle: string, public interests: string, public messenger?: string) {
    }
}
