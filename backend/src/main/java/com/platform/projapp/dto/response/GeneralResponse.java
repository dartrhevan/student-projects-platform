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
    private T payload;

    public GeneralResponse<T> withErrors(List<ErrorInfo> errors) {
        this.errors = errors;
        return this;
    }

    public GeneralResponse<T> withPayload(T payload) {
        this.payload = payload;
        return this;
    }

    public boolean success() {
        return payload != null;
    }
}
