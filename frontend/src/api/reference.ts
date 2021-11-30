import GenericResponse from "../model/dto/GenericResponse";
import Tag from "../model/Tag";
import CommonResponse from "../model/dto/CommonResponse";
import {StorageKeys} from "../utils/StorageKeys";
import {defErrorHandler, getDefaultDownloadHandler} from "../utils/utils";

export function getTagsReference(): Promise<Tag[]> {
    return fetch("/api/tags", {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler()).then((r: GenericResponse<{ tags: Tag[] }>) =>
        r.data.tags.map((t: any) => new Tag(t.id, t.name, t.color)));
}

export function addTagToReference(tagName: string, color: number): Promise<GenericResponse<number>> {
    return fetch("/api/tags", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
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
    return fetch("/api/roles", {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler())
        .then(res => {
            return {data: res.data.roles.map((role: any) => role.name)};
        });
}

export function addRoleToReference(roles: string) {
    return fetch("/api/roles", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        },
        body: JSON.stringify({roleName: roles})
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return defErrorHandler(res, 'Ошибка отправки данных');
        }
    });
}
