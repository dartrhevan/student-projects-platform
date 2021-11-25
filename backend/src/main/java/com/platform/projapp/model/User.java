package com.platform.projapp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.platform.projapp.enumarate.AccessRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

import static com.platform.projapp.enumarate.AccessRole.ROLE_USER;
import static javax.persistence.CascadeType.*;

/**
 * @author Yarullin Renat
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "usr")
public class User implements UserDetails {
    @Id
    @Column(unique = true)
    private String login;
    private String passwordHash;
    private String name;
    private String surname;
    private String messenger;
    private String interests;
    private Integer reputation;
    private String email;
    private String groupp;

    @ManyToMany(cascade = {PERSIST, MERGE, DETACH, REFRESH, PERSIST})
    private Set<ProjectRole> roles;
    @ManyToMany
    @Cascade({org.hibernate.annotations.CascadeType.PERSIST,
            org.hibernate.annotations.CascadeType.MERGE,
            org.hibernate.annotations.CascadeType.DETACH,
            org.hibernate.annotations.CascadeType.REFRESH,
            org.hibernate.annotations.CascadeType.PERSIST})
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinTable(
            name = "user_skills",
            joinColumns = @JoinColumn(name = "user_login"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tags> skills = new HashSet<>();

//    @ElementCollection(targetClass = AccessRole.class, fetch = FetchType.EAGER)
//    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
//    @Enumerated(EnumType.STRING)
//    private Set<AccessRole> accessRoles;

    public User(String login, String passwordHash, String name, String surname, String email,String messenger, String interests, String groupp, Set<Tags> skills) {
        this.login = login;
        this.passwordHash = passwordHash;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.messenger = messenger;
        this.interests = interests;
        this.groupp = groupp;
        this.skills = skills;

//        this.accessRoles = accessRoles;

        this.reputation = 100;
        this.roles = new HashSet<>();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(ROLE_USER);
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
/*
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

 */

    @Override
    public int hashCode() {
        return 0;
    }
}
