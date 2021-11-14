package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.model.WorkspaceParticipant;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class WorkspaceParticipantResponseBody implements ResponseBody {
    private Long id;
    private String userLogin;
    private WorkspaceRole role;

    public static WorkspaceParticipantResponseBody fromWorkspaceParticipant(WorkspaceParticipant workspaceParticipant) {
        return new WorkspaceParticipantResponseBody(workspaceParticipant.getId(),
                workspaceParticipant.getUser().getLogin(),
                workspaceParticipant.getWorkspaceRole());

    }
}
