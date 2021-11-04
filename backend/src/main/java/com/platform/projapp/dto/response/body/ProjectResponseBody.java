package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.model.Participant;
import com.platform.projapp.model.Project;
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
public class ProjectResponseBody implements ResponseBody {
    private Long id;
    private Long workspaceId;
    private String name;
    private String shortDescription;
    private String fullDescription;
    private Set<String> participantLogins;
    private Set<TagResponseBody> tags;
    private Integer maxParticipantsCount;
    private ProjectStatus status;

    public static ProjectResponseBody fromProject(Project project) {
        Set<String> participantLogins = project.getParticipants()
                .stream()
                .map(Participant::getUser)
                .map(User::getLogin)
                .collect(Collectors.toSet());

        Set<TagResponseBody> tagResponseBodies = project.getTags().stream()
                .map(TagResponseBody::fromTag)
                .collect(Collectors.toSet());

        return new ProjectResponseBody(project.getId(),
                project.getWorkspace().getId(),
                project.getName(), project.getShortDescription(),
                project.getFullDescription(),
                participantLogins,
                tagResponseBodies,
                project.getMaxParticipantsCount(),
                project.getStatus());
    }
}
