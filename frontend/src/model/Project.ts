import Tag from "./Tag";

export enum ProjectRole {
    OWNER,
    PARTICIPANT,
    MENTOR,
    STRANGER
}

export default class Project {
    constructor(public id: string, public workSpaceId: string, public title: string,
                public description: string, public tags: string[]) {
    }
}

export class DetailedProject {
    constructor(public id: string, public workSpaceId: string, public title: string,
                public description: string, public participantLogins: string[], public tags: Tag[],
                public role = ProjectRole.STRANGER) {
    }
}
