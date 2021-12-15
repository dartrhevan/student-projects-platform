package com.platform.projapp.error;

/**
 * @author Yarullin Renat
 */

public class ErrorConstants {
    public static ErrorInfo RT_NOT_IN_BD = ErrorInfo.of("RefreshTokenNotInBD", "Refresh token отсутствует в базе данных");
    public static ErrorInfo WORKSPACE_NOT_FOUND = ErrorInfo.of("WorkspaceNotFound", "Workspace не найден");
    public static ErrorInfo ROLE_NOT_FOUND = ErrorInfo.of("RoleNotFound", "Роль не найдена");
    public static ErrorInfo PROJECT_NOT_FOUND = ErrorInfo.of("ProjectNotFound", "Проект не найден");
    public static ErrorInfo NOTIFICATION_NOT_FOUND = ErrorInfo.of("NotificationNotFound", "Уведомление не найдено");
    public static ErrorInfo NOTIFICATION_TYPE_NOT_VALID = ErrorInfo.of("NotificationTypeNotValid", "Тип уведомления не корректный");
    public static ErrorInfo USER_ALREADY_SEND_YOU_REQ = ErrorInfo.of("UserAlreadySendYouReq", "Пользователь уже отправил вам запрос на присоединение в вашу команду");
    public static ErrorInfo USER_ALREADY_SEND_YOU_INV = ErrorInfo.of("UserAlreadySendYouInv", "Вам уже отправили приглашение в команду");
    public static ErrorInfo USER_NOT_WORKSPACE_OWNER = ErrorInfo.of("UserNotWorkspaceOwner", "Пользователь не является владельцем workspace");
    public static ErrorInfo USER_NOT_WORKSPACE_MENTOR_OR_OWNER = ErrorInfo.of("UserNotWorkspaceMentorOrOwner", "Пользователь не является ментором или организатором");
    public static ErrorInfo USER_NOT_WORKSPACE_PARTICIPANT = ErrorInfo.of("UserNotWorkspaceParticipant", "Пользователь не является участником workspace");
    public static ErrorInfo INCORRECT_NUMBER_OF_PAGES = ErrorInfo.of("IncorrectNumberOfPages", "Неверное количество страниц");
    public static ErrorInfo INVALID_DATA_TYPE = ErrorInfo.of("InvalidDataType", "Неверный тип данных");
    public static ErrorInfo INCOMPLETE_DATA = ErrorInfo.of("IncompleteData", "Неполные данные");
    public static ErrorInfo INCORRECT_DATA = ErrorInfo.of("IncorrectData", "Неверные данные");
    public static ErrorInfo INCORRECT_KEY = ErrorInfo.of("IncorrectKey", "Неверный ключ для присоединения");
    public static ErrorInfo USER_IN_PROJECT = ErrorInfo.of("userInProject", "Пользователь уже в проекте");
    public static ErrorInfo USER_IN_WORKSPACE = ErrorInfo.of("userInWorkspace", "Пользователь уже в workspace");

    //public static String RT_NOT_IN_BD = "Refresh token отсутствует в базе данных";
    public static String USERNAME_OR_PASSWORD_NOT_FOUND = "Пользователь с таким логином и паролем не найден";
    public static String USER_NOT_AUTH = "Пользователь не авторизован";
    public static String LOGIN_IS_BUSY = "Пользователь с таким логином уже зарегистрирован";
    //    public static String WRONG_PASSWORD = "Неправильный пароль";
    public static String PASSWORD_IS_EMPTY = "Поле пароль обязательно для заполнения";
    public static String TAG_IS_BUSY = "Тэг с таким именем уже существует";
}
