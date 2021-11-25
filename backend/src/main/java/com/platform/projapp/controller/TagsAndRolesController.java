package com.platform.projapp.controller;

import com.platform.projapp.dto.request.CreateRoleRequest;
import com.platform.projapp.dto.request.CreateTagRequest;
import com.platform.projapp.service.ProjectRoleService;
import com.platform.projapp.service.TagsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagsAndRolesController {
    private final TagsService tagsService;
    private final ProjectRoleService projectRoleService;

    @PostMapping("/api/tags")
    public ResponseEntity<?> createTag(@RequestBody CreateTagRequest req) {
        return tagsService.createTag(req);
    }

    @GetMapping("/api/tags")
    public ResponseEntity<?> getAllTags() {
        var response = tagsService.getAllTags();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/roles")
    public ResponseEntity<?> createRole(@RequestBody CreateRoleRequest req) {
        projectRoleService.createProjectRole(req.getRoleName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/roles")
    public ResponseEntity<?> getAllRoles() {
        var response = projectRoleService.getAllRoles();
        return ResponseEntity.ok(response);
    }


}
