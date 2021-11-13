package com.platform.projapp.controller;

import com.platform.projapp.dto.request.RegisterOrUpdateUserRequest;
import com.platform.projapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;

    @GetMapping("/currentuser")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest req) {
        var response = userService.getCurrentUser(req);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(403).body(response);
    }

    @GetMapping("")
    public ResponseEntity<?> getCurrentUserProfile(HttpServletRequest req) {
        var response = userService.getCurrentUserProfile(req);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(403).body(response);
    }

    @PutMapping("")
    public ResponseEntity<?> changeUserProfile(@RequestBody RegisterOrUpdateUserRequest request, HttpServletRequest req) {
        var response = userService.changeUserProfile(request, req);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.badRequest().body(response);
    }
}
