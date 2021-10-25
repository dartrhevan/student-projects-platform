package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeUserProfileRequest {
    private String name;
    private String surname;
    private String login;
    private String interests;
    private Long id;
    //TODO:ADD
}
