import GenericResponse from "../model/dto/GenericResponse";
import Tag from "../model/Tag";
import {defErrorHandler, getDefaultDownloadHandler} from "../utils/utils";
import {getTokenHeader} from "../store/state/LoginState";

export function getTagsReference(): Promise<Tag[]> {
    return fetch("/api/tags", {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler()).then((r: GenericResponse<{ tags: Tag[] }>) =>
        r.data.tags.map((t: any) => new Tag(t.id, t.name, t.color)));
}

export function addTagToReference(tagName: string, color: number): Promise<GenericResponse<number>> {
    return fetch("/api/tags", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({tagName, color})
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return defErrorHandler(res, 'Ошибка отправки данных');
        }
    });
}

export function getRolesReference() {
    return new Promise<GenericResponse<string[]>>(res => res(new GenericResponse(
        [
            'backend',
            'frontend',
            'analytic',
            'tester',
            'UI/UX',
            'Dev/Ops'
        ] //TODO: review
    )));
    // return fetch("/api/roles", {
    //     headers: getTokenHeader()
    // }).then(getDefaultDownloadHandler())
    //     .then(res => {
    //         return {data: res.data.roles.filter((r: any) => r !== null).map((role: any) => role.name)};
    //     });
}

export function addRoleToReference(roles: string) {
    return new Promise(res => res({}));
    // if (!roles) return new Promise(res => res({}));
    // return fetch("/api/roles", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         ...getTokenHeader()
    //     },
    //     body: JSON.stringify({roleName: roles})
    // }).then(res => {
    //     if (res.ok) {
    //         return res.json();
    //     } else {
    //         return defErrorHandler(res, 'Ошибка отправки данных');
    //     }
    // });
}
