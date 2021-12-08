// import CommonResponse from "./CommonResponse";
import Project from "../Project";

export default class ProjectsResponse{
    public constructor(public projects: Project[], public totalCount: number,
                       public role = WorkspaceAssociation.ORGANIZER) {
        // super(message);
    }
}

export enum WorkspaceAssociation {
    ORGANIZER = 'org',
    MENTOR = 'men',
    STUDENT = 'std'
}
