package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Поле login обязательно для заполнения")
    @Size(min = 4, message = "Поле login должно содержать не менее {min}")
    private String login;
    @NotBlank(message = "Поле password обязательно для заполнения")
    @Size(min = 6, message = "Поле password должно содержать не менее {min}")
    private String password;
    @NotBlank(message = "Поле name обязательно для заполнения")
    private String name;
    @NotBlank(message = "Поле surname обязательно для заполнения")
    private String surname;
    private String middleName;
    private String email;
    private List<String> roles;
    private List<String> skills;
    private String comment;
}
