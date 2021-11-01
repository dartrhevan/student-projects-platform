export enum NotificationType {
    INVITATION, // Приглашение текущему пользователю присоединиться к проекту
    APPLIANCE, // Предложение о присоединении к проекту текущего пользователя
    INVITATION_ACCEPTED, // INVITATION принято
    INVITATION_DECLINED // INVITATION отклонено
}

export const notificationsColors = new Map<NotificationType, string>();
notificationsColors.set(NotificationType.INVITATION, 'blue');
notificationsColors.set(NotificationType.APPLIANCE, 'orange');
notificationsColors.set(NotificationType.INVITATION_ACCEPTED, 'green');
notificationsColors.set(NotificationType.INVITATION_DECLINED, 'red');

export default class Notification {
    public constructor(public id: string, public text: string, public isNew: boolean,
                       public date: string, public type: NotificationType) {
    }
}
