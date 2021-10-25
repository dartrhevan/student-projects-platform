package com.platform.projapp.controller;

import com.platform.projapp.dto.request.AuthRequest;
import com.platform.projapp.dto.request.ChangeUserProfileRequest;
import com.platform.projapp.dto.request.RegisterRequest;
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

    @GetMapping("/currentuser")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest req) {
        return ResponseEntity.ok(userService.GetCurrentUser(req));
    }

    @GetMapping("/userprofile")
    public ResponseEntity<?> getCurrentUserProfile(HttpServletRequest req){
        return ResponseEntity.ok(userService.GetCurrentUserProfile(req));
    }

    @PostMapping("/changeprofile")
    public ResponseEntity<?> ChangeUserProfile(@RequestBody ChangeUserProfileRequest request) {
        return ResponseEntity.ok(userService.ChangeUserProfile(request));
    }

}
