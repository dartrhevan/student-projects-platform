import {DetailedProject} from "../model/Project";
import CommonResponse from "../model/dto/CommonResponse";
import ProjectQuery from "../model/dto/ProjectQuery";
import ProjectsResponse from "../model/dto/ProjectsResponse";
import GenericResponse from "../model/dto/GenericResponse";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";


export function addProject(project: DetailedProject): Promise<CommonResponse> {
    return fetch(`/api/projects?workspaceId=${project.workspaceId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        },
        body: JSON.stringify({
            name: project.title,
            shortDescription: project.shortDescription,
            fullDescription: project.fullDescription,
            trackerLink: project.trackerUrl,
            tags: project.tags.map(t => t.id),
            maxParticipantsCount: project.maxParticipantsCount
        })
    }).then(res => {
        if (res.ok) {
            return {}
        } else {
            return res.json().then(r => {
                throw new Error(`Error: ${r.message}`);
            })
        }
    });
}

export function editProject(project: DetailedProject): Promise<CommonResponse> {
    return fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        },
        body: JSON.stringify({
            name: project.title,
            shortDescription: project.shortDescription,
            fullDescription: project.fullDescription,
            trackerLink: project.trackerUrl,
            tags: project.tags.map(t => t.id),
            maxParticipantsCount: project.maxParticipantsCount,
            status: project.status
        })
    }).then(getDefaultUploadHandler());
}

export function getProjectsForWorkspace(query: ProjectQuery): Promise<GenericResponse<ProjectsResponse>> {
    return fetch(`/api/projects?workspaceId=${query.workspaceId}&tag=${query.tags.join(",")}&page=${query.pageable.pageNumber}&size=${query.pageable.pageSize}&active=${query.showOnlyActive}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler());
}

export function deleteProject(projectId: string) {
    console.log('Delete project ', projectId);
    return fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultUploadHandler());
}

export function deleteParticipantFromProject(projectId: string, participantId: string) {
    return fetch(`/api/project/${projectId}/participants?participantId=${participantId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultUploadHandler());
}

export function getProjectInfo(projectId: string): Promise<GenericResponse<DetailedProject>> {
    return fetch(`/api/projects/${projectId}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(r => r.json());
}

export function requestAttachToProject(projectId: string) {
    return new Promise<CommonResponse>((res) => res(new CommonResponse()));//TODO: implement
}
