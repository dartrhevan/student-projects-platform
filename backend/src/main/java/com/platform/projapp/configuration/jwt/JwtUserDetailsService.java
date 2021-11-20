package com.platform.projapp.configuration.jwt;

import com.platform.projapp.service.UserService;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * @author Yarullin Renat
 */
@Component
public class JwtUserDetailsService implements UserDetailsService {
    final UserService userService;

    public JwtUserDetailsService(@Lazy UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService.findByUserName(username).orElseThrow(() -> new UsernameNotFoundException(""));
    }
}
