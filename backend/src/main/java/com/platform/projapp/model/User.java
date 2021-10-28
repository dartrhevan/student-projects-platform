package com.platform.projapp.model;

import com.platform.projapp.enumarate.AccessRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;
import java.util.List;

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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true)
    private Long id;
    @Column(unique = true)
    private String login;
    private String passwordHash;
    private String name;
    private String surname;
    private String middleName;
    private String interests;
    private Integer reputation;
    private String email;
    private String comment;
    @ElementCollection
    private List<String> skills;
    @ElementCollection
    private List<String> roles;


    @ElementCollection(targetClass = AccessRole.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<AccessRole> accessRoles;

    public User(String login, String passwordHash, String name, String surname, String middleName,String email,List<String> roles,List<String> skills, String comment, Set<AccessRole> accessRoles) {
        this.login = login;
        this.passwordHash = passwordHash;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
        this.email=email;
        this.roles=roles;
        this.skills=skills;
        this.comment=comment;

        this.accessRoles = accessRoles;

        this.reputation = 100;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return accessRoles;
    }

    @Override
    public String getPassword() {return passwordHash;}

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
}
