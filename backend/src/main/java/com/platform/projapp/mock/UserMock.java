package com.platform.projapp.mock;

import com.platform.projapp.enumarate.AccessRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class UserMock implements UserDetails {
    private String email;
    private String password;
    private String login;
    private String interests;
    private Integer reputation;
    private Set<AccessRole> accessRoles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getAccessRoles();
    }

    @Override
    public String getUsername() {
        return getEmail();
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
