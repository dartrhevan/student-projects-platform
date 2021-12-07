package com.platform.projapp.repository;

import com.platform.projapp.model.Score;
import com.platform.projapp.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Controller
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Set<Score> findAllBySprint(Sprint sprint);
}
