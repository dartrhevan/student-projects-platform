package com.platform.projapp.model;

import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.utils.CodeUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Getter
@Setter
@ToString(exclude = {"participants", "projects"})
@NoArgsConstructor
@Entity
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private LocalDate zeroSprintDate;
    private Integer frequencyOfSprints;
    private Integer sprintCount;
    private String userInvite;
    private String mentorInvite;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<WorkspaceParticipant> participants;
    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Project> projects;


    public Workspace(String name, LocalDate zeroSprintDate, Integer frequencyOfSprints, Integer sprintCount) {
        this.name = name;
        this.zeroSprintDate = zeroSprintDate;
        this.frequencyOfSprints = frequencyOfSprints;
        this.sprintCount = sprintCount;
        this.participants = new HashSet<>();
        this.projects = new HashSet<>();

        this.userInvite = CodeUtils.getRandomCodeByWorkspaceRole(WorkspaceRole.STUDENT);
        this.mentorInvite = CodeUtils.getRandomCodeByWorkspaceRole(WorkspaceRole.MENTOR);

    }

    public boolean hasUser(User user) {
        return participants.stream()
                .anyMatch(workspaceParticipant -> workspaceParticipant.getUser().equals(user));
    }

    public boolean hasUser(String userLogin) {
        return participants.stream()
                .anyMatch(workspaceParticipant -> workspaceParticipant.getUser().getLogin().equals(userLogin));
    }

    public boolean ownerIs(User user) {
        WorkspaceParticipant owner = getOwner();
        return owner != null && owner.getUser().equals(user);
    }

    public boolean ownerIs(String userLogin) {
        WorkspaceParticipant owner = getOwner();
        return owner != null && owner.getUser().getLogin().equals(userLogin);
    }

    public boolean mentorIs(String userLogin) {
        return hasUser(userLogin) && getWorkspaceRoleByUser(userLogin).equals(WorkspaceRole.MENTOR);
    }

    public WorkspaceParticipant getOwner() {
        return participants.stream().
                filter(workspaceParticipant
                        -> workspaceParticipant.getWorkspaceRole().equals(WorkspaceRole.ORGANIZER))
                .findFirst()
                .orElse(null);
    }

    public WorkspaceRole getWorkspaceRoleByUser(User user) {
        WorkspaceParticipant participant = participants.stream()
                .filter(workspaceParticipant -> workspaceParticipant.getUser().equals(user))
                .findFirst()
                .orElse(null);
        return participant != null ? participant.getWorkspaceRole() : null;
    }

    public WorkspaceRole getWorkspaceRoleByUser(String userLogin) {
        WorkspaceParticipant participant = participants.stream()
                .filter(workspaceParticipant -> workspaceParticipant.getUser().getLogin().equals(userLogin))
                .findFirst()
                .orElse(null);
        return participant != null ? participant.getWorkspaceRole() : null;
    }

    public String getCodeByWorkspaceRole(WorkspaceRole role) {
        if (role.equals(WorkspaceRole.MENTOR)) return mentorInvite;
        if (role.equals(WorkspaceRole.STUDENT)) return userInvite;
        return null;
    }

    public WorkspaceRole getWorkspaceRoleByCode(String code) {
        return WorkspaceRole.findByText(code.substring(0, 3));
    }

    public Set<User> getUsersByWorkspaceRole(WorkspaceRole workspaceRole) {
        return participants.stream()
                .filter(participant -> participant.getWorkspaceRole().equals(workspaceRole))
                .map(WorkspaceParticipant::getUser)
                .collect(Collectors.toSet());
    }

    public LocalDate getEndDate(){return (zeroSprintDate.plusDays(frequencyOfSprints*sprintCount));}
}
