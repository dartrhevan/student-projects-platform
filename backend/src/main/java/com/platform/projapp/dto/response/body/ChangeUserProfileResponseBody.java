package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChangeUserProfileResponseBody {
    private String name;
    private String surname;
    private String login;
    private String interests;
    private String email;
    private String comment;
    private List<String> skills;
    private List<String> roles;
    //TODO:ADD
}
