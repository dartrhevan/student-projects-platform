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
public class ProjectRole {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true)
    private Long id;
    @Column(unique = true)
    private String name;

    public ProjectRole(String name) {
        this.name = name;
    }
}
