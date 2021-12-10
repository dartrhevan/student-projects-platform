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
    private final SprintsService sprintsService;
    private final UserService userService;

    public Score findBySprintAndUser(Sprint sprint, User user) {
        return scoreRepository.findBySprintAndUser(sprint, user);
    }

    public Set<Score> findAllBySprint(Sprint sprint) {
        return scoreRepository.findAllBySprint(sprint);
    }

    public void addOrUpdateScores(List<ScoreRequest> requestList, User user) {
        if (requestList != null && !requestList.isEmpty()){
            requestList.forEach(req -> addOrUpdateScore(req, user));
        }
    }

    public void addOrUpdateScore(ScoreRequest request, User user) {
        Float presentationScore = request.getPresentationScore();
        Float trackerLinkScore = request.getTrackerLinkScore();
        String comment = request.getComment();
        Sprint sprint = sprintsService.findById(request.getSprintId());
        Score score = findBySprintAndUser(sprint, user);
        if (score != null) {
            score.setPresentationScore(presentationScore);
            score.setTrackerScore(trackerLinkScore);
            score.setComment(comment);
        } else {
            User mentor = userService.findByUserName(request.getMentor());
            score = new Score(sprint, mentor, presentationScore, trackerLinkScore, comment);
        }
        scoreRepository.save(score);
    }
}
