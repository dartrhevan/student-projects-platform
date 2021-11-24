import GenericResponse from "../model/dto/GenericResponse";
import Tag from "../model/Tag";
import CommonResponse from "../model/dto/CommonResponse";

export function getTagsReference() {
    return new Promise<GenericResponse<Tag[]>>(((resolve, reject) =>
        resolve(new GenericResponse([new Tag('Java', 0xE94907)]))));
}

export function addTagToReference(text: string, color: number) {
    return new Promise<CommonResponse>((resolve, reject) => resolve(new CommonResponse()));
}

export function getRolesReference() {
    return new Promise<GenericResponse<string[]>>((resolve, reject) =>
        resolve(new GenericResponse(['front', 'back', 'devops', 'test', 'analytic'])));
}

export function addRoleToReference(roles: string) {
    return new Promise<CommonResponse>((resolve, reject) => resolve(new CommonResponse()));
}
