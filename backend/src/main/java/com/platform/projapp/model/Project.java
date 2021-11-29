package com.platform.projapp.model;

import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.enumarate.WorkspaceRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.*;

/**
 * @author Yarullin Renat
 */
@Getter
@Setter
@ToString(exclude = {"tags", "participants"})
@NoArgsConstructor
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true)
    private Long id;
    @Column(unique = true)
    private String name;
    private String shortDescription;
    private String fullDescription;
    private String trackerLink;
    private ProjectStatus status;
    private Integer maxParticipantsCount;
    @ManyToOne
    private Workspace workspace;
    private String ownerLogin;
    private Double score;

    @ManyToMany(cascade = {PERSIST, MERGE, DETACH, REFRESH, PERSIST})
    private Set<Tags> tags;

    @OneToMany(mappedBy = "project", cascade = ALL, orphanRemoval = true)
    private Set<Participant> participants;

    @OneToMany(mappedBy = "project", cascade = ALL, orphanRemoval = true)
    private Set<Sprint> sprints;

    public Project(String ownerLogin, String name, String shortDescription, String fullDescription, String trackerLink,
                   ProjectStatus status, Integer maxParticipantsCount, Workspace workspace, Set<Tags> tags) {
        this.name = name;
//        this.sprints = sprints;
        this.ownerLogin = ownerLogin;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.trackerLink = trackerLink;
        this.status = status;
        this.maxParticipantsCount = maxParticipantsCount;
        this.workspace = workspace;
        this.tags = tags;
        this.participants = new HashSet<>();
        sprints = new HashSet<>();
    }

    public boolean hasUser(String userLogin) {
        return participants.stream()
                .anyMatch(workspaceParticipant -> workspaceParticipant.getUser().getLogin().equals(userLogin));
    }

    public Set<User> getMentors() {
        return workspace.getUsersByWorkspaceRole(WorkspaceRole.MENTOR);
    }

    public User getOwner() {
        return participants.stream()
                .filter(Participant::getIsOwner)
                .map(Participant::getUser)
                .findFirst()
                .orElse(null);
    }
}
