package com.platform.projapp.error;

/**
 * @author Yarullin Renat
 */

public class ErrorConstants {
    public static ErrorInfo RT_NOT_IN_BD = ErrorInfo.of("RefreshTokenNotInBD", "Refresh token отсутствует в базе данных");
    public static ErrorInfo USERNAME_NOT_FOUND = ErrorInfo.of("UserNameNotFound", "Пользователь не найден");
    public static ErrorInfo USER_NOT_AUTH = ErrorInfo.of("UserNotAuth", "Пользователь не авторизован");
    public static ErrorInfo LOGIN_IS_BUSY = ErrorInfo.of("LoginIsBusy", "Пользователь с таким логином уже зарегистрирован");
    public static ErrorInfo WORKSPACE_NOT_FOUND = ErrorInfo.of("WorkspaceNotFound", "Workspace не найден");
    public static ErrorInfo PROJECT_NOT_FOUND = ErrorInfo.of("ProjectNotFound", "Проект не найден");
    public static ErrorInfo USER_NOT_WORKSPACE_OWNER = ErrorInfo.of("UserNotWorkspaceOwner", "Пользователь не является владельцем workspace");
    public static ErrorInfo USER_NOT_WORKSPACE_PARTICIPANT = ErrorInfo.of("UserNotWorkspaceParticipant", "Пользователь не является участником workspace");
    public static ErrorInfo INCORRECT_NUMBER_OF_PAGES = ErrorInfo.of("IncorrectNumberOfPages", "Неверное количество страниц");
    public static ErrorInfo INVALID_DATA_TYPE = ErrorInfo.of("InvalidDataType", "Неверный тип данных");
    public static ErrorInfo INCOMPLETE_DATA = ErrorInfo.of("IncompleteData", "Неполные данные");
    public static ErrorInfo INCORRECT_DATA = ErrorInfo.of("IncorrectData", "Неверные данные");
    public static ErrorInfo INCORRECT_KEY = ErrorInfo.of("IncorrectKey", "Неверный ключ для присоединения");
    public static ErrorInfo USER_IN_PROJECT = ErrorInfo.of("userInProject", "Пользователь уже в проекте");
    public static ErrorInfo USER_IN_WORKSPACE = ErrorInfo.of("userInWorkspace", "Пользователь уже в workspace");


}
