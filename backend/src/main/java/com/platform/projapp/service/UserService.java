package com.platform.projapp.service;

import com.platform.projapp.configuration.jwt.JwtHelper;
import com.platform.projapp.configuration.jwt.JwtTokenFilter;
import com.platform.projapp.dto.request.RegisterOrUpdateUserRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.CurrentUserProfileResponseBody;
import com.platform.projapp.dto.response.body.CurrentUserResponseBody;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.enumarate.AccessRole;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.model.Tags;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.TagsRepository;
import com.platform.projapp.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TagsRepository tagsRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtHelper jwtHelper;
    private final JwtTokenFilter jwtTokenFilter;

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByUserName(String username) {
        return userRepository.findByLogin(username);
    }

    public void addUser(RegisterOrUpdateUserRequest registerRequest) {
        Set<Tags> skills = new HashSet<>();
        if (registerRequest.getSkills() != null){
            skills = registerRequest.getSkills().stream().map(tags -> {
                Tags tgs = tags;
                tgs = tagsRepository.getById(tgs.getId());
                return tgs;
            }).collect(Collectors.toSet());
        }

        if (registerRequest.getPassword() != null) {
            User user = new User(registerRequest.getLogin(),
                    passwordEncoder.encode(registerRequest.getPassword()),
                    registerRequest.getName(),
                    registerRequest.getSurname(),
                    registerRequest.getEmail(),
                    registerRequest.getMessenger(),
                    registerRequest.getRoles(),
                    registerRequest.getInterests(),
                    registerRequest.getGroup(),
                    skills,
                    Set.of(AccessRole.ROLE_USER));
            userRepository.save(user);
        }
    }

    public User findByJwt(String jwt) {
        return findByUserName(jwtHelper.getUserNameFromJwtToken(jwt));
    }

    public User parseAndFindByJwt(String jwt) {
        return findByJwt(jwtHelper.parseJwt(jwt));
    }

    public GeneralResponse<CurrentUserResponseBody> getCurrentUser(HttpServletRequest req) {
        GeneralResponse<CurrentUserResponseBody> response = new GeneralResponse<>();
        try {
            String token = jwtTokenFilter.parseRequestJwt(req);
            String login = jwtHelper.getUserNameFromJwtToken(token);
            User user = userRepository.findByLogin(login);
            return response.withData(new CurrentUserResponseBody(user.getLogin(), user.getName(), user.getSurname()));
        } catch (ExpiredJwtException e) {
            return response.withError("Срок использования токена истек");
        }
    }

    public GeneralResponse<CurrentUserProfileResponseBody> getCurrentUserProfile(HttpServletRequest req) {
        GeneralResponse<CurrentUserProfileResponseBody> response = new GeneralResponse<>();
        try {
            String token = jwtTokenFilter.parseRequestJwt(req);
            if (token == null || token.isEmpty()) {
                return response.withError("Jwt is not provided");
            }
            String login = jwtHelper.getUserNameFromJwtToken(token);
            User user = userRepository.findByLogin(login);
            return response.withData(new CurrentUserProfileResponseBody(user.getLogin(), user.getName(), user.getSurname(), user.getInterests(), user.getEmail(),user.getMessenger(), user.getRoles(), user.getGroupp(),user.getSkills()));
        } catch (ExpiredJwtException e) {
            return response.withError( "Срок использования токена истек");
        }
    }

    public GeneralResponse<MessageResponseBody> changeUserProfile(RegisterOrUpdateUserRequest req,HttpServletRequest request) {
        GeneralResponse<MessageResponseBody> response = new GeneralResponse<>();
        try {
            String token = jwtTokenFilter.parseRequestJwt(request);
            String login = jwtHelper.getUserNameFromJwtToken(token);
            User user = userRepository.findByLogin(login);
            user.setName(req.getName());
            user.setSurname(req.getSurname());
            user.setLogin(req.getLogin());
            user.setInterests(req.getInterests());
            user.setEmail(req.getEmail());
            user.setRoles(req.getRoles());
            user.setGroupp(req.getGroup());
            user.setSkills(req.getSkills().stream()
                    .map(tags -> {
                        Tags tgs = tags;
                        tgs = tagsRepository.getById(tgs.getId());
                        return tgs;
                    }).collect(Collectors.toSet()));
            if (req.getPassword() != null && req.getNewPassword() != null && !passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
                return response.withError(ErrorConstants.WRONG_PASSWORD);
            } else if (req.getPassword() == null && req.getNewPassword() != null)
                return response.withError(ErrorConstants.PASSWORD_IS_EMPTY);
            else if (req.getNewPassword() != null && passwordEncoder.matches(req.getPassword(), user.getPasswordHash()))
                user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));

            userRepository.save(user);
            return response.withData(MessageResponseBody.of("Информация о пользователе обновлена"));
        } catch (DataIntegrityViolationException e) {
                return response.withError(ErrorConstants.USERNAME_NOT_FOUND);
        }
    }
}
