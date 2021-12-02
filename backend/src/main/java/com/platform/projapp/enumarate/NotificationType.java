package com.platform.projapp.enumarate;

/**
 * @author Yarullin Renat
 */

public enum NotificationType {
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
