import Notification, {NotificationType} from "../model/Notification";
import CommonResponse from "../model/dto/CommonResponse";
import PagedResponse from "../model/dto/PagedResponse";
import Pageable from "../model/Pageable";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";

export function getAllNotifications(pageable: Pageable) {
    return fetch(`/api/notifications?page=${pageable.pageNumber}&size=${pageable.pageSize}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler()).then(res => {
        return new PagedResponse<Notification>(res.data.notifications, pageable.pageNumber, res.data.totalCount);
    });
}

export function apply(id: string) {
    return fetch(`/api/users/reply?notificationId=${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        },
        body: JSON.stringify({answer: true})
    }).then(getDefaultUploadHandler());
}

export function markRead(id: string) {
    return fetch(`/api/notifications?notificationId=${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        },
        body: JSON.stringify({})
    }).then(getDefaultUploadHandler());
}

export function deny(id: string) {
    return fetch(`/api/users/reply?notificationId=${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        },
        body: JSON.stringify({answer: false})
    }).then(getDefaultUploadHandler());
}
