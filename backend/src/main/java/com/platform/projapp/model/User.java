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
    private String interests;
    private Integer reputation;
    private String email;
    private String messenger;
    @ElementCollection
    private List<String> roles;
    private String groupp;

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

    @ElementCollection(targetClass = AccessRole.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<AccessRole> accessRoles;

    public User(String login, String passwordHash, String name, String surname, String email,String messenger, List<String> roles, String interests, String groupp, Set<Tags> skills, Set<AccessRole> accessRoles) {
        this.login = login;
        this.passwordHash = passwordHash;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.messenger = messenger;
        this.roles = roles;
        this.interests = interests;
        this.groupp = groupp;
        this.skills = skills;

        this.accessRoles = accessRoles;

        this.reputation = 100;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return accessRoles;
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
    *
     */

    @Override
    public int hashCode() {
        return 0;
    }
}
