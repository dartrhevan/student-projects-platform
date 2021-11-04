package com.platform.projapp.repository;

import com.platform.projapp.model.Project;
import com.platform.projapp.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Set<Project> findAllByWorkspaceId(Long workspaceId);

    Set<Project> findAllByWorkspaceIdAndTagsIn(Long workspaceId, Collection<Tag> tags);
}
