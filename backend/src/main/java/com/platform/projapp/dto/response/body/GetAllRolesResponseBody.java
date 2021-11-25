package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.ProjectRole;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GetAllRolesResponseBody {
    List<ProjectRole> roles;
}
