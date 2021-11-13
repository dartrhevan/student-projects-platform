package com.platform.projapp.service;

import com.platform.projapp.configuration.jwt.JwtUtils;
import com.platform.projapp.dto.request.RegisterRequest;
import com.platform.projapp.dto.request.TokenRefreshRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.JwtResponseBody;
import com.platform.projapp.dto.response.body.TokenRefreshResponseBody;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.error.ErrorUtils;
import com.platform.projapp.model.RefreshToken;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final RefreshTokenService tokenService;
    private final JwtHelper jwtHelper;
    private final AuthenticationManager authenticationManager;

    public GeneralResponse<JwtResponseBody> authUser(String login, String password) {
        GeneralResponse<JwtResponseBody> response = new GeneralResponse<>();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(login, password));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtHelper.generateJwtToken(authentication);

            User user = (User) authentication.getPrincipal();

            RefreshToken refreshToken = tokenService.createRefreshToken(user);

            return response.withData(new JwtResponseBody(jwt, refreshToken.getToken(), user));
        } catch (UsernameNotFoundException e) {
            return response.withErrors(List.of(ErrorConstants.USERNAME_NOT_FOUND));
        }
    }

    public List<ErrorInfo> registerUser(RegisterOrUpdateUserRequest registerRequest, BindingResult bindingResult) {

        List<ErrorInfo> errors = new ArrayList<>();
        if (registerRequest.getPassword()==null)
        {
            errors.add(ErrorConstants.PASSWORD_IS_EMPTY);
        }

        if (userRepository.existsByLogin(registerRequest.getLogin())) {
            errors.add(ErrorConstants.LOGIN_IS_BUSY);
        }
        errors.addAll(ErrorUtils.getErrorInfoFromBindingResult(bindingResult));

        if (errors.isEmpty()) {
            userService.addUser(registerRequest);
        }
        return errors;
    }

    public GeneralResponse<TokenRefreshResponseBody> refreshToken(TokenRefreshRequest token) {
        String requestRefreshToken = token.getTokenRefresh();
        GeneralResponse<TokenRefreshResponseBody> response = new GeneralResponse<>();
        return Optional.of(tokenService
                        .findByToken(requestRefreshToken)).map(tokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String accessToken = jwtHelper.generateJwtTokenFromUsername(user.getUsername());
                    String refreshToken = tokenService.createRefreshToken(user).getToken();
                    response.withData(new TokenRefreshResponseBody(accessToken, refreshToken));
                    return (response);
                }).orElse(new GeneralResponse<TokenRefreshResponseBody>()
                        .withErrors(List.of(ErrorConstants.RT_NOT_IN_BD)));
    }
}
