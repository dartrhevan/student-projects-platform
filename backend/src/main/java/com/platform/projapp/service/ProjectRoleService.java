package com.platform.projapp.service;

import com.platform.projapp.model.ProjectRole;
import com.platform.projapp.repository.ProjectRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
