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
    @ManyToOne
    private Project project;
    @ManyToOne
    private User User;
    @ManyToOne
    private ProjectRole projectRole;

    public Participant(Project project, User user, ProjectRole projectRole) {
        this.project = project;
        User = user;
        this.projectRole = projectRole;
    }
}
