import Project from "../model/Project";
import CommonResponse from "../model/dto/CommonResponse";
import ProjectQuery from "../model/dto/ProjectQuery";
import ProjectsResponse from "../model/dto/ProjectsResponse";


export function addProjects(project: Project) {
    //TODO: implement
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

export function getProjectsForWorkspace(query: ProjectQuery) {
    //TODO: implement
    console.log(`Query for projects: page - ${query.pageable.pageNumber} pageSize - ${query.pageable.pageSize}`);
    return new Promise<ProjectsResponse>((res, rej) =>
        res(new ProjectsResponse(['A', 'B', 'C', 'D', 'E', 'F', 'A1', '1B', 'C1', 'D1', 'E1', '1F']
            .map(s => new Project(s, query.workspaceId, s, s, [], [])), 12)));
}
//TODO: change all!!!