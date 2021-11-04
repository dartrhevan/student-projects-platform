package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.model.WorkspaceCode;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class WorkspaceCodeResponseBody implements ResponseBody {
    private Long id;
    private String code;
    private WorkspaceRole type;

    public static WorkspaceCodeResponseBody fromWorkspaceCode(WorkspaceCode workspaceCode) {
        return new WorkspaceCodeResponseBody(workspaceCode.getId(),
                workspaceCode.getCode(),
                workspaceCode.getType());
    }
}
