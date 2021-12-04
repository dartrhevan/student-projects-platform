import GenericResponse from "../model/dto/GenericResponse";
import Sprint, {ProjectPlan, ResultComment} from "../model/Sprint";
import CommonResponse from "../model/dto/CommonResponse";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultDownloadHandler, getDefaultUploadHandler, toDateString} from "../utils/utils";
import {getTokenHeader} from "../store/state/LoginState";

/**
 *
 * @param projectId
 * @param workspaceId
 * @return list of sprints for current project
 */
export function getProjectPlan(projectId: string) {//TODO: implement
    return fetch(`/api/sprints?projectId=${projectId}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler());
    // return new Promise<GenericResponse<ProjectPlan>>((res, rej) => res(
    //     new GenericResponse(new ProjectPlan(
    //         [new Sprint('1', new Date(), new Date(2021, 12, 19), 'To start',
    //             'http://ya.ru', [new ResultComment('1', 'WERTYUI', 'YYY')])], 'My project'))));
}

/**
 *
 * @param sprintId
 */
export function removeSprint(sprintId: string) {
    return fetch(`/api/sprints?sprintId=${sprintId}`, {
        method: 'DELETE',
        headers: getTokenHeader()
    }).then(getDefaultUploadHandler());
    // return new Promise<CommonResponse>(resolve => resolve(new CommonResponse())); //TODO: implement
}

/**
 * Create empty sprint with default values.
 * @param projectId
 * @param workspaceId
 * @param sprint
 * @return created sprint id
 */
export function addSprint(projectId: string, orderNum: string, sprint: Sprint) {

    return fetch(`/api/sprints`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({
            ['number']: orderNum,
            startDate: sprint.startDate,
            endDate: sprint.endDate,
            goals: sprint.goals,
            projectId
        })
    }).then(getDefaultDownloadHandler());
    // return new Promise<GenericResponse<string>>(resolve => resolve(new GenericResponse(""))); //TODO: implement
}

/**
 * Update existing sprint.
 *
 * @param sprint
 */
export function updateSprint(sprint: Sprint) {
    // console.log(sprint);
    // return new Promise<CommonResponse>(resolve => resolve(new CommonResponse()))

    return fetch(`/api/sprints`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({
            sprintId: sprint.id,
            // number: sprint.
            goals: sprint.goals,
            startDate: toDateString(new Date(sprint.startDate)),
            endDate: toDateString(new Date(sprint.endDate))
        })

    }).then(getDefaultUploadHandler());
}

/**
 *
 * @param projectId
 * @param sprintId
 * @param presentation
 * @return presentation url
 */
export function uploadPresentation(projectId: string, sprintId: string, presentation: File) {//TODO: implement
    console.log(presentation.name);
    return new Promise<GenericResponse<string>>(resolve => resolve(new GenericResponse("")));
}


// export function dropPlan(workspaceId: string, projectId: string) {
//     return new Promise<CommonResponse>(resolve => resolve(new CommonResponse()));
// }
