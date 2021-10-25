package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChangeUserProfileResponseBody {
    private String name;
    private String surname;
    private String login;
    private String interests;
    //TODO:ADD
}
