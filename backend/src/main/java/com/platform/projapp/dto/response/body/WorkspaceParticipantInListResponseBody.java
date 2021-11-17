package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class WorkspaceParticipantInListResponseBody implements ResponseBody{
    private String username;
    private String name;
    private String surname;
    private String messenger;
    private String email;
    private Set<String> skills;
    private List<String> roles;
    private String interests;
    private String typeUser;
    private Long projectId;
    private String projectTitle;

    public static WorkspaceParticipantInListResponseBody fromWorkspaceParticipant(WorkspaceParticipant workspaceParticipant, Project project){
        var user = workspaceParticipant.getUser();
        Set<Tags> skills = new HashSet<>();
        if (user.getSkills() != null){
            skills = user.getSkills();
        }
        return new WorkspaceParticipantInListResponseBody(user.getUsername(),
                user.getName(),
                user.getSurname(),
                user.getMessenger(),
                user.getEmail(),
                skills.stream().map(Tags::getName).collect(Collectors.toSet()),
                user.getRoles().stream().map(ProjectRole::getName).collect(Collectors.toList()),
                user.getInterests(),
                workspaceParticipant.getWorkspaceRole().getText(),
                project != null ? project.getId() : null,
                project != null ? project.getName() : "");
    }
}
