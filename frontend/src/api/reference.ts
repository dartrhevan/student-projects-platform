import GenericResponse from "../model/dto/GenericResponse";
import Tag from "../model/Tag";
import CommonResponse from "../model/dto/CommonResponse";
import {StorageKeys} from "../utils/StorageKeys";

export function getTagsReference(): Promise<Tag[]> {
    return fetch("/api/tags", {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(r => r.json()).then((r: GenericResponse<{tags: Tag[]}>) => {
        if (!r.message) {
            return r.data.tags.map((t: any) => new Tag(t.name, t.color));
        }
        else throw new Error(r.message);
    });
    // return new Promise<GenericResponse<Tag[]>>(((resolve, reject) =>
    //     resolve(new GenericResponse([new Tag('Java', 0xE94907)]))));
}

export function addTagToReference(tagName: string, color: number): Promise<CommonResponse> {
    // return new Promise<CommonResponse>((resolve, reject) => resolve(new CommonResponse()));
    return fetch("/api/tags", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        },
        body: JSON.stringify({tagName, color})
    }).then(res => {
        if (res.ok) {
            console.log(res.status)
            return {};
        } else {
            return res.json();
        }
    });
}

export function getRolesReference() {
    return new Promise<GenericResponse<string[]>>((resolve, reject) =>
        resolve(new GenericResponse(['front', 'back', 'devops', 'test', 'analytic'])));
}

export function addRoleToReference(roles: string) {
    return new Promise<CommonResponse>((resolve, reject) => resolve(new CommonResponse()));
}
