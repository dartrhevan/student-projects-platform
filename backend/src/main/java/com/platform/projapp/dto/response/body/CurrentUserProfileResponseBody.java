package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CurrentUserProfileResponseBody{
    private String name;
    private String surname;
    private String login;
    private String interests;
    private String email;
    private String comment;
    private List<String> roles;
    private String group;
    private Long id;//Выводить пользователю не надо, нужен для изменения профиля
    //TODO:ADD
}
