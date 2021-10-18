export enum NotificationType {
    INVITATION, // Приглашение текущему пользователю присоединиться к проекту
    APPLIANCE, // Предложение о присоединении к проекту текущего пользователя
    INVITATION_ACCEPTED, // INVITATION принято
    INVITATION_DECLINED // INVITATION отклонено
}

export default class Notification {
    public constructor(public text: string, public isNew: boolean, public type: NotificationType, public id?: string) {
    }
}
