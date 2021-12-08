package com.platform.projapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.platform.projapp.error.ErrorInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GeneralResponse<T> {
    private String message;
    private T data;

    public GeneralResponse<T> withError(String message) {
        this.message = message;
        return this;
    }

    public GeneralResponse<T> withErrors(List<ErrorInfo> errors) {
        this.message = errors.get(0).getMessage();
        return this;
    }

    public GeneralResponse<T> withError(ErrorInfo error) {
        this.message = error.getMessage();
        return this;
    }

    public GeneralResponse<T> withData(T data) {
        this.data = data;
        return this;
    }

    public boolean success() {
        return data != null;
    }
}
