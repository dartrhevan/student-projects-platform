package com.platform.projapp.controller;

import com.platform.projapp.dto.request.RegisterOrUpdateUserRequest;
import com.platform.projapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

    @GetMapping("/projects")
    public ResponseEntity<?> getUserProjects(HttpServletRequest req,
                                             @PageableDefault(size = 9) Pageable pageable,
                                             @RequestParam(name = "tag", required = false) String tagsParam,
                                             @RequestParam(name = "active", required = false) Boolean active) {
        if (active == null) {
            active = false;
        }
        var response = userService.getUserProjects(req, pageable, tagsParam, active);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(401).body(response);
    }

    @GetMapping("/portfolio")
    public ResponseEntity<?> getUserPortfolio(HttpServletRequest req,
                                              @PageableDefault(size = 9) Pageable pageable,
                                              @RequestParam(name = "username", required = false) String login) {
        var response = userService.getUserPortfolio(req, pageable, login);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(401).body(response);
    }
}