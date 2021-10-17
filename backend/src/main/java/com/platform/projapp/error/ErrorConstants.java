package com.platform.projapp.error;

/**
 * @author Yarullin Renat
 */

public class ErrorConstants {
    public static ErrorInfo RT_NOT_IN_BD = ErrorInfo.of("RefreshTokenNotInBD", "Refresh token отсутствует в базе данных");
    public static ErrorInfo USERNAME_NOT_FOUND = ErrorInfo.of("UserNameNotFound", "Пользователь не найден");
    public static ErrorInfo USER_NOT_AUTH = ErrorInfo.of("UserNotAuth", "Пользователь не авторизован");
    public static ErrorInfo LOGIN_IS_BUSY = ErrorInfo.of("LoginIsBusy", "Пользователь с таким логином уже зарегистрирован");
}
