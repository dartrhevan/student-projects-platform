package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CurrentUserResponseBody {
    private Long id;
    private String login;
    private String password;
    private String name;
    private String surname;
    //ADD
}
