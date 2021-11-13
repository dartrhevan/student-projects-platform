package com.platform.projapp.model;

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
@ToString(exclude = {"projects"})
@NoArgsConstructor
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true)
    private Long id;
    @Column(unique = true)
    private String name;
    private Integer color;
    @ManyToMany(mappedBy = "tags")
    private Set<Project> projects;

    public Tag(String name, Integer color) {
        this.name = name;
        this.color = color;
        this.projects = new HashSet<>();
    }
}
