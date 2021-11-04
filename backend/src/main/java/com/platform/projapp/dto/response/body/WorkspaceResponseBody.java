package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceCode;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class WorkspaceResponseBody implements ResponseBody {
    private Long id;
    private String name;
    private LocalDate zeroSprintDate;
    private Integer frequencyOfSprints;
    private Integer sprintCount;
    private User owner;
    private Set<WorkspaceCode> codes;
    private Set<WorkspaceParticipantResponseBody> participants;

    public static WorkspaceResponseBody fromWorkspace(Workspace workspace) {
        Set<WorkspaceParticipantResponseBody> participantResponseBodies = workspace.getParticipants().stream()
                .map(WorkspaceParticipantResponseBody::fromWorkspaceParticipant)
                .collect(Collectors.toSet());
        return new WorkspaceResponseBody(workspace.getId(),
                workspace.getName(),
                workspace.getZeroSprintDate(),
                workspace.getFrequencyOfSprints(),
                workspace.getSprintCount(),
                workspace.getOwner(),
                workspace.getCodes(),
                participantResponseBodies);

    }
}
