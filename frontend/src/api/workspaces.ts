import Pageable from "../model/Pageable";
import Workspace, {WorkspaceSettings} from "../model/Workspace";
import CommonResponse from "../model/dto/CommonResponse";
import GenericResponse from "../model/dto/GenericResponse";
import Invite from "../model/dto/Invite";
import ScoreDTO from "../model/dto/ScoreDTO";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";
import {getTokenHeader} from "../store/state/LoginState";


export function getUsersWorkspaces(pageable: Pageable): Promise<GenericResponse<{ totalCount: number, workspaces: Workspace[] }>> {
    return fetch(`/api/workspaces?page=${pageable.pageNumber}&size=${pageable.pageSize}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler('Ошибка загрузки'));
}

/**
 *
 * @param title - title of Workspace
 * @param sprintsCount - standard sprints count
 * @param sprintsLength - standard sprints length
 * @param startDate - date of start of the first sprint
 */
export function addNewWorkspace(title: string, sprintsCount: number, sprintsLength: number,
                                startDate: Date): Promise<CommonResponse> {
    return fetch("/api/workspaces", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({
            title,
            sprintLength: sprintsLength,
            sprintCount: sprintsCount,
            startDate: startDate.toLocaleDateString()
        })
    }).then(getDefaultUploadHandler());
}

/**
 *
 * @param id
 * @param title - title of Workspace
 * @param sprintsCount - standard sprints count
 * @param sprintsLength - standard sprints length
 * @param startDate - date of start of the first sprint
 */
export function updateWorkspace(id: string, title: string, sprintsCount: number, sprintsLength: number,
                                startDate: Date): Promise<CommonResponse> {
    return fetch(`/api/workspaces/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({
            title: title,
            sprintLength: sprintsLength,
            sprintCount: sprintsCount,
            startDate: startDate.toLocaleDateString()
        })
    }).then(getDefaultUploadHandler());
}

export function deleteWorkspace(id: string) {
    console.log("Delete workspace: ", id);
    return fetch(`/api/workspaces/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        }
    }).then(getDefaultUploadHandler());
}

export function attachToWorkspace(code: string) {
    return fetch(`/api/workspaces/participants?code=${code}`, {
        headers: getTokenHeader()
    }).then(getDefaultUploadHandler());
}

export function getWorkspaceById(id: string) {
    return fetch(`/api/workspaces/${id}/settings`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler());
}

export function getInviteForWorkspace(id: string): Promise<GenericResponse<Invite>> {
    return fetch(`/api/workspaces/${id}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler());
}
