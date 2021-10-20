package com.platform.projapp.controller;

import com.platform.projapp.dto.request.AuthRequest;
import com.platform.projapp.dto.request.RegisterRequest;
import com.platform.projapp.dto.request.TokenRefreshRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author Yarullin Renat
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authUser(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.authUser(authRequest.getLogin(), authRequest.getPassword()));

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterRequest registerRequest, BindingResult bindingResult) {
        var errors = authService.registerUser(registerRequest, bindingResult);
        return errors.isEmpty() ? ResponseEntity.ok(authService.authUser(registerRequest.getLogin(), registerRequest.getPassword())) : ResponseEntity.ok().body(new GeneralResponse<MessageResponseBody>().withErrors(errors));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest token) {
        var response = authService.refreshToken(token);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.badRequest().body(response);
    }
}
