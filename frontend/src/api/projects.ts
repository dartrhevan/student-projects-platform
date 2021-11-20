import Project, {DetailedProject, Participant} from "../model/Project";
import CommonResponse from "../model/dto/CommonResponse";
import ProjectQuery from "../model/dto/ProjectQuery";
import ProjectsResponse from "../model/dto/ProjectsResponse";
import GenericResponse from "../model/dto/GenericResponse";
import {StorageKeys} from "../utils/StorageKeys";


export function addProject(project: DetailedProject): Promise<CommonResponse> {
    return fetch(`/api/projects?workspaceId=${project.workSpaceId}`, {
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
            maxParticipantsCount: project.maxParticipantsCount
        })
    }).then(res => {
        if (res.ok) {
            console.log(res.status)
            return {}
        } else {
            return res.json()
        }
    });
}

export function getProjectsForWorkspace(query: ProjectQuery, active: boolean = false): Promise<GenericResponse<ProjectsResponse>> {
    return fetch(`/api/projects?workspaceId=${query.workspaceId}&tag=${query.tags.join(",")}&page=${query.pageable.pageNumber}&size=${query.pageable.pageSize}&active=${active}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(r => r.json());
}

export function deleteProject(projectId: string) {
    console.log('Delete project ', projectId);
    return fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(res => {
        if (res.ok) {
            console.log(res.status)
            return {}
        } else {
            return res.json()
        }
    });
}

//TODO: change all!!!

export function getProjectInfo(projectId: string, workspaceId: string): Promise<GenericResponse<DetailedProject>> {
    return fetch(`/api/projects/${projectId}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(r => r.json());
    // return new Promise<GenericResponse<DetailedProject>>((res, rej) => res(new GenericResponse(
    //     new DetailedProject(workspaceId, projectId, 'Project', ' Blabla', ' Blabla',
    //         'https://www.atlassian.com/ru/software/jira',
    //         [new Participant('ren', 'back'), new Participant("VV", 'front')],
    //         [new Tag('Java', 0xE94907), new Tag('React')]))));
}
