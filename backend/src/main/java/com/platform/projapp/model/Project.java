package com.platform.projapp.model;

import com.platform.projapp.enumarate.ProjectStatus;
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
    private long ownerId;

    @ManyToMany(cascade = {PERSIST, MERGE, DETACH, REFRESH, PERSIST})
    private Set<Tags> tags;

    @OneToMany(mappedBy = "project", cascade = ALL, orphanRemoval = true)
    private Set<Participant> participants;

    public Project(long ownerId, String name, String shortDescription, String fullDescription, String trackerLink, ProjectStatus status, Integer maxParticipantsCount, Workspace workspace, Set<Tags> tags) {
        this.name = name;
        this.ownerId = ownerId;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.trackerLink = trackerLink;
        this.status = status;
        this.maxParticipantsCount = maxParticipantsCount;
        this.workspace = workspace;
        this.tags = tags;
        this.participants = new HashSet<>();
    }

    public boolean hasUser(String userLogin) {
        return participants.stream()
                .anyMatch(workspaceParticipant -> workspaceParticipant.getUser().getLogin().equals(userLogin));
    }
}
