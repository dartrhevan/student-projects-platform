package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Workspace;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor(staticName = "of")
public class WorkspaceResponseBody implements ResponseBody {
    private Long workspaceId;
    private String title;

    public static WorkspaceResponseBody fromWorkspace(Workspace workspace) {
        return WorkspaceResponseBody.of(workspace.getId(), workspace.getName());
    }
}
