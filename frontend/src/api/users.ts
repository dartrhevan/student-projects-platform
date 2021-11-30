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

//TODO: implement
export function getPortfolio(login: string) {
    // return fetch(`/api/users/protfolio&username=${login}`, {
    //     headers: {
    //         "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
    //     }
    // }).then(getDefaultDownloadHandler());
    return new Promise<GenericResponse<ProjectParticipation[]>>((res, rej) => res(new GenericResponse(
        [new ProjectParticipation('Платформа проектного практикума', 'A', 'A', 'backend', 3, ProjectStatus.IN_PROGRESS)])));
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
