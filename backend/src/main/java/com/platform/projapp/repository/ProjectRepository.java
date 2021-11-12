package com.platform.projapp.repository;

import com.platform.projapp.model.Project;
import com.platform.projapp.model.Tag;
import com.platform.projapp.model.Workspace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Repository
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {
    Page<Project> findAllByWorkspace(Workspace workspace, Pageable pageable);

    @Query("SELECT p FROM Project p JOIN p.tags t where p.workspace = :workspace AND t in (:tags)")
    Page<Project> findAllByWorkspaceAndTagsInTags(@Param("workspace") Workspace workspace, @Param("tags") Set<Tag> tags, Pageable pageable);
}
