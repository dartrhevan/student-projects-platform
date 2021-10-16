import Tag from "./Tag";
import {IBadge} from "../props.common/ListItemProps";

export enum ProjectRole {
    OWNER,
    PARTICIPANT,
    MENTOR,
    STRANGER
}

export enum ProjectStatus {
    NEW,
    IN_PROGRESS,
    ENDED
}

export default class Project implements IBadge {
    constructor(public id: string, public workSpaceId: string, public title: string,
                public description: string, public tags: Tag[], status = ProjectStatus.NEW) {
    }
}

export class DetailedProject {
    constructor(public id: string, public workSpaceId: string, public title: string, public shortDescription: string,
                public fullDescription: string, public participantLogins: string[], public tags: Tag[],
                public role = ProjectRole.STRANGER, status = ProjectStatus.NEW) {
    }
}
