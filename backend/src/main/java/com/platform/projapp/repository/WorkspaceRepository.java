package com.platform.projapp.repository;

import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Yarullin Renat
 */
@Repository
public interface WorkspaceRepository extends PagingAndSortingRepository<Workspace, Long> {
    @Query("SELECT w FROM Workspace w WHERE :user IN (SELECT p.user FROM w.participants p)")
    Page<Workspace> findAllByUser(@Param("user") User user, Pageable pageable);

    @Query("SELECT w FROM Workspace w WHERE :code IN (w.userInvite,w.mentorInvite)")
    Workspace findByCode(@Param("code") String code);
}
