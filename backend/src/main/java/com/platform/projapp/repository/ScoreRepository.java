package com.platform.projapp.repository;

import com.platform.projapp.model.Score;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Controller
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Set<Score> findAllBySprint(Sprint sprint);
    void deleteAllBySprintId(long springId);
    Score findBySprintAndUser(Sprint sprint, User user);
}
