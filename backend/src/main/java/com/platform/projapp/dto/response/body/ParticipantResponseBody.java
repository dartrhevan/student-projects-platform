package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Participant;
import com.platform.projapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class ParticipantResponseBody implements ResponseBody {
    private String username;
    private String name;
    private String role;

    public static ParticipantResponseBody fromWorkspaceParticipant(Participant participant) {
        User user = participant.getUser();
        return new ParticipantResponseBody(user.getUsername(),
                user.getName() + " " + user.getSurname(),
                participant.getProjectRole().getName());

    }
}
