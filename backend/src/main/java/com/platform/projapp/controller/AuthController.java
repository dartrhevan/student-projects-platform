package com.platform.projapp.controller;

import com.platform.projapp.dto.request.AuthRequest;
import com.platform.projapp.dto.request.RegisterOrUpdateUserRequest;
import com.platform.projapp.dto.request.TokenRefreshRequest;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.service.AuthService;
import com.platform.projapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


/**
 * @author Yarullin Renat
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<?> authUser(@RequestBody AuthRequest authRequest) {
        var response = authService.authUser(authRequest.getLogin(), authRequest.getPassword());
        //return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(404).body(response);
        if (response.success()) return ResponseEntity.ok(response);
        else if (response.getMessage().equals(ErrorConstants.USERNAME_OR_PASSWORD_NOT_FOUND))
            return ResponseEntity.status(401).body(response);
        else return ResponseEntity.status(500).body(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterOrUpdateUserRequest registerRequest, BindingResult bindingResult) {
        var response = authService.registerUser(registerRequest, bindingResult);
        return response.success() ? ResponseEntity.ok(authService.authUser(registerRequest.getLogin(), registerRequest.getPassword())) : ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest token) {
        var response = authService.refreshToken(token);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(404).body(response);
    }

}
