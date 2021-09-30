import CommonResponse from "./CommonResponse";
import Project from "../Project";

export default class ProjectsResponse extends CommonResponse {
    public constructor(public projects: Project[], public totalCount: number, public message?: string) {
        super(message);
    }
}