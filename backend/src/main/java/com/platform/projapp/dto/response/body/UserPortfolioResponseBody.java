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
    private String role;
    private Double score;
    private ProjectStatus status;


    public static UserPortfolioResponseBody fromProject(Project project, String role) {
        return new UserPortfolioResponseBody(project.getId(),
                project.getName(),
                role,
                project.getScore(),
                project.getStatus());
    }

}
