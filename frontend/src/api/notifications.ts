import Notification, {NotificationType} from "../model/Notification";
import CommonResponse from "../model/dto/CommonResponse";
import PagedResponse from "../model/dto/PagedResponse";
import Pageable from "../model/Pageable";
import {StorageKeys} from "../utils/StorageKeys";
import {getDefaultUploadHandler, getDefaultDownloadHandler} from "../utils/utils";

export function getAllNotifications(pageable: Pageable) {
    console.log('getAllNotification');
    return fetch(`/api/notifications?page=${pageable.pageNumber}&size=${pageable.pageSize}`, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem(StorageKeys.AccessToken)
        }
    }).then(getDefaultDownloadHandler()).then(res => {
        return new PagedResponse<Notification>(res.data.notifications, pageable.pageNumber, res.data.totalCount);
    });
    //TODO: implement
    // return new Promise<PagedResponse<Notification>>(
    //     (res, rej) => res(new PagedResponse([new Notification(
    //         '1', 'BlaBla', true, '10.10.2021', NotificationType.REQUEST)], 0, 1)));
}

export function apply(id: string) {
    //TODO: implement
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

export function markRead(id: string) {
    //TODO: implement
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

export function deny(id: string) {
    //TODO: implement
    return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
}

// function sendNotification(notification: Notification) {
//     //TODO: implement
//     return new Promise<CommonResponse>((res, rej) => res(new CommonResponse()));
// }

