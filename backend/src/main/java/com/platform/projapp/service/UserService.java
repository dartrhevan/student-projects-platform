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
import com.platform.projapp.model.ProjectRole;
import com.platform.projapp.model.Tags;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.TagsRepository;
import com.platform.projapp.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
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
    private final ProjectRoleService projectRoleService;

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Optional<User> findByUserName(String username) {
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
            List<ProjectRole> projectRoles = registerRequest.getRoles().stream()
                    .map(projectRoleService::createProjectRole)
                    .collect(Collectors.toList());
            User user = new User(registerRequest.getLogin(),
                    passwordEncoder.encode(registerRequest.getPassword()),
                    registerRequest.getName(),
                    registerRequest.getSurname(),
                    registerRequest.getEmail(),
                    registerRequest.getInterests(),
                    registerRequest.getGroup(),
                    skills,
                    Set.of(AccessRole.ROLE_USER));
            user.getRoles().addAll(projectRoles);
            userRepository.save(user);
        }
    }

    public User findByJwt(String jwt) {
        return findByUserName(jwtHelper.getUserNameFromJwtToken(jwt)).get();
    }

    public User parseAndFindByJwt(String jwt) {
        return findByJwt(jwtHelper.parseJwt(jwt));
    }

    public GeneralResponse<CurrentUserResponseBody> getCurrentUser(HttpServletRequest req) {
        GeneralResponse<CurrentUserResponseBody> response = new GeneralResponse<>();
        try {
            String token = jwtTokenFilter.parseRequestJwt(req);
            String login = jwtHelper.getUserNameFromJwtToken(token);
            User user = userRepository.findByLogin(login).orElseThrow(() -> new UsernameNotFoundException(""));
            return response.withData(new CurrentUserResponseBody(user.getName(), user.getSurname(), user.getLogin()));
        } catch (ExpiredJwtException e) {
            return response.withErrors(List.of(ErrorInfo.of("Jwt is Expired", "Срок использования токена истек")));
        } catch (UsernameNotFoundException e) {
            return response.withErrors(List.of(ErrorInfo.of("Username not found", "Пользователь не найден")));
        }
    }

    public GeneralResponse<CurrentUserProfileResponseBody> getCurrentUserProfile(HttpServletRequest req) {
        GeneralResponse<CurrentUserProfileResponseBody> response = new GeneralResponse<>();
        try {
            String token = jwtTokenFilter.parseRequestJwt(req);
            if (token == null || token.isEmpty()) {
                return response.withErrors(List.of(ErrorInfo.of("401", "Jwt is not provided")));
            }
            String login = jwtHelper.getUserNameFromJwtToken(token);
            User user = userRepository.findByLogin(login).orElseThrow(() -> new UsernameNotFoundException(""));
            return response.withData(new CurrentUserProfileResponseBody(user.getLogin(),
                    user.getName(),
                    user.getSurname(),
                    user.getInterests(),
                    user.getEmail(),
                    user.getRoles().stream().map(ProjectRole::getName).collect(Collectors.toList()),
                    user.getGroupp(),
                    user.getId()));
        } catch (ExpiredJwtException e) {
            return response.withErrors(List.of(ErrorInfo.of("Jwt is Expired", "Срок использования токена истек")));
        } catch (UsernameNotFoundException e) {
            return response.withErrors(List.of(ErrorInfo.of("Username not found", "Пользователь не найден")));
        }
    }

    public GeneralResponse<MessageResponseBody> changeUserProfile(RegisterOrUpdateUserRequest req) {
        List<ErrorInfo> errors = new ArrayList<>();
        GeneralResponse<MessageResponseBody> response = new GeneralResponse<>();
        try {
            Long Id = req.getId();
            User user = userRepository.getById(Id);
            user.setName(req.getName());
            user.setSurname(req.getSurname());
            user.setLogin(req.getLogin());
            user.setInterests(req.getInterests());
            user.setEmail(req.getEmail());
            user.getRoles().addAll(req.getRoles().stream().map(projectRoleService::createProjectRole).collect(Collectors.toList()));
            user.setGroupp(req.getGroup());
            user.setSkills(req.getSkills().stream()
                    .map(tags -> {
                        Tags tgs = tags;
                        tgs = tagsRepository.getById(tgs.getId());
                        return tgs;
                    }).collect(Collectors.toSet()));
            if (req.getPassword() != null && req.getNewPassword() != null && !passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
                errors.add(ErrorConstants.WRONG_PASSWORD);
                return response.withErrors(errors);
            } else if (req.getPassword() == null && req.getNewPassword() != null)
                return response.withErrors(List.of(ErrorInfo.of("Old Password Not Confirmed", "Необходимо ввести текущий пароль")));
            else if (req.getNewPassword() != null && passwordEncoder.matches(req.getPassword(), user.getPasswordHash()))
                user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));

            userRepository.save(user);
            return response.withData(MessageResponseBody.of("Информация о пользователе обновлена"));
        } catch (DataIntegrityViolationException e) {
            if (e.getMostSpecificCause().getClass().getName().equals("org.postgresql.util.PSQLException"))
                errors.add(ErrorConstants.LOGIN_IS_BUSY);

            return response.withErrors(errors);
        }
    }
}
