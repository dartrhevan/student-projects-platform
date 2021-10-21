package com.platform.projapp.dto.request;

import lombok.Data;

import javax.persistence.Column;

@Data
public class CurrentUserRequest {
    private String login;
}
