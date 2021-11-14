package com.platform.projapp.dto.request;

import com.platform.projapp.model.Tags;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterOrUpdateUserRequest {
    @NotBlank(message = "Поле login обязательно для заполнения")
    @Size(min = 4, message = "Поле login должно содержать не менее {min}")
    private String login;
    //@NotBlank(message = "Поле password обязательно для заполнения")
    @Size(min = 6, message = "Поле password должно содержать не менее {min}")
    private String password;
    @NotBlank(message = "Поле name обязательно для заполнения")
    private String name;
    @NotBlank(message = "Поле surname обязательно для заполнения")
    private String surname;
    private String interests;
    private String email;
    private List<String> roles;
    private String group;
    private Set<Tags> skills;
    @Size(min = 6, message = "Поле newPassword должно содержать не менее {min}")
    private String newPassword; //only for update
    private Long id; //only for update
}
