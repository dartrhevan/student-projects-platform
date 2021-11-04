import {ProjectStatus} from "./Project";

export default class ProjectParticipation {
    constructor(public title: string, public workspaceId: string, public projectId: string,
                public role: string, public score: number, public status: ProjectStatus) {
    }
}
