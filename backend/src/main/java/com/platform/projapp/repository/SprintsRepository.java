package com.platform.projapp.repository;

import com.platform.projapp.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SprintsRepository extends JpaRepository<Sprint, Long> {
//    @Query(value = "SELECT * FROM sprint WHERE project_id = :projectId", nativeQuery = true)
//    List<Sprint> findAllByProjectId(@Param("projectId") long projectId);
}
