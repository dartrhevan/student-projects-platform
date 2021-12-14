import {DetailedProject} from "../model/Project";
import CommonResponse from "../model/dto/CommonResponse";
import ProjectQuery from "../model/dto/ProjectQuery";
import ProjectsResponse from "../model/dto/ProjectsResponse";
import GenericResponse from "../model/dto/GenericResponse";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";
import {getTokenHeader} from "../store/state/LoginState";


export function addProject(project: DetailedProject): Promise<CommonResponse> {
    const trackerLink = project.trackerLink.startsWith("https://") || project.trackerLink.startsWith("http://") ?
        project.trackerLink : `http://${project.trackerLink}`;
    return fetch(`/api/projects?workspaceId=${project.workspaceId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({
            name: project.title,
            shortDescription: project.shortDescription,
            fullDescription: project.fullDescription,
            trackerLink: trackerLink,
            tags: project.tags.map(t => t.id),
            maxParticipantsCount: project.maxParticipantsCount
        })
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return res.json().then(r => {
                throw new Error(`Error: ${r.message}`);
            })
        }
    });
}

export function editProject(project: DetailedProject): Promise<CommonResponse> {
    const trackerLink = project.trackerLink.startsWith("https://") || project.trackerLink.startsWith("http://")
        ? project.trackerLink
        : project.trackerLink && `http://${project.trackerLink}`;
    return fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({
            name: project.title,
            shortDescription: project.shortDescription,
            fullDescription: project.fullDescription,
            trackerLink: trackerLink,
            tags: project.tags.map(t => t.id),
            maxParticipantsCount: project.maxParticipantsCount,
            status: project.status
        })
    }).then(getDefaultUploadHandler());
}

export function getProjectsForWorkspace(query: ProjectQuery): Promise<GenericResponse<ProjectsResponse>> {
    return fetch(`/api/projects?workspaceId=${query.workspaceId}&tag=${query.tags.join(",")}&page=${query.pageable.pageNumber}&size=${query.pageable.pageSize}&active=${query.showOnlyActive}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler());
}

export function deleteProject(projectId: string) {
    console.log('Delete project ', projectId);
    return fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: getTokenHeader()
    }).then(getDefaultUploadHandler());
}

export function getProjectInfo(projectId: string): Promise<GenericResponse<DetailedProject>> {
    return fetch(`/api/projects/${projectId}`, {
        headers: getTokenHeader()
    }).then(r => r.json());
}

export function requestAttachToProject(projectId: string, role: string) {
    return fetch(`/api/users/request`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({projectId, role})
    }).then(getDefaultUploadHandler());
}

export function removeParticipant(participantUsername: string, projectId: string) {
    return fetch(`/api/projects/${projectId}/participants?participantUsername=${participantUsername}`, {
        method: 'DELETE',
        headers: getTokenHeader()
    }).then(getDefaultUploadHandler());
}
