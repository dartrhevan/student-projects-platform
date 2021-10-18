import GenericResponse from "../model/dto/GenericResponse";
import ProjectParticipation from "../model/ProjectParticipation";
import {ProjectStatus} from "../model/Project";
import CommonResponse from "../model/dto/CommonResponse";

//TODO: implement
export function getPortfolio(login: string) {
    return new Promise<GenericResponse<ProjectParticipation[]>>((res, rej) => res(new GenericResponse(
        [new ProjectParticipation('Платформа проектного практикума', 'A', 'A', 'backend', 3, ProjectStatus.IN_PROGRESS)])));
}

//TODO: implement
export function inviteToProject(login: string, projectId: string, workspaceId: string) {
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

