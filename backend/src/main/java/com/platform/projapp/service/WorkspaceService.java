package com.platform.projapp.service;

import com.platform.projapp.dto.request.WorkspaceRequest;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceParticipant;
import com.platform.projapp.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceParticipantService workspaceParticipantService;

    public List<Workspace> findAll() {
        return workspaceRepository.findAll();
    }

    public Page<Workspace> findAllByUser(User user, Pageable pageable) {
        return workspaceRepository.findAllByUser(user, pageable);
    }

    public Workspace findById(Long id) {
        return workspaceRepository.findById(id).orElse(null);
    }

    public Workspace findByCode(String code) {
        return workspaceRepository.findByCode(code);
    }

    public void createWorkspace(User user, WorkspaceRequest workspaceRequest) {
        Workspace workspace = new Workspace(workspaceRequest.getTitle(),
                workspaceRequest.getStartDate(),
                workspaceRequest.getSprintLength(),
                workspaceRequest.getSprintCount());
        workspace.getParticipants().add(new WorkspaceParticipant(user, workspace, WorkspaceRole.ORGANIZER));
        workspaceRepository.save(workspace);
    }

    public void updateWorkspace(Workspace workspace, WorkspaceRequest workspaceRequest) {
        workspace.setName(workspaceRequest.getTitle());
        workspace.setZeroSprintDate(workspaceRequest.getStartDate());
        workspace.setFrequencyOfSprints(workspaceRequest.getSprintLength());
        workspace.setSprintCount(workspaceRequest.getSprintCount());
        workspaceRepository.save(workspace);
    }

    public void delete(Workspace workspace) {
        workspaceRepository.delete(workspace);
    }

    public void addWorkspaceParticipant(User user, Workspace workspace, String code) {
        WorkspaceParticipant workspaceParticipant = workspaceParticipantService.createWorkspaceParticipant(user,
                workspace,
                workspace.getWorkspaceRoleByCode(code));
        workspace.getParticipants().add(workspaceParticipant);
        workspaceRepository.save(workspace);
    }

    public ResponseEntity<?> getWorkspaceErrorResponseEntity(Workspace workspace, String userLogin, List<ErrorInfo> errorsInfo) {
        if (workspace == null)
            return ResponseEntity.badRequest()
                    .body(MessageResponseBody.of(ErrorConstants.WORKSPACE_NOT_FOUND.getMessage()));
        if (errorsInfo.contains(ErrorConstants.USER_NOT_WORKSPACE_PARTICIPANT) && !workspace.hasUser(userLogin))
            return ResponseEntity.badRequest()
                    .body(MessageResponseBody.of(ErrorConstants.USER_NOT_WORKSPACE_PARTICIPANT.getMessage()));
        if (errorsInfo.contains(ErrorConstants.USER_NOT_WORKSPACE_OWNER) && !workspace.ownerIs(userLogin))
            return ResponseEntity.badRequest()
                    .body(MessageResponseBody.of(ErrorConstants.USER_NOT_WORKSPACE_OWNER.getMessage()));
        if (errorsInfo.contains(ErrorConstants.USER_NOT_WORKSPACE_OWNER) &&  !workspace.mentorIs(userLogin) && !workspace.ownerIs(userLogin))
            return ResponseEntity.badRequest()
                    .body(MessageResponseBody.of(ErrorConstants.USER_NOT_WORKSPACE_MENTOR_OR_OWNER.getMessage()));
        if (errorsInfo.contains(ErrorConstants.USER_IN_WORKSPACE) && workspace.hasUser(userLogin)) {
            return ResponseEntity.badRequest()
                    .body(MessageResponseBody.of(ErrorConstants.USER_IN_WORKSPACE.getMessage()));
        }

        return null;
    }
}
