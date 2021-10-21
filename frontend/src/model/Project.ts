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
    ENDED = "Завершён"
}

const labelColors = new Map<ProjectStatus, string>();
labelColors.set(ProjectStatus.ENDED, 'red');
labelColors.set(ProjectStatus.IN_PROGRESS, '#e7540c');
labelColors.set(ProjectStatus.NEW, 'green');

export default class Project implements IBadge {
    constructor(public id: string, public workSpaceId: string, public title: string, public description: string,
                public tags: Tag[], public status = ProjectStatus.NEW, public label= status,
                public labelColor = labelColors.get(status) as string) {
    }
}

export class DetailedProject {
    constructor(public workSpaceId: string, public id: string = '', public title: string = '',
                public shortDescription: string = '', public fullDescription: string = '',
                public participantLogins: string[] = [], public tags: Tag[] = [],
                public role = ProjectRole.OWNER, public maxParticipantsCount = 5,
                public status = ProjectStatus.NEW) {
    }

    public get isNewFilled() {
        return allNotEmpty(this.workSpaceId, this.shortDescription, this.fullDescription, this.title);
    }

    public withTitle(title: string) {
        const project: DetailedProject = this.clone();//Object.assign({}, this);
        project.title = title;
        return project;
    }

    public withFullDescription(descr: string) {
        const project: DetailedProject = this.clone();//Object.assign({}, this);
        project.fullDescription = descr;
        return project;
    }

    public withShortDescription(descr: string) {
        const project: DetailedProject = this.clone();//Object.assign({}, this);
        project.shortDescription = descr;
        return project;
    }

    public clone(): any {
        const cloneObj = new (this.constructor as any)(this.workSpaceId);
        for (const attribute in this) {
            // if (typeof this[attribut] === "object") {
            //     cloneObj[attribut] = this[attribut].clone();
            // } else {
                cloneObj[attribute] = this[attribute];
            // }
        }
        return cloneObj;
    }

}
