package com.platform.projapp.error;

import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.model.Notification;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.ProjectRole;
import com.platform.projapp.model.User;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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
                    .collect(Collectors.toList());
        }
        return errors;
    }

    public static ResponseEntity<?> getPageErrorResponseEntity(int pageNumber, int totalPages) {
        if (pageNumber < 0 || pageNumber > totalPages)
            return ResponseEntity.badRequest()
                    .body(MessageResponseBody.of(ErrorConstants.INCORRECT_NUMBER_OF_PAGES.getMessage()));
        return null;
    }

    public static ResponseEntity<?> getNotFoundErrorResponseEntity(List<Object> objects) {
        var response = new GeneralResponse<>();
        var badRequest = ResponseEntity.badRequest();
        objects = objects.stream()
                .filter(Objects::isNull)
                .collect(Collectors.toList());
        for (Object object : objects) {
            if (object instanceof User)
                return badRequest.body(response.withData(MessageResponseBody.of(ErrorConstants.USERNAME_OR_PASSWORD_NOT_FOUND)));
            if (object instanceof Project)
                return badRequest.body(response.withData(MessageResponseBody.of(ErrorConstants.PROJECT_NOT_FOUND.getMessage())));
            if (object instanceof ProjectRole)
                return badRequest.body(response.withData(MessageResponseBody.of(ErrorConstants.ROLE_NOT_FOUND.getMessage())));
            if (object instanceof Notification)
                return badRequest.body(response.withData(MessageResponseBody.of(ErrorConstants.ROLE_NOT_FOUND.getMessage())));
        }
        return null;
    }

    public static ResponseEntity<?> getIncompleteOrIncorrectErrorResponseEntity(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> incompleteErrorCodes = List.of("notnull", "notempty", "notblank");
            boolean hasIncompleteErrors = bindingResult.getFieldErrors().stream()
                    .anyMatch(error
                            -> Strings.isNotBlank(error.getCode()) &&
                            incompleteErrorCodes.contains(error.getCode().toLowerCase()));
            return ResponseEntity.badRequest().body(MessageResponseBody.of(
                    hasIncompleteErrors ? ErrorConstants.INCOMPLETE_DATA.getMessage()
                            : ErrorConstants.INCORRECT_DATA.getMessage()
            ));

        }
        return null;
    }

}
