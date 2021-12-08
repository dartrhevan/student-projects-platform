package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.ProjectRole;
import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.Tags;
import com.platform.projapp.model.Workspace;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class UserProjectResponseBody {
    private Long workspaceId;
    private Long projectId;
    private String title;
    private String shortDescription;
    private ProjectStatus status;
    private Set<Long> tags;

    public static UserProjectResponseBody fromProject(Project project) {
        return fromProject(project, ProjectRole.STRANGER);
    }

    public static UserProjectResponseBody fromProject(Project project, ProjectRole projectRole) {
        Set<Long> tagsId = new HashSet<>();
        if (!project.getTags().isEmpty()) {
            tagsId = project.getTags().stream()
                    .map(Tags::getId)
                    .collect(Collectors.toSet());
        }

        Workspace workspace = project.getWorkspace();

        return new UserProjectResponseBody(workspace.getId(),
                project.getId(),
                project.getName(),
                project.getShortDescription(),
                project.getStatus(),
                tagsId);
    }

}
