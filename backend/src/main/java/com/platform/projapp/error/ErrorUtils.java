package com.platform.projapp.error;

import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Yarullin Renat
 */

public class ErrorUtils {
    public static List<ErrorInfo> getErrorInfoFromBindingResult(BindingResult bindingResult) {
        List<ErrorInfo> errors = new ArrayList<>();
        if (bindingResult.hasErrors()) {
            errors = bindingResult.getFieldErrors().stream()
                    .map(fieldError -> ErrorInfo.of(
                            fieldError.getField() + "Error",
                            fieldError.getDefaultMessage()
                    ))
                    .toList();
        }
        return errors;
    }
}
