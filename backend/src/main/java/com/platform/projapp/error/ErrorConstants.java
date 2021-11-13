package com.platform.projapp.error;

/**
 * @author Yarullin Renat
 */

public class ErrorConstants {
    public static ErrorInfo RT_NOT_IN_BD = ErrorInfo.of("RefreshTokenNotInBD", "Refresh token отсутствует в базе данных");
    public static ErrorInfo USERNAME_NOT_FOUND = ErrorInfo.of("UserNameNotFound", "Пользователь не найден");
    public static ErrorInfo USER_NOT_AUTH = ErrorInfo.of("UserNotAuth", "Пользователь не авторизован");
    public static ErrorInfo LOGIN_IS_BUSY = ErrorInfo.of("LoginIsBusy", "Пользователь с таким логином уже зарегистрирован");
    public static ErrorInfo WRONG_PASSWORD = ErrorInfo.of("WrongPassword", "Неправильный пароль");
    public static ErrorInfo PASSWORD_IS_EMPTY = ErrorInfo.of("PasswordIsEmpty", "Поле пароль обязательно для заполнения");
    public static ErrorInfo TAG_IS_BUSY = ErrorInfo.of("TagIsBusy", "Тэг с таким именем уже существует");
}
