package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.ProjectRole;
import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.Tags;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class ProjectResponseBody implements ResponseBody {

    private String id;
    private String workspaceId;
    private String title;
    private String shortDescription;
    private String fullDescription;
    private String trackerLink;
    private Set<Long> tags;
    private Integer maxParticipantsCount;
    private Set<ParticipantResponseBody> participants;
    private ProjectStatus status;
    private ProjectRole projectRole;

    public static ProjectResponseBody fromProject(Project project) {
        return fromProject(project, ProjectRole.STRANGER);
    }

    public static ProjectResponseBody fromProject(Project project, ProjectRole projectRole) {
        Set<ParticipantResponseBody> participantsResponseBody = new HashSet<>();
        if (!project.getParticipants().isEmpty()) {
            participantsResponseBody = project.getParticipants()
                    .stream()
                    .map(ParticipantResponseBody::fromWorkspaceParticipant)
                    .collect(Collectors.toSet());
        }

        Set<Long> tagsId = new HashSet<>();
        if (!project.getTags().isEmpty()) {
            tagsId = project.getTags().stream()
                    .map(Tags::getId)
                    .collect(Collectors.toSet());
        }

        return new ProjectResponseBody(project.getId().toString(),
                project.getWorkspace().getId().toString(),
                project.getName(),
                project.getShortDescription(),
                project.getFullDescription(),
                project.getTrackerLink(),
                tagsId,
                project.getMaxParticipantsCount(),
                participantsResponseBody,
                project.getStatus(), projectRole);
    }
}
