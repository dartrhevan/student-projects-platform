package com.platform.projapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Getter
@Setter
@ToString(exclude = {"codes", "participants"})
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
    @ManyToOne
    private User owner;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<WorkspaceCode> codes;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<WorkspaceParticipant> participants;
    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Project> projects;


    public Workspace(String name, LocalDate zeroSprintDate, Integer frequencyOfSprints, Integer sprintCount, User owner) {
        this.name = name;
        this.zeroSprintDate = zeroSprintDate;
        this.frequencyOfSprints = frequencyOfSprints;
        this.sprintCount = sprintCount;
        this.owner = owner;

        this.participants = new HashSet<>();
        this.projects = new HashSet<>();

    }

    public boolean hasUser(User user) {
        return ownerIs(user) || participants.stream()
                .anyMatch(workspaceParticipant -> workspaceParticipant.getUser().getId().equals(user.getId()));
    }

    public boolean ownerIs(User user) {
        return owner.getId().equals(user.getId());
    }
}
