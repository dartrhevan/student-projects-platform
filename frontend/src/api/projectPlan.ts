import GenericResponse from "../model/dto/GenericResponse";
import Sprint, {ProjectPlan} from "../model/Sprint";
import CommonResponse from "../model/dto/CommonResponse";

/**
 *
 * @param projectId
 * @param workspaceId
 * @return list of sprints for current project
 */
export function getProjectPlan(projectId: string, workspaceId: string) {//TODO: implement
    return new Promise<GenericResponse<ProjectPlan>>((res, rej) => res(
        new GenericResponse(new ProjectPlan(
            [new Sprint('1', new Date(), new Date(2021, 12, 19), 'To start', 'Excellent')],
            'My project'))));
}

/**
 *
 * @param sprintId
 */
export function removeSprint(sprintId: string) {
    return new Promise<CommonResponse>(resolve => resolve(new CommonResponse())); //TODO: implement
}

/**
 * Create empty sprint with default values.
 * @param projectId
 * @param workspaceId
 * @param sprint
 * @return created sprint id
 */
export function addSprint(projectId: string, workspaceId: string/*, sprint: Sprint*/) {
    return new Promise<GenericResponse<string>>(resolve => resolve(new GenericResponse(""))); //TODO: implement
}

/**
 * Update existing sprint.
 * @param projectId
 * @param workspaceId
 * @param sprint
 */
export function updateSprint(workspaceId: string, projectId: string, sprint: Sprint) {//TODO: implement
    console.log(sprint);
    return new Promise<CommonResponse>(resolve => resolve(new CommonResponse()))
}

/**
 *
 * @param projectId
 * @param sprintId
 * @param presentation
 * @return presentation url
 */
export function uploadPresentation(workspaceId: string, projectId: string, sprintId: string, presentation: File) {//TODO: implement
    console.log(presentation.name);
    return new Promise<GenericResponse<string>>(resolve => resolve(new GenericResponse("")))
}
