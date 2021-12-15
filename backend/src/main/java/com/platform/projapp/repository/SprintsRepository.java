package com.platform.projapp.repository;

import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Set;

@Repository
public interface SprintsRepository extends JpaRepository<Sprint, Long> {
//    @Query(value = "SELECT * FROM sprint WHERE project_id = :projectId", nativeQuery = true)
//    List<Sprint> findAllByProjectId(@Param("projectId") long projectId);
    @Query(value = "SELECT s.* FROM Sprint s JOIN project p on p.id = s.project_id WHERE p.workspace_id = :workspace AND :date >= s.start_date AND :date <= s.end_date", nativeQuery = true)
    Set<Sprint> findAllByWorkspaceAndDate(@Param("workspace") Workspace workspace, @Param("date") LocalDate date);

    @Query(value = "SELECT s.* FROM Sprint s JOIN project p on p.id = s.project_id WHERE p.workspace_id = :workspace AND s.order_number = :orderNumber", nativeQuery = true)
    Set<Sprint> findAllByWorkspaceAndOrderNumber(@Param("workspace") Workspace workspace, @Param("orderNumber") int orderNumber);

    @Modifying
    @Query(value = "UPDATE sprint SET order_number = order_number - 1 WHERE order_number > :orderNum and project_id = :projectId", nativeQuery = true)
    void shiftSprints(@Param("orderNum") int orderNum, @Param("projectId") Long projectId);
}
