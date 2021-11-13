package com.platform.projapp.repository;

import com.platform.projapp.model.ProjectRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yarullin Renat
 */
@Repository
public interface ProjectRoleRepository extends JpaRepository<ProjectRole, Long> {
    ProjectRole findByName(String name);
}
