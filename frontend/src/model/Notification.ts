export enum NotificationType {
    INVITE, // Участник приглашает в команду
    REQUEST, // Участник хочет вступить в команду
    REQUEST_REJECTED, // Запрос на вступление в команду отклонен
    REQUEST_CONFIRMED, // Запрос на вступление в команду подтвержден
    JOINED, // Участник согласился вступить в команду
    NOT_JOINED, // Участник отказался вступать в команду
    DEMO, // Уведомление о демо за длина спринта/2
    DEMO_VERIFICATION, // Уведомление за день до демо с подтверждением присутствия
    DEMO_REJECTED, // Ментор не сможет присутствовать на демо
    DEMO_CONFIRMED // Ментор сможет присутствовать на демо
}

export const notificationsColors = new Map<NotificationType, string>();
notificationsColors.set(NotificationType.INVITE, 'orange');
notificationsColors.set(NotificationType.REQUEST, 'orange');
notificationsColors.set(NotificationType.REQUEST_REJECTED, 'red')
notificationsColors.set(NotificationType.REQUEST_CONFIRMED, 'green')
notificationsColors.set(NotificationType.JOINED, 'green');
notificationsColors.set(NotificationType.NOT_JOINED, 'red');
notificationsColors.set(NotificationType.DEMO, 'blue');
notificationsColors.set(NotificationType.DEMO_VERIFICATION, 'blue');
notificationsColors.set(NotificationType.DEMO_REJECTED, 'blue');
notificationsColors.set(NotificationType.DEMO_CONFIRMED, 'blue');

export default class Notification {
    public constructor(public id: string, public text: string, public isNew: boolean,
                       public date: string, public type: NotificationType) {
    }
}
