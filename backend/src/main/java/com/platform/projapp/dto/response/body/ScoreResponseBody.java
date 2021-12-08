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
    private Long projectId;
    private String projectTitle;
    private String mentorTeam;
    private String presentation;
    private Float presentationScore;
    private String trackerLink;
    private Float trackerScore;
    private String comment;

    public static ScoreResponseBody fromScore(Score score) {
        Sprint sprint = score.getSprint();
        Project project = sprint.getProject();
        String presentation = sprint.getPresentationId() != null ?
                String.format("/api/presentation/%d", sprint.getPresentationId()) :
                null;
        User mentor = project.getProjectMentor();
        return new ScoreResponseBody(sprint.getOrderNumber(),
                project.getId(),
                project.getName(),
                mentor != null ? mentor.getUsername() : null,
                presentation,
                score.getPresentationScore(),
                project.getTrackerLink(),
                score.getTrackerScore(),
                score.getComment());
    }
}
