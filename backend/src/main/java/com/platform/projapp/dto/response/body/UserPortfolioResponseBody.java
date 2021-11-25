package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.ProjectRole;
import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class UserPortfolioResponseBody {
    private Long projectId;
    private String title;
    private ProjectRole projectRole;
    private Double score;
    private ProjectStatus status;


    public static UserPortfolioResponseBody fromProject(Project project) {
        return fromProject(project, ProjectRole.STRANGER);
    }

    public static UserPortfolioResponseBody fromProject(Project project, User user) {
        return fromProject(project, ProjectRole.STRANGER);
    }

    public static UserPortfolioResponseBody fromProject(Project project, ProjectRole projectRole) {

        return new UserPortfolioResponseBody(project.getId(),
                project.getName(),
                projectRole,
                project.getScore(),
                project.getStatus());
    }

}
