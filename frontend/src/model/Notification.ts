export enum NotificationType {
    INVITE, // Приглашение текущему пользователю присоединиться к проекту
    REQUEST, // Предложение о присоединении к проекту текущего пользователя
    JOINED, // INVITATION принято
    NOT_JOINED, // INVITATION отклонено
    DEMO,
    DEMO_VERIFICATION,
    DEMO_REJECTED,
    DEMO_CONFIRMED
}

export const notificationsColors = new Map<NotificationType, string>();
notificationsColors.set(NotificationType.INVITE, 'blue');
notificationsColors.set(NotificationType.REQUEST, 'orange');
notificationsColors.set(NotificationType.JOINED, 'green');
notificationsColors.set(NotificationType.NOT_JOINED, 'red');

export default class Notification {
    public constructor(public id: string, public text: string, public isNew: boolean,
                       public date: string, public type: NotificationType) {
    }
}
