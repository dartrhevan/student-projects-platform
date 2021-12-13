
import PagedResponse from "../model/dto/PagedResponse";
import UserRow, {UserType} from "../model/UserRow";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";
import {Query} from "material-table";
import ProjectQuery from "../model/dto/ProjectQuery";
import {getTokenHeader} from "../store/state/LoginState";
import Notification from "../model/Notification";
import ProjectParticipation from "../model/ProjectParticipation";

export function getPortfolio(login: string) {
    return fetch(`/api/users/portfolio?username=${login}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler()).then(res => {
        return new PagedResponse<ProjectParticipation>(res.data.projects, 0, 1);
    });
}

export function getAllProjectsUsers(query: ProjectQuery) {
    return fetch(`/api/users/projects?tag=${query.tags.join(",")}&page=${query.pageable.pageNumber}&size=${query.pageable.pageSize}&active=${query.showOnlyActive}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler());
}

export function inviteToProject(username: string, projectId: string[] | string | null | undefined, role: string) {
    return fetch(`/api/users/invite`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({username, projectId, role})
    }).then(getDefaultUploadHandler());
}

export function getUsers(workspaceId: string, query: Query<UserRow>, projectId: string | null) {
    let query_param = query.filters.map(x => `${x.column.field}=${x.value}`).join("&");
    console.log(query_param);
    if (projectId)
        query_param += `&projectId=${projectId}`;
    return fetch(`/api/user?workspaceId=${workspaceId}&page=${query.page}&size=${query.pageSize}&${query_param}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler()).then(res => {
        return new PagedResponse<UserRow>(res.data.participants.map((p: any) => {
            p.roles = p.roles.join(" ");
            return p;
        }), query.page, res.data.totalCount);
    });
}
