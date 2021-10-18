import Pageable from "../model/Pageable";
import Workspace from "../model/Workspace";
import CommonResponse from "../model/dto/CommonResponse";
import Query from "../model/dto/Query";
import {Role} from "../model/Role";

export function getAllPublicWorkspaces(query: Query) {
    //TODO: implement
    return new Promise<Workspace[]>((res, rej) => res([new Workspace('0', 'PPP')]))
}

export function getUsersWorkspaces(userId: string, pageable: Pageable) {
    //TODO: implement
    return new Promise<Workspace[]>((res, rej) => res([new Workspace('0', 'PPP')]))
}

/**
 *
 * @param workspace - new workspace
 * @returns isSuccess
 */
export function addNewWorkspace(workspace: Workspace) {
    //TODO: implement
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

//TODO: change all!!!

export function invitePerson(userId: string, role: Role) {
    //TODO: implement
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}
