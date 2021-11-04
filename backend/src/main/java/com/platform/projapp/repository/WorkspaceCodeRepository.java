package com.platform.projapp.repository;

import com.platform.projapp.model.WorkspaceCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yarullin Renat
 */
@Repository
public interface WorkspaceCodeRepository extends JpaRepository<WorkspaceCode, Long> {
    WorkspaceCode findByCode(String code);
}
