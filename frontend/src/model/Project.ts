import Tag from "./Tag";
import {IBadge} from "../props.common/ListItemProps";

export enum ProjectRole {
    OWNER,
    PARTICIPANT,
    MENTOR,
    STRANGER
}

export enum ProjectStatus {
    NEW = 'Новый',
    IN_PROGRESS = "В разработке",
    ENDED = "Завершён"
}

const labelColors = new Map<ProjectStatus, string>();
labelColors.set(ProjectStatus.ENDED, 'red');
labelColors.set(ProjectStatus.IN_PROGRESS, '#e7540c');
labelColors.set(ProjectStatus.NEW, 'green');

export default class Project implements IBadge {
    constructor(public id: string, public workSpaceId: string, public title: string, public description: string,
                public tags: Tag[], status = ProjectStatus.NEW,
                public label: string = status, public labelColor = labelColors.get(status) as string) {
    }
}

export class DetailedProject {
    constructor(public id: string, public workSpaceId: string, public title: string, public shortDescription: string,
                public fullDescription: string, public participantLogins: string[], public tags: Tag[],
                public role = ProjectRole.OWNER, status = ProjectStatus.NEW) {
    }
}
