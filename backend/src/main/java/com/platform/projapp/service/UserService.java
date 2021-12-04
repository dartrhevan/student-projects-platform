package com.platform.projapp.service;

import com.platform.projapp.configuration.jwt.JwtHelper;
import com.platform.projapp.configuration.jwt.JwtTokenFilter;
import com.platform.projapp.dto.request.RegisterOrUpdateUserRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.*;
import com.platform.projapp.enumarate.AccessRole;
import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.model.*;
import com.platform.projapp.repository.ParticipantRepository;
import com.platform.projapp.repository.ProjectRepository;
import com.platform.projapp.repository.TagsRepository;
import com.platform.projapp.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private final ProjectRoleService projectRoleService;
    private final ParticipantRepository participantRepository;
    private final ProjectRepository projectRepository;
    private final TagsService tagsService;

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByUserName(String username) {
        return userRepository.findByLogin(username);
    }

    public void addUser(RegisterOrUpdateUserRequest registerRequest) {
        Set<Tags> skills = new HashSet<>();
        if (registerRequest.getSkills() != null) {
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
                    registerRequest.getMessenger(),
                    registerRequest.getInterests(),
                    registerRequest.getGroup(),
                    skills);
            user.getRoles().addAll(projectRoles);
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
            return response.withData(new CurrentUserResponseBody(user.getName(), user.getSurname(), user.getLogin()));
        } catch (ExpiredJwtException e) {
            return response.withError("Срок использования токена истек");
        } catch (UsernameNotFoundException e) {
            return response.withError("Username not found: Пользователь не найден");
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
            return response.withData(new CurrentUserProfileResponseBody(user.getLogin(),
                    user.getName(),
                    user.getSurname(),
                    user.getInterests(),
                    user.getEmail(),
                    user.getMessenger(),
                    user.getRoles().stream().map(ProjectRole::getName).collect(Collectors.toList()),
                    user.getGroupp(),
                    user.getSkills()));
        } catch (ExpiredJwtException e) {
            return response.withError("Срок использования токена истек");
        } catch (UsernameNotFoundException e) {
            return response.withError("Username not found: Пользователь не найден");
        }
    }

    public GeneralResponse<MessageResponseBody> changeUserProfile(RegisterOrUpdateUserRequest req, HttpServletRequest request) {
        GeneralResponse<MessageResponseBody> response = new GeneralResponse<>();
        String token = jwtTokenFilter.parseRequestJwt(request);
        String login = jwtHelper.getUserNameFromJwtToken(token);
        User user = userRepository.findByLogin(login);
//        User user = userRepository.findByLogin(login).orElseThrow(() -> new UsernameNotFoundException(""));
        if (user == null) {
            return response.withError("Username not found: Пользователь не найден");
        }
        user.setName(req.getName());
        user.setSurname(req.getSurname());
        //user.setLogin(req.getLogin());
        user.setInterests(req.getInterests());
        user.setEmail(req.getEmail());
        user.setRoles(req.getRoles().stream().map(projectRoleService::createProjectRole).collect(Collectors.toSet()));
        user.setGroupp(req.getGroup());
        user.setMessenger(req.getMessenger());
        user.setSkills(req.getSkills().stream().map(tags -> {
            Tags tgs = tags;
            tgs = tagsRepository.getById(tgs.getId());
            return tgs;
        }).collect(Collectors.toSet()));
        if (req.getPassword() != null && req.getNewPassword() != null && !passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            return response.withError(ErrorConstants.USERNAME_OR_PASSWORD_NOT_FOUND);
        } else if (req.getPassword() == null && req.getNewPassword() != null)
            return response.withError(ErrorConstants.PASSWORD_IS_EMPTY);
        else if (req.getNewPassword() != null && passwordEncoder.matches(req.getPassword(), user.getPasswordHash()))
            user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);
        return response.withData(MessageResponseBody.of("Информация о пользователе обновлена"));
    }

    public GeneralResponse<UserPortfolioResponseEntity> getUserPortfolio(HttpServletRequest req, Pageable pageable, String login) {
        GeneralResponse<UserPortfolioResponseEntity> response = new GeneralResponse<>();
        try {
            if (login.isBlank()) {
                String token = jwtTokenFilter.parseRequestJwt(req);
                login = jwtHelper.getUserNameFromJwtToken(token);
            }
            User user = userRepository.findByLogin(login);
            List<Participant> participants = participantRepository.findByUser(user, pageable);

            Set<ProjectStatus> statuses = Set.of(ProjectStatus.ENDED, ProjectStatus.CANCELLED);

            Page<Project> page = projectRepository.findAllByParticipantsInAndStatusIn(participants, statuses, pageable);
            //TODO: переделал чтобы отправлялись роли, нужно чтобы проверили корректность
            Set<UserPortfolioResponseBody> projectsResponseBodyList = page.stream()
                    .map(proj -> {
                                Participant participant = participants.stream()
                                        .filter(part -> part.getProject().getId().equals(proj.getId()))
                                        .findFirst().get();
                                return UserPortfolioResponseBody.fromProject(proj, participant.getProjectRole().getName());
                            }
                    ).collect(Collectors.toSet());

            return response.withData(new UserPortfolioResponseEntity(projectsResponseBodyList));
        } catch (
                ExpiredJwtException e) {
            return response.withError("Срок использования токена истек");
        }

    }

    public GeneralResponse<UserProjectsResponseEntity> getUserProjects(HttpServletRequest req, Pageable pageable, String tagsParam, Boolean active) {
        GeneralResponse<UserProjectsResponseEntity> response = new GeneralResponse<>();
        try {
            String token = jwtTokenFilter.parseRequestJwt(req);
            String login = jwtHelper.getUserNameFromJwtToken(token);
            User user = userRepository.findByLogin(login);
            List<Participant> participants = participantRepository.findByUser(user, pageable);

            Set<ProjectStatus> statuses;
            Set<ProjectStatus> active_statuses = Set.of(ProjectStatus.NEW, ProjectStatus.IN_PROGRESS, ProjectStatus.MODIFYING);
            Set<ProjectStatus> all_statuses = Set.of(ProjectStatus.NEW, ProjectStatus.IN_PROGRESS, ProjectStatus.MODIFYING, ProjectStatus.ENDED, ProjectStatus.CANCELLED);
            if (active == true)
                statuses = active_statuses;
            else
                statuses = all_statuses;

            Page<Project> page;
            if (tagsParam != null && !tagsParam.isBlank()) {
                var tags = tagsService.findByTagParam(tagsParam);
                page = projectRepository.findAllByParticipantsInAndTagsInAndStatusIn(participants, tags, statuses, pageable);
            } else
                page = projectRepository.findAllByParticipantsInAndStatusIn(participants, statuses, pageable);

            Set<UserProjectResponseBody> projectsResponseBodyList = page.stream()
                    .map(UserProjectResponseBody::fromProject)
                    .collect(Collectors.toSet());

            return response.withData(new UserProjectsResponseEntity(page.getTotalElements(), projectsResponseBodyList));
        } catch (ExpiredJwtException e) {
            return response.withError("Срок использования токена истек");
        }
    }
}
