package com.platform.projapp.service;

import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceParticipant;
import com.platform.projapp.repository.WorkspaceParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class WorkspaceParticipantService {
    private final WorkspaceParticipantRepository workspaceParticipantRepository;

    public Set<WorkspaceParticipant> findAllByUser(User user) {
        return workspaceParticipantRepository.findAllByUser(user);
    }

    public Page<WorkspaceParticipant> findAll(Specification<WorkspaceParticipant> specification, Pageable pageable){
        return workspaceParticipantRepository.findAll(specification,pageable);
    }

    public Page<WorkspaceParticipant> findAllByWorkspace(Workspace workspace, Pageable pageable){
        return workspaceParticipantRepository.findAllByWorkspace(workspace, pageable);
    }

    public WorkspaceParticipant findByUserAndWorkspace(User user, Workspace workspace) {
        return workspaceParticipantRepository.findByUserAndWorkspace(user, workspace);
    }

    public WorkspaceParticipant createWorkspaceParticipant(User user, Workspace workspace, WorkspaceRole workspaceRole) {
        WorkspaceParticipant workspaceParticipant = new WorkspaceParticipant(user, workspace, workspaceRole);
        workspaceParticipantRepository.save(workspaceParticipant);
        return workspaceParticipant;
    }
}
