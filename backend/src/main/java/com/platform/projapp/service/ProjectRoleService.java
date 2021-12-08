package com.platform.projapp.service;

import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.GetAllRolesResponseBody;
import com.platform.projapp.dto.response.body.GetAllTagsResponseBody;
import com.platform.projapp.model.ProjectRole;
import com.platform.projapp.model.Tags;
import com.platform.projapp.repository.ProjectRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class ProjectRoleService {
    private final ProjectRoleRepository projectRoleRepository;

    public ProjectRole findById(Long id) {

        return projectRoleRepository.findById(id).orElse(null);
    }

    public ProjectRole createProjectRole(String name) {
        ProjectRole projectRoleByName = findByName(name);
        if (projectRoleByName == null) {
            ProjectRole projectRole = new ProjectRole(name);
            projectRoleRepository.save(projectRole);
            return projectRole;
        }
        return projectRoleByName;
    }

    public ProjectRole findByName(String name) {
        return projectRoleRepository.findByName(name);
    }

    public GeneralResponse<GetAllRolesResponseBody> getAllRoles() {
        GeneralResponse<GetAllRolesResponseBody> response = new GeneralResponse<>();
        List<ProjectRole> roles = projectRoleRepository.findAll();
        return response.withData(new GetAllRolesResponseBody(roles));
    }
}
