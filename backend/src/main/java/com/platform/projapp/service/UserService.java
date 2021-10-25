package com.platform.projapp.service;

import com.platform.projapp.configuration.jwt.JwtTokenFilter;
import com.platform.projapp.configuration.jwt.JwtUtils;
import com.platform.projapp.dto.request.ChangeUserProfileRequest;
import com.platform.projapp.dto.request.RegisterRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.ChangeUserProfileResponseBody;
import com.platform.projapp.dto.response.body.CurrentUserProfileResponseBody;
import com.platform.projapp.dto.response.body.CurrentUserResponseBody;
import com.platform.projapp.enumarate.AccessRole;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenFilter jwtTokenFilter;
    private final JwtUtils jwtUtils;


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

    public GeneralResponse<CurrentUserResponseBody> GetCurrentUser(HttpServletRequest req) {
        GeneralResponse<CurrentUserResponseBody> response = new GeneralResponse<>();
        try{
            String token= jwtTokenFilter.parseJwt(req);
            String login= jwtUtils.getUserNameFromJwtToken(token);
            User user=userRepository.findByLogin(login);
            return response.withPayload(new CurrentUserResponseBody( user.getName(),user.getSurname(),user.getLogin()));
        }
        catch (ExpiredJwtException e) {
            return response.withErrors(List.of(ErrorInfo.of("Jwt is Expired","Срок использования токена истек")));
        }
    }

    public GeneralResponse<CurrentUserProfileResponseBody> GetCurrentUserProfile(HttpServletRequest req) {
        GeneralResponse<CurrentUserProfileResponseBody> response = new GeneralResponse<>();
        try{
            String token = jwtTokenFilter.parseJwt(req);
            String login = jwtUtils.getUserNameFromJwtToken(token);
            User user = userRepository.findByLogin(login);
            return response.withPayload(new CurrentUserProfileResponseBody(user.getLogin(), user.getName(), user.getSurname(), user.getInterests(), user.getId()));
        }
        catch (ExpiredJwtException e) {
            return response.withErrors(List.of(ErrorInfo.of("Jwt is Expired","Срок использования токена истек")));
        }
    }

    public GeneralResponse<ChangeUserProfileResponseBody> ChangeUserProfile(ChangeUserProfileRequest req)
    {
        List<ErrorInfo> errors = new ArrayList<>();
        GeneralResponse<ChangeUserProfileResponseBody> response = new GeneralResponse<>();
        try {
            Long Id = req.getId();
            User user = userRepository.getById(Id);
            user.setName(req.getName());
            user.setSurname(req.getSurname());
            user.setLogin(req.getLogin());
            user.setInterests(req.getInterests());
            //TODO:ADD
            userRepository.save(user);
            return response.withPayload(new ChangeUserProfileResponseBody(user.getName(), user.getSurname(), user.getLogin(), user.getInterests()));
        }
        catch (DataIntegrityViolationException e) {
            if (e.getMostSpecificCause().getClass().getName().equals("org.postgresql.util.PSQLException"))
            {
                errors.add(ErrorConstants.LOGIN_IS_BUSY);
                return response.withErrors(errors);
            }
            return response.withErrors(errors);
        }
    }
}
