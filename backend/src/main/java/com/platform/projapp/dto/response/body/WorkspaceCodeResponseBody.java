package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.model.Workspace;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class WorkspaceCodeResponseBody implements ResponseBody {
    private String userInvite;
    private String mentorInvite;

    public static WorkspaceCodeResponseBody fromWorkspace(Workspace workspace) {
        return new WorkspaceCodeResponseBody(workspace.getCodeByWorkspaceRole(WorkspaceRole.STUDENT),
                workspace.getCodeByWorkspaceRole(WorkspaceRole.MENTOR));
    }
}
