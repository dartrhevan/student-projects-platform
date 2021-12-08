package com.platform.projapp.repository;

import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface SprintsRepository extends JpaRepository<Sprint, Long> {
//    @Query(value = "SELECT * FROM sprint WHERE project_id = :projectId", nativeQuery = true)
//    List<Sprint> findAllByProjectId(@Param("projectId") long projectId);
    @Query(value = "SELECT s.* FROM Sprint s JOIN project p on p.id = s.project_id WHERE p.workspace_id = :workspace AND :date >= s.start_date AND :date <= s.end_date", nativeQuery = true)
    Sprint findAllByWorkspaceAndDate(@Param("workspace") Workspace workspace, @Param("date") LocalDate date);
}
