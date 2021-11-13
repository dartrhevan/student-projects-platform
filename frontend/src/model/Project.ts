import Tag from "./Tag";
import {IBadge} from "../props.common/ListItemProps";
import {allNotEmpty} from "../utils/utils";

export enum ProjectRole {
    OWNER,
    PARTICIPANT,
    MENTOR,
    STRANGER
}

export enum ProjectStatus {
    NEW = 'Новый',
    IN_PROGRESS = "В разработке",
    ENDED = "Завершён",
    CANCELLED = "Отклонён",
    MODIFYING = "На доработке"
}

export const labelColors = new Map<ProjectStatus, string>();
labelColors.set(ProjectStatus.ENDED, 'brown');
labelColors.set(ProjectStatus.IN_PROGRESS, 'orange');
labelColors.set(ProjectStatus.NEW, 'green');
labelColors.set(ProjectStatus.CANCELLED, 'red');
labelColors.set(ProjectStatus.MODIFYING, 'purple');

export default class Project implements IBadge {
    constructor(public id: string, public workSpaceId: string, public title: string, public description: string,
                public tags: Tag[], public status = ProjectStatus.IN_PROGRESS,
                public label = status, public labelColor = labelColors.get(status) as string) {
    }
}

export class Participant {
    constructor(public login: string, public role: string) {
    }
}

export class DetailedProject {
    constructor(public workSpaceId: string, public id: string = '', public title: string = '',
                public shortDescription: string = '', public fullDescription: string = '',
                public trackerUrl = '', public participants: Participant[] = [], public tags: Tag[] = [],
                public role = ProjectRole.OWNER, public maxParticipantsCount = 5,
                public status = ProjectStatus.NEW) {
    }

    public get isNewFilled() {
        return allNotEmpty(this.workSpaceId, this.shortDescription, this.fullDescription, this.title);
    }

    public withTitle(title: string) {
        const project: DetailedProject = this.clone();
        project.title = title;
        return project;
    }

    public withFullDescription(descr: string) {
        const project: DetailedProject = this.clone();
        project.fullDescription = descr;
        return project;
    }

    public withTrackerUrl(url: string) {
        const project: DetailedProject = this.clone();
        project.trackerUrl = url;
        return project;
    }

    public withShortDescription(descr: string) {
        const project: DetailedProject = this.clone();
        project.shortDescription = descr;
        return project;
    }

    public withTags(tags: Tag[]) {
        const project: DetailedProject = this.clone();
        project.tags = tags;
        return project;
    }

    public withStatus(status: ProjectStatus) {
        const project: DetailedProject = this.clone();
        project.status = status;
        return project;
    }

    public removeParticipant(participant: string) {
        const project: DetailedProject = this.clone();
        project.participants = project.participants.filter(p => p.login !== participant);
        return project;
    }

    public clone(): any {
        const cloneObj = new (this.constructor as any)(this.workSpaceId);
        for (const attribute in this) {
            cloneObj[attribute] = this[attribute]
        }
        return cloneObj;
    }

}
