package com.platform.projapp.model;

import com.platform.projapp.enumarate.ProjectStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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
    private ProjectStatus status;
    private Integer maxParticipantsCount;
    @ManyToOne
    private User owner;
    @ManyToOne
    private Workspace workspace;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Tag> tags;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Participant> participants;

    public Project(String name, String shortDescription, String fullDescription, ProjectStatus status, Integer maxParticipantsCount, User owner, Workspace workspace, Set<Tag> tags) {
        this.name = name;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.status = status;
        this.maxParticipantsCount = maxParticipantsCount;
        this.owner = owner;
        this.workspace = workspace;
        this.tags = tags;
        this.participants = new HashSet<>();
    }
}
