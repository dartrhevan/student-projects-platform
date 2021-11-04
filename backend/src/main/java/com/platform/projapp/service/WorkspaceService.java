package com.platform.projapp.service;

import com.platform.projapp.dto.request.WorkspaceRequest;
import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceCode;
import com.platform.projapp.model.WorkspaceParticipant;
import com.platform.projapp.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceCodeService workspaceCodeService;
    private final WorkspaceParticipantService workspaceParticipantService;

    public Workspace findById(Long id) {
        return workspaceRepository.findById(id).orElse(null);
    }

    public List<Workspace> findAll() {
        return workspaceRepository.findAll();
    }

    public Set<Workspace> findAllByUser(User user) {
        return findAll().stream()
                .filter(workspace -> workspace.hasUser(user))
                .collect(Collectors.toSet());
    }

    public void createWorkspace(User user, WorkspaceRequest workspaceRequest) {
        Workspace workspace = new Workspace(workspaceRequest.getName(),
                workspaceRequest.getZeroSprintDate(),
                workspaceRequest.getFrequencyOfSprints(),
                workspaceRequest.getSprintCount(),
                user);
        Set<WorkspaceCode> workspaceCodes = workspaceCodeService.createWorkspaceCodes(WorkspaceRole.values());
        workspace.setCodes(workspaceCodes);
        workspaceRepository.save(workspace);
    }

    public void updateWorkspace(Workspace workspace, WorkspaceRequest workspaceRequest) {
        workspace.setName(workspaceRequest.getName());
        workspace.setZeroSprintDate(workspaceRequest.getZeroSprintDate());
        workspace.setFrequencyOfSprints(workspaceRequest.getFrequencyOfSprints());
        workspace.setSprintCount(workspaceRequest.getSprintCount());
        workspaceRepository.save(workspace);
    }

    public void delete(Workspace workspace) {
        workspaceRepository.delete(workspace);
    }

    public void addWorkspaceParticipant(User user, Workspace workspace, WorkspaceCode workspaceCode) {
        WorkspaceParticipant workspaceParticipant = workspaceParticipantService.createWorkspaceParticipant(user, workspace, workspaceCode.getType());
        workspace.getParticipants().add(workspaceParticipant);
        workspaceRepository.save(workspace);
    }

    public List<ErrorInfo> getWorkspaceParticipantErrors(Workspace workspace, User user) {
        List<ErrorInfo> workspaceErrors = getWorkspaceErrors(workspace);
        if (!workspaceErrors.isEmpty()) return workspaceErrors;
        return workspace.hasUser(user) ? Collections.emptyList() : List.of(ErrorConstants.USER_NOT_WORKSPACE_PARTICIPANT);
    }

    public List<ErrorInfo> getWorkspaceOwnerErrors(Workspace workspace, User user) {
        List<ErrorInfo> workspaceErrors = getWorkspaceErrors(workspace);
        if (!workspaceErrors.isEmpty()) return workspaceErrors;
        return workspace.ownerIs(user) ? Collections.emptyList() : List.of(ErrorConstants.USER_NOT_WORKSPACE_OWNER);
    }

    public List<ErrorInfo> getWorkspaceErrors(Workspace workspace) {
        return workspace == null ? List.of(ErrorConstants.WORKSPACE_NOT_FOUND) : Collections.emptyList();
    }
}
