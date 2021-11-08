import GenericResponse from "../model/dto/GenericResponse";
import ProjectParticipation from "../model/ProjectParticipation";
import {ProjectStatus} from "../model/Project";
import CommonResponse from "../model/dto/CommonResponse";
import PagedResponse from "../model/dto/PagedResponse";
import UserRow from "../model/UserRow";
import Pageable from "../model/Pageable";

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
    //TODO: implement
    return new Promise<PagedResponse<UserRow>>(res => res(
        new PagedResponse<UserRow>([{
            name: 'Vova',
            surname: 'Satunkin',
            roles: 'backend',
            skills: 'Java',
            reputation: '5',
            username: 'me',
            project: 'Project Activity',
            interests: 'Programming Programming Programming Programming Programming Programming\nProgramming Programming Programming\nProgramming Programming Programming Programming'
        }],  0, 1)));
}
