package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Project;
import com.platform.projapp.model.Score;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class ScoreResponseBody implements ResponseBody {
    private Integer numberSprint;
    private Long sprintId;
    private String projectTitle;
    private String mentorTeam;
    private String presentation;
    private Float presentationScore;
    private String trackerLink;
    private Float trackerScore;
    private String comment;

    public static ScoreResponseBody fromSprint(Sprint sprint, User user) {
        Project project = sprint.getProject();
        Score score = sprint.getScores().stream().filter(s -> s.getUser().equals(user)).findFirst().orElse(null);
        String presentation = sprint.getPresentation()!= null ?
                String.format("/api/presentation/%d", sprint.getPresentation().getId()) :
                null;
        User mentor = project.getProjectMentor();
        return new ScoreResponseBody(sprint.getOrderNumber(),
                sprint.getId(),
                project.getName(),
                mentor != null ? mentor.getUsername() : null,
                presentation,
                score != null ? score.getPresentationScore() : 0,
                project.getTrackerLink(),
                score != null ? score.getTrackerScore() : 0,
                score != null ? score.getComment() : null);
    }
}
