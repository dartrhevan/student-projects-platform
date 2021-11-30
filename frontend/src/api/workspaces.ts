import Pageable from "../model/Pageable";
import Workspace, {WorkspaceSettings} from "../model/Workspace";
import CommonResponse from "../model/dto/CommonResponse";
import GenericResponse from "../model/dto/GenericResponse";
import Invite from "../model/dto/Invite";
import ScoreDTO from "../model/dto/ScoreDTO";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";


export function getUsersWorkspaces(pageable: Pageable): Promise<GenericResponse<{ totalCount: number, workspaces: Workspace[] }>> {
    return fetch(`/api/workspaces?page=${pageable.pageNumber}&size=${pageable.pageSize}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
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
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
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
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        },
        body: JSON.stringify({title, sprintsLength, sprintsCount, startDate})
    }).then(getDefaultUploadHandler());
}

export function deleteWorkspace(id: string) {
    console.log("Delete workspace: ", id);
    return fetch(`/api/workspaces/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultUploadHandler());
}


//TODO: change all!!!
export function invitePerson(username: string, role: string) {
    //TODO: implement
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}


export function attachToWorkspace(code: string) {
    return fetch(`/api/workspaces/participants?code=${code}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultUploadHandler());
}

export function getWorkspaceById(id: string) {
    //TODO: implement
    return new Promise<GenericResponse<WorkspaceSettings>>(res =>
        res(new GenericResponse(new WorkspaceSettings(
            '0', 'Standard', 2, 6, new Date())))); //TODO: change workspace class
}

export function getInviteForWorkspace(id: string): Promise<GenericResponse<Invite>> {
    return fetch(`/api/workspaces/${id}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler());
}

export function getScores(workspaceId: string) {
    //TODO; implement
    return new Promise<GenericResponse<ScoreDTO[]>>(res => res(new GenericResponse(
        [new ScoreDTO('Project Activities', "VT", [2, 3, 4])])));
}
