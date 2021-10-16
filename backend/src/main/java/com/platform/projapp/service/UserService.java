package com.platform.projapp.service;

import com.platform.projapp.dto.request.RegisterRequest;
import com.platform.projapp.enumarate.AccessRole;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Service
public class UserService {
    final UserRepository userRepository;
    final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDetails findByUserName(String username) {
        return userRepository.findByLogin(username);
    }

    public void addUser(RegisterRequest registerRequest) {
        if (registerRequest.getPassword() != null){
            User user = new User(registerRequest.getLogin(),
                    registerRequest.getEmail(),
                    passwordEncoder.encode(registerRequest.getPassword()),
                    registerRequest.getName(),
                    registerRequest.getSurname(),
                    registerRequest.getMiddleName(),
                    Set.of(AccessRole.ROLE_USER));
            userRepository.save(user);
        }
    }
}
