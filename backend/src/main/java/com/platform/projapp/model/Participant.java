package com.platform.projapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author Yarullin Renat
 */

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true)
    private Long id;
    private Boolean isOwner;
    @ManyToOne
    private Project project;
    @ManyToOne
    private User user;
    @ManyToOne
    private ProjectRole projectRole;

    public Participant(Project project, Boolean isOwner, User user, ProjectRole projectRole) {
        this.project = project;
        this.isOwner = isOwner;
        this.user = user;
        this.projectRole = projectRole;
    }
}
