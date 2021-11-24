package com.platform.projapp.repository;

import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceParticipant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Repository
public interface WorkspaceParticipantRepository extends PagingAndSortingRepository<WorkspaceParticipant, Long>, JpaSpecificationExecutor<WorkspaceParticipant> {
    Set<WorkspaceParticipant> findAllByUser(User user);
    Page<WorkspaceParticipant> findAllByWorkspace(Workspace workspace, Pageable pageable);
    WorkspaceParticipant findByUserAndWorkspace(User user, Workspace workspace);
}
