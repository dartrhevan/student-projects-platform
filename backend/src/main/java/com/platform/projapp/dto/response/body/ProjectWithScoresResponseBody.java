package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Project;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class ProjectWithScoresResponseBody implements ResponseBody {
    private Long projectId;
    private String projectTitle;
    private String mentor;
    private Set<ScoreInProjectResponseBody> scores;

    public static ProjectWithScoresResponseBody fromProject(Project project) {
        User mentor = project.getProjectMentor();
        Set<Sprint> sprints = project.getSprints();
        return new ProjectWithScoresResponseBody(project.getId(),
                project.getName(),
                mentor != null ? mentor.getUsername() : null,
                sprints != null ? sprints.stream().map(ScoreInProjectResponseBody::fromSprint).collect(Collectors.toSet()) : null);
    }
}
