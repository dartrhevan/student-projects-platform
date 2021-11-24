package com.platform.projapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.platform.projapp.enumarate.AccessRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.awt.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Tags {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tags_generator")
    @SequenceGenerator(name="tags_generator", sequenceName = "tags_seq", allocationSize=50)
    @Column(unique = true)
    private Long id;
    private String name;
    private Integer color;

    @ManyToMany(mappedBy = "skills")
    @JsonIgnore
    Set<User> users = new HashSet<>();

    public Tags(String name, Integer color ) {
        this.name = name;
        this.color = color;
    }
    public void addUser(User user){
        this.users.add(user);
    }



}
