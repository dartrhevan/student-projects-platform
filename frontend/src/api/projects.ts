import Project, {DetailedProject} from "../model/Project";
import CommonResponse from "../model/dto/CommonResponse";
import ProjectQuery from "../model/dto/ProjectQuery";
import ProjectsResponse from "../model/dto/ProjectsResponse";
import GenericResponse from "../model/dto/GenericResponse";
import Tag from "../model/Tag";


export function addProjects(project: Project) {
    //TODO: implement
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

export function editProjects(project: Project) {
    //TODO: implement
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

export function getProjectsForWorkspace(query: ProjectQuery) {
    //TODO: implement
    console.log(`Query for projects: page - ${query.pageable.pageNumber} pageSize - ${query.pageable.pageSize}`);
    return new Promise<ProjectsResponse>((res, rej) =>
        res(new ProjectsResponse(['A', 'B', 'C', 'D', 'E', 'F', 'A1', '1B', 'C1', 'D1', 'E1', '1F']
            .map(s => new Project(s, query.workspaceId, s, s, [])), 12)));
}
//TODO: change all!!!

export function getProjectInfo(projectId: string, workspaceId: string) {
    //TODO: implement
    return new Promise<GenericResponse<DetailedProject>>((res, rej) =>
        res(new GenericResponse(new DetailedProject(projectId, workspaceId, 'Project', ' Blabla', ['1', "12"],
            [new Tag('Java', 0xE94907), new Tag('React')]))));
}
