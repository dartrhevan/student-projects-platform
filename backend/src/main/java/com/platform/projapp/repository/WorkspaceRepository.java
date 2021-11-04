package com.platform.projapp.repository;

import com.platform.projapp.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yarullin Renat
 */
@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
}
