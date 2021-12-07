package com.platform.projapp.service;

import com.platform.projapp.dto.request.ScoreRequest;
import com.platform.projapp.model.Score;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.ScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class ScoreService {
    private final ScoreRepository scoreRepository;
    private final SprintService sprintService;
    private final UserService userService;

    public Set<Score> findAllBySprint(Sprint sprint) {
        return scoreRepository.findAllBySprint(sprint);
    }

    public void addScores(List<ScoreRequest> requestList) {
        requestList.forEach(this::addScore);
    }

    public void addScore(ScoreRequest request) {
        Sprint sprint = sprintService.findById(request.getSprintId());
        User user = userService.findByUserName(request.getMentorUsername());
        Score score = new Score(sprint, user, request.getPresentationScore(), request.getTrackerLinkScore(), request.getComment());
        scoreRepository.save(score);
    }
}
