package com.platform.projapp.repository;

import com.platform.projapp.model.WorkspaceParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yarullin Renat
 */
@Repository
public interface WorkspaceParticipantRepository extends JpaRepository<WorkspaceParticipant, Long> {
}
