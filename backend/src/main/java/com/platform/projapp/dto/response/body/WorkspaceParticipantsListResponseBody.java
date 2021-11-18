package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Workspace;
import com.platform.projapp.model.WorkspaceParticipant;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor(staticName = "of")
public class WorkspaceParticipantsListResponseBody implements ResponseBody{
    private Long totalCount;
    Set<WorkspaceParticipantInListResponseBody> participants;
}
