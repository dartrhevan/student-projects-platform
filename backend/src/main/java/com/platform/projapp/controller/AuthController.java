package com.platform.projapp.controller;

import com.platform.projapp.configuration.jwt.JwtUtils;
import com.platform.projapp.dto.request.AuthRequest;
import com.platform.projapp.dto.request.RegisterRequest;
import com.platform.projapp.dto.request.TokenRefreshRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.JwtResponseBody;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.dto.response.body.TokenRefreshResponseBody;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.error.ErrorUtils;
import com.platform.projapp.model.RefreshToken;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.UserRepository;
import com.platform.projapp.service.RefreshTokenService;
import com.platform.projapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author Yarullin Renat
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final UserService userService;
    private final RefreshTokenService tokenService;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/signin")
    public ResponseEntity<?> authUser(@RequestBody AuthRequest authRequest) {
        GeneralResponse<JwtResponseBody> response = new GeneralResponse<JwtResponseBody>();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getLogin(), authRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generateJwtToken(authentication);

            User user = (User) authentication.getPrincipal();

            RefreshToken refreshToken = tokenService.createRefreshToken(user);

            response = response.withPayload(new JwtResponseBody(jwt, refreshToken.getToken(), user));
            return ResponseEntity.ok(response);
        } catch (UsernameNotFoundException e) {
            response = response.withErrors(List.of(ErrorConstants.USERNAME_NOT_FOUND));
            return ResponseEntity.ok(response);
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterRequest registerRequest, BindingResult bindingResult) {
        GeneralResponse<MessageResponseBody> response = new GeneralResponse<>();

        List<ErrorInfo> errors = new ArrayList<>();
        if (userRepository.existsByLogin(registerRequest.getLogin())) {
            errors.add(ErrorConstants.LOGIN_IS_BUSY);
        }
        errors.addAll(ErrorUtils.getErrorInfoFromBindingResult(bindingResult));
        if (errors.isEmpty()) {
            userService.addUser(registerRequest);
            response = response.withPayload(new MessageResponseBody("Пользователь зарегистрирован успешно"));
        } else response.withErrors(errors);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest token) {
        String requestRefreshToken = token.getTokenRefresh();
        GeneralResponse<TokenRefreshResponseBody> response = new GeneralResponse<>();
        return Optional.of(tokenService
                        .findByToken(requestRefreshToken)).map(tokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String accessToken = jwtUtils.generateJwtTokenFromUsername(user.getUsername());
                    String refreshToken = tokenService.createRefreshToken(user).getToken();
                    response.withPayload(new TokenRefreshResponseBody(accessToken, refreshToken));
                    return ResponseEntity.ok(response);
                }).orElse(ResponseEntity
                        .badRequest()
                        .body(new GeneralResponse<TokenRefreshResponseBody>()
                                .withErrors(List.of(ErrorConstants.RT_NOT_IN_BD)))
                );
    }
}
