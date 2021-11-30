import GenericResponse from "../model/dto/GenericResponse";
import ProjectParticipation from "../model/ProjectParticipation";
import {ProjectStatus} from "../model/Project";
import CommonResponse from "../model/dto/CommonResponse";
import PagedResponse from "../model/dto/PagedResponse";
import UserRow, {UserType} from "../model/UserRow";
import Pageable from "../model/Pageable";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";

//TODO: implement
export function getPortfolio(login: string) {
    return new Promise<GenericResponse<ProjectParticipation[]>>((res, rej) => res(new GenericResponse(
        [new ProjectParticipation('Платформа проектного практикума', 'A', 'A', 'backend', 3, ProjectStatus.IN_PROGRESS)])));
}

//TODO: implement
export function inviteToProject(login: string, projectId: string, workspaceId: string) {
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

export function getUsers(workspaceId: string, pageable: Pageable,
                         name?: string, surname?: string, skill?: string, role?: string) {
    const nameParam = name ? `&name=${name}` : name;
    const surnameParam = surname ? `&surname=${surname}` : surname;
    const skillParam = skill ? `&skill=${skill}` : skill;
    const roleParam = role ? `&role=${role}` : role;
    const query_param = [nameParam, surnameParam, skillParam, roleParam].join("");
    console.log(query_param);
    return fetch(`/api/user?workspaceId=${workspaceId}&page=${pageable.pageNumber}&size=${pageable.pageSize}${query_param}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler()).then(res => {
            return new PagedResponse<UserRow>(res.data.participants, pageable.pageNumber, res.data.totalCount);
        });
    //TODO: implement
    // return new Promise<PagedResponse<UserRow>>(res => res(
    //     new PagedResponse<UserRow>([{
    //         name: 'Vova',
    //         surname: 'Satunkin',
    //         roles: 'backend',
    //         skills: 'Java',
    //         username: 'me',
    //         project: 'Project Activity',
    //         email: 'mail@.ru',
    //         messenger: '',
    //         userType: UserType.STUDENT,
    //         interests: 'Programming Programming Programming Programming Programming Programming\nProgramming Programming Programming\nProgramming Programming Programming Programming'
    //     }],  0, 1)));
}
