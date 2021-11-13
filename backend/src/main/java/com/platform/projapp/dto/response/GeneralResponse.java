package com.platform.projapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.platform.projapp.error.ErrorInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GeneralResponse<T> {
    //private List<ErrorInfo> errors;
    public String message;
    @JsonProperty("data")
    private T payload;

    public GeneralResponse<T> withErrors(String message) {
        this.message = message;
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
