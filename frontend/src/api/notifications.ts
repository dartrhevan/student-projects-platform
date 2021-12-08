import Notification from "../model/Notification";
import PagedResponse from "../model/dto/PagedResponse";
import Pageable from "../model/Pageable";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";
import {getTokenHeader} from "../store/state/LoginState";
import GenericResponse from "../model/dto/GenericResponse";

export function hasNewNotifications(): Promise<GenericResponse<boolean>> {
    return fetch(`/api/notifications/hasNew`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler());
}

export function getAllNotifications(pageable: Pageable) {
    return fetch(`/api/notifications?page=${pageable.pageNumber}&size=${pageable.pageSize}`, {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler()).then(res => {
        return new PagedResponse<Notification>(res.data.notifications, pageable.pageNumber, res.data.totalCount);
    });
}

export function apply(id: string) {
    return fetch(`/api/users/reply?notificationId=${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({answer: true})
    }).then(getDefaultUploadHandler());
}

export function markRead(id: string) {
    return fetch(`/api/notifications?notificationId=${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({})
    }).then(getDefaultUploadHandler());
}

export function deny(id: string) {
    return fetch(`/api/users/reply?notificationId=${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify({answer: false})
    }).then(getDefaultUploadHandler());
}
