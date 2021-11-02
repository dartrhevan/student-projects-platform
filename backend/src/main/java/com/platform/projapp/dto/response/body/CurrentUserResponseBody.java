package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CurrentUserResponseBody {
    private String login;
    private String name;
    private String surname;
}