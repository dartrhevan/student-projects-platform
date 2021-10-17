package com.platform.projapp.model;

import com.platform.projapp.enumarate.AccessRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

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
    private String password;
    private String name;
    private String surname;
    private String middleName;
    private String interests;
    private Integer reputation;

    @ElementCollection(targetClass = AccessRole.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<AccessRole> accessRoles;

    public User(String login, String password, String name, String surname, String middleName, Set<AccessRole> accessRoles) {
        this.login = login;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;

        this.accessRoles = accessRoles;

        this.reputation = 100;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return accessRoles;
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
}
