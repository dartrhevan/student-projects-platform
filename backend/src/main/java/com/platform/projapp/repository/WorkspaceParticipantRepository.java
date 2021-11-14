package com.platform.projapp.repository;

import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Repository
public interface WorkspaceParticipantRepository extends JpaRepository<WorkspaceParticipant, Long> {
    Set<WorkspaceParticipant> findAllByUser(User user);

    WorkspaceParticipant findByUserAndWorkspace(User user, Workspace workspace);
}
