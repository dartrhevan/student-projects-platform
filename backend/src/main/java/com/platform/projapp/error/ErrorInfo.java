package com.platform.projapp.error;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */

@Data
@AllArgsConstructor(staticName = "of")
public class ErrorInfo {
    //private String code;
    public String message;
}
