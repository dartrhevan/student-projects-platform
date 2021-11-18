package com.platform.projapp.enumarate;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.RequiredArgsConstructor;

/**
 * @author Yarullin Renat
 */
@RequiredArgsConstructor
public enum ProjectStatus {
    NEW("Новый"),
    IN_PROGRESS("В разработке"),
    ENDED("Завершён"),
    CANCELLED("Отклонён"),
    MODIFYING("На доработке");

    private final String value;

    @JsonValue
    public String getMeters() {
        return value;
    }
}
