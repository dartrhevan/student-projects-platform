import GenericResponse from "../model/dto/GenericResponse";
import Notification, {NotificationType} from "../model/Notification";
import CommonResponse from "../model/dto/CommonResponse";
import PagedResponse from "../model/dto/PagedResponse";

export function getAllNotifications(pageNumber: number, pageSize: number) {
    //TODO: implement
    console.log('getAllNotification');
    return new Promise<PagedResponse<Notification[]>>(
        (res, rej) => res(new PagedResponse([new Notification(
            '1', 'BlaBla', true, '10.10.2021', NotificationType.APPLIANCE)], 0, 1)));
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

