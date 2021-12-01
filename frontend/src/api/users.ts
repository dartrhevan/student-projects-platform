import GenericResponse from "../model/dto/GenericResponse";
import ProjectParticipation from "../model/ProjectParticipation";
import {ProjectStatus} from "../model/Project";
import CommonResponse from "../model/dto/CommonResponse";
import PagedResponse from "../model/dto/PagedResponse";
import UserRow, {UserType} from "../model/UserRow";
import Pageable from "../model/Pageable";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";
import {Query} from "material-table";
import ProjectQuery from "../model/dto/ProjectQuery";
import ProjectsResponse from "../model/dto/ProjectsResponse";

export function getPortfolio(login: string) {
    return fetch(`/api/users/portfolio?username=${login}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler());
}

export function getAllProjectsUsers(query: ProjectQuery): Promise<GenericResponse<ProjectsResponse>> {
    return fetch(`/api/users/projects?tag=${query.tags.join(",")}&page=${query.pageable.pageNumber}&size=${query.pageable.pageSize}&active=${query.showOnlyActive}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler());
}

//TODO: implement
export function inviteToProject(login: string, projectId: string, workspaceId: string) {
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

export function getUsers(workspaceId: string, query: Query<UserRow>) {
    const query_param = query.filters.map(x => `${x.column.field}=${x.value}`).join("&")
    console.log(query_param);
    return fetch(`/api/user?workspaceId=${workspaceId}&page=${query.page}&size=${query.pageSize}&${query_param}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler()).then(res => {
        return new PagedResponse<UserRow>(res.data.participants, query.page, res.data.totalCount);
    });
}
