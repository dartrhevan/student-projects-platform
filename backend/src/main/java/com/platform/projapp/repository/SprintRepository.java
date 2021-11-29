package com.platform.projapp.repository;

import com.platform.projapp.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Yarullin Renat
 */

public interface SprintRepository extends JpaRepository<Sprint, Long> {
}
