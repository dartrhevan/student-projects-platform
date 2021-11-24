package com.platform.projapp.dto.response.body;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.platform.projapp.model.Tags;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
public class CurrentUserProfileResponseBody {
    @JsonProperty("username")
    private String login;
    private String name;
    private String surname;
    @JsonProperty("comment")
    private String interests;
    private String email;
    private String messenger;
    private List<String> roles;
    private String group;
    private Set<Tags> skills;
}
