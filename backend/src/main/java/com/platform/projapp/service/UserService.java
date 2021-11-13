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
        if (registerRequest.getPassword() != null) {
            User user = new User(registerRequest.getLogin(),
                    passwordEncoder.encode(registerRequest.getPassword()),
                    registerRequest.getName(),
                    registerRequest.getSurname(),
                    registerRequest.getEmail(),
                    registerRequest.getRoles(),
                    registerRequest.getInterests(),
                    registerRequest.getGroup(),
                    registerRequest.getSkills()
                            .stream()
                            .map(tags -> {
                                Tags tgs = tags;
                                tgs = tagsRepository.getById(tgs.getId());
                                return tgs;
                            }).collect(Collectors.toSet()),
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
            String token = jwtTokenFilter.parseJwt(req);
            String login = jwtUtils.getUserNameFromJwtToken(token);
            User user = userRepository.findByLogin(login);
            return response.withPayload(new CurrentUserResponseBody(user.getName(), user.getSurname(), user.getLogin()));
        } catch (ExpiredJwtException e) {
            return response.withErrors(List.of(ErrorInfo.of("Jwt is Expired", "Срок использования токена истек")));
        }
    }

    public GeneralResponse<CurrentUserProfileResponseBody> getCurrentUserProfile(HttpServletRequest req) {
        GeneralResponse<CurrentUserProfileResponseBody> response = new GeneralResponse<>();
        try {
            String token = jwtTokenFilter.parseJwt(req);
            if (token == null || token.isEmpty()) {
                return response.withErrors(List.of(ErrorInfo.of("401", "Jwt is not provided")));
            }
            String login = jwtUtils.getUserNameFromJwtToken(token);
            User user = userRepository.findByLogin(login);
            return response.withPayload(new CurrentUserProfileResponseBody(user.getLogin(), user.getName(), user.getSurname(), user.getInterests(), user.getEmail(), user.getRoles(), user.getGroupp(), user.getId()));
        } catch (ExpiredJwtException e) {
            return response.withErrors(List.of(ErrorInfo.of("Jwt is Expired", "Срок использования токена истек")));
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
            user.setRoles(req.getRoles());
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
            return response.withPayload(new MessageResponseBody("Информация о пользователе обновлена"));
        } catch (DataIntegrityViolationException e) {
            if (e.getMostSpecificCause().getClass().getName().equals("org.postgresql.util.PSQLException"))
                errors.add(ErrorConstants.LOGIN_IS_BUSY);

            return response.withErrors(errors);
        }
    }
}
