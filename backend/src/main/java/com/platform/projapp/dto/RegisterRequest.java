package com.platform.projapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String login;
    private String interests;
}
