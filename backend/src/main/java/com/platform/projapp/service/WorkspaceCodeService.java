package com.platform.projapp.service;

import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.model.WorkspaceCode;
import com.platform.projapp.repository.WorkspaceCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class WorkspaceCodeService {
    private final WorkspaceCodeRepository workspaceCodeRepository;

    public WorkspaceCode findById(Long id) {
        return workspaceCodeRepository.findById(id).orElse(null);
    }

    public WorkspaceCode findByCode(String code) {
        return workspaceCodeRepository.findByCode(code);
    }

    public WorkspaceCode createWorkspaceCode(WorkspaceRole workspaceRole) {
        return new WorkspaceCode(workspaceRole);
    }

    public Set<WorkspaceCode> createWorkspaceCodes(WorkspaceRole... workspaceRoles) {
        return Arrays.stream(workspaceRoles)
                .map(this::createWorkspaceCode)
                .collect(Collectors.toSet());
    }
}
