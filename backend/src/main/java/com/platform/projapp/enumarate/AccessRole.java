package com.platform.projapp.enumarate;

import org.springframework.security.core.GrantedAuthority;

/**
 * @author Yarullin Renat
 */

public enum AccessRole implements GrantedAuthority {
    ROLE_ADMIN,
    ROLE_USER;

    @Override
    public String getAuthority() {
        return name();
    }
}
