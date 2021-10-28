package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeUserProfileRequest {
    private String name;
    private String surname;
    private String login;
    private String interests;
    private String email;
    private String comment;
    private List<String> skills;
    private List<String> roles;
    private String oldPassword;
    private String newPassword;
    private String newPasswordConfirm;
    private Long id;
    //TODO:ADD
}
