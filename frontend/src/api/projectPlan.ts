import Sprint from "../model/Sprint";
import {getDefaultDownloadHandler, getDefaultUploadHandler, toBase64, toDateString} from "../utils/utils";
import {getTokenHeader} from "../store/state/LoginState";

/**
 *
 * @param projectId
 * @return list of sprints for current project
 */
export function getProjectPlan(projectId: string) {//TODO: implement
    return fetch(`/api/sprints?projectId=${projectId}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler());
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
}

/**
 * Create empty sprint with default values.
 * @param projectId
 * @param orderNum
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
}

/**
 * Update existing sprint.
 *
 * @param sprint
 * @param presentation
 */
export function updateSprint(sprint: Sprint, presentation?: File) {
    function sendUpdate(pr?: string) {
        return fetch(`/api/sprints`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getTokenHeader()
            },
            body: JSON.stringify({
                sprintId: sprint.id,
                goals: sprint.goals,
                startDate: toDateString(new Date(sprint.startDate)),
                endDate: toDateString(new Date(sprint.endDate)),
                presentation: pr
            })

        }).then(getDefaultUploadHandler());
    }
    if (presentation) return toBase64(presentation).catch(console.log).then(pr => sendUpdate(pr as string));
    return sendUpdate();
}
