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
export function addSprint(projectId: string, sprint: Sprint) {

    return fetch(`/api/sprints`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({
            ['number']: sprint.orderNumber.toString(),
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


export function getPresentation(fileName: string, url: string) {
    return fetch(url, {
        headers: getTokenHeader()
    }).then(resp => {
        if (resp.ok)
            return resp.blob();
        else
            throw new Error('Ошибка при загрузке файла');
    })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = fileName;//'sprint-1.pptx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        })
}