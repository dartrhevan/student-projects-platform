package com.platform.projapp.service;

import com.platform.projapp.dto.RegisterRequest;
import com.platform.projapp.enumarate.AccessRole;
import com.platform.projapp.mock.UserMock;
import com.platform.projapp.mock.UserRepositoryMock;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Service
public class UserService {
    // TODO после подключения бд заменить на репозиторий jpa
    final UserRepositoryMock userRepository;
    final PasswordEncoder passwordEncoder;

    public UserService(UserRepositoryMock userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDetails findByUserName(String username) {
        return userRepository.findByEmail(username);
    }

    public void addUser(RegisterRequest registerRequest) {
        // TODO после подключения бд заменить на user entity
        UserMock user = new UserMock(registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                registerRequest.getLogin(),
                registerRequest.getInterests(),
                100,
                Set.of(AccessRole.ROLE_USER));
        userRepository.save(user);
    }
}
