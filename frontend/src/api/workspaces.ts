import Pageable from "../model/Pageable";
import Workspace from "../model/Workspace";
import CommonResponse from "../model/dto/CommonResponse";
import Query from "../model/dto/Query";
import {Role} from "../model/Role";
import GenericResponse from "../model/dto/GenericResponse";
import PagingState from "../store/state/PagingState";

// export function getAllPublicWorkspaces(query: Query) {
//     //TODO: implement
//     return new Promise<Workspace[]>((res, rej) => res([new Workspace('0', 'PPP')]))
// }

export function getUsersWorkspaces(pageable: Pageable) {
    //TODO: implement
    return new Promise<GenericResponse<{p: PagingState,w: Workspace[]}>>((res, rej) =>
        res(new GenericResponse({w:[ new Workspace('0', 'PPP'), new Workspace('0', 'Standard'),
                new Workspace('0', 'WERTYU'), new Workspace('0', 'bnm,'), new Workspace('0', 'xx')],
            p: new PagingState(20, 10, 0)})))
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
