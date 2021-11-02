package com.platform.projapp.controller;

import com.platform.projapp.dto.request.AuthRequest;
import com.platform.projapp.dto.request.RegisterOrUpdateUserRequest;
import com.platform.projapp.dto.request.TokenRefreshRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.service.AuthService;
import com.platform.projapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
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
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(404).body(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterOrUpdateUserRequest registerRequest, BindingResult bindingResult) {
        var errors = authService.registerUser(registerRequest, bindingResult);
        return errors.isEmpty() ? ResponseEntity.ok(authService.authUser(registerRequest.getLogin(), registerRequest.getPassword())) : ResponseEntity.badRequest().body(new GeneralResponse<MessageResponseBody>().withErrors(errors));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest token) {
        var response = authService.refreshToken(token);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(404).body(response);
    }

    @GetMapping("/currentuser")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest req) {
        var response = userService.getCurrentUser(req);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(403).body(response);
    }

    @GetMapping("/userprofile")
    public ResponseEntity<?> getCurrentUserProfile(HttpServletRequest req) {
        var response = userService.getCurrentUserProfile(req);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(403).body(response);
    }

    @PutMapping("/userprofile")
    public ResponseEntity<?> changeUserProfile(@RequestBody RegisterOrUpdateUserRequest request) {
        var response = userService.changeUserProfile(request);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.badRequest().body(response);
    }
}
