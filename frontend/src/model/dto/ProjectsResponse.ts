import CommonResponse from "./CommonResponse";
import Project from "../Project";

export default class ProjectsResponse extends CommonResponse {
    public constructor(public projects: Project[], public totalCount: number,
                       public role = WorkspaceAssociation.ORGANIZER, public message?: string) {
        super(message);
    }
}

export enum WorkspaceAssociation {
    ORGANIZER = 'org',
    MENTOR = 'ment',
    STUDENT = 'std'
}
