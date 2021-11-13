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
    private List<ErrorInfo> errors;
    private T data;

    public GeneralResponse<T> withErrors(List<ErrorInfo> errors) {
        this.errors = errors;
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
