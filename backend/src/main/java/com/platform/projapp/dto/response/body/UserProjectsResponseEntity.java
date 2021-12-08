package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class UserProjectsResponseEntity {
    private Long totalCount;
    private Set<UserProjectResponseBody> projects;

}
