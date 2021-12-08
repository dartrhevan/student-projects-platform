package com.platform.projapp.service;

import com.platform.projapp.dto.request.ScoreRequest;
import com.platform.projapp.model.Score;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.repository.ScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public void addOrUpdateScores(List<ScoreRequest> requestList, Workspace workspace, User user) {
        Sprint sprint = sprintsService.findByWorkspaceAndDate(workspace, LocalDate.now());
        System.out.println(sprint);
        requestList.forEach(req -> addOrUpdateScore(req, sprint, user));
    }

    public void addOrUpdateScore(ScoreRequest request, Sprint sprint, User user) {
        Float presentationScore = request.getPresentationScore();
        Float trackerLinkScore = request.getTrackerLinkScore();
        String comment = request.getComment();
        Score score = findBySprintAndUser(sprint, user);
        if (score != null) {
            score.setPresentationScore(presentationScore);
            score.setTrackerScore(trackerLinkScore);
            score.setComment(comment);
        } else {
            User mentor = userService.findByUserName(request.getMentorUsername());
            score = new Score(sprint, mentor, presentationScore, trackerLinkScore, comment);
        }
        scoreRepository.save(score);
    }
}
