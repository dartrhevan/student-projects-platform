package com.platform.projapp.service;

import com.platform.projapp.dto.request.RegisterRequest;
import com.platform.projapp.enumarate.AccessRole;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserDetails findByUserName(String username) {
        return userRepository.findByLogin(username);
    }

    public void addUser(RegisterRequest registerRequest) {
        if (registerRequest.getPassword() != null) {
            User user = new User(registerRequest.getLogin(),
                    passwordEncoder.encode(registerRequest.getPassword()),
                    registerRequest.getName(),
                    registerRequest.getSurname(),
                    registerRequest.getMiddleName(),
                    Set.of(AccessRole.ROLE_USER));
            userRepository.save(user);
        }
    }
}
