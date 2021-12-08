package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.model.Workspace;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class WorkspaceSettingsResponseBody {
    private String title;
    private LocalDate startDate;
    private Integer sprintsLength;
    private Integer sprintsCount;

    public static WorkspaceSettingsResponseBody fromWorkspace(Workspace workspace) {
        return new WorkspaceSettingsResponseBody(workspace.getName(),
                workspace.getZeroSprintDate(),
                workspace.getFrequencyOfSprints(),
                workspace.getSprintCount());
    }

}
