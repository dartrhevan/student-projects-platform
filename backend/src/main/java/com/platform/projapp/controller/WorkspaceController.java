package com.platform.projapp.controller;

import com.platform.projapp.dto.request.ProjectRequest;
import com.platform.projapp.dto.request.WorkspaceRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.dto.response.body.ProjectResponseBody;
import com.platform.projapp.dto.response.body.WorkspaceCodeResponseBody;
import com.platform.projapp.dto.response.body.WorkspaceResponseBody;
import com.platform.projapp.model.Project;
import com.platform.projapp.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    private final ProjectService projectService;
    private final WorkspaceService workspaceService;
    private final UserService userService;
    private final TagService tagService;
    private final WorkspaceCodeService workspaceCodeService;

    @GetMapping
    public ResponseEntity<?> getWorkspaces(@RequestHeader(name = "Authorization") String token) {
        GeneralResponse<Set<WorkspaceResponseBody>> response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        Set<WorkspaceResponseBody> responseBody = workspaceService.findAllByUser(user).stream()
                .map(WorkspaceResponseBody::fromWorkspace)
                .collect(Collectors.toSet());
        return ResponseEntity.ok(response.withPayload(responseBody));

    }

    @GetMapping("/{workspaceId}")
    public ResponseEntity<?> getWorkspace(@RequestHeader(name = "Authorization") String token,
                                          @PathVariable("workspaceId") Long workspaceId) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errors = workspaceService.getWorkspaceParticipantErrors(workspace, user);
        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        var responseBody = WorkspaceResponseBody.fromWorkspace(workspace);
        return ResponseEntity.ok(response.withPayload(responseBody));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addWorkspace(@RequestHeader(name = "Authorization") String token,
                                          @RequestBody WorkspaceRequest request) {
        var user = userService.parseAndFindByJwt(token);
        workspaceService.createWorkspace(user, request);
        return ResponseEntity.ok(new GeneralResponse<>().withPayload(new MessageResponseBody("Workspace успешно добавлен")));
    }

    @PostMapping("/{workspaceId}/update")
    public ResponseEntity<?> updateWorkspace(@RequestHeader(name = "Authorization") String token,
                                             @PathVariable("workspaceId") Long workspaceId,
                                             @RequestBody WorkspaceRequest request) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errors = workspaceService.getWorkspaceOwnerErrors(workspace, user);
        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        workspaceService.updateWorkspace(workspace, request);
        return ResponseEntity.ok(response.withPayload(new MessageResponseBody("Workspace успешно обновлен")));

    }

    @DeleteMapping("/{workspaceId}/delete")
    public ResponseEntity<?> deleteWorkspace(@RequestHeader(name = "Authorization") String token,
                                             @PathVariable("workspaceId") Long workspaceId) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errors = workspaceService.getWorkspaceOwnerErrors(workspace, user);
        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        workspaceService.delete(workspace);
        return ResponseEntity.ok(response.withPayload(new MessageResponseBody("Workspace успешно удален")));
    }

    @GetMapping("/{workspaceId}/projects")
    public ResponseEntity<?> getProjects(@RequestHeader(name = "Authorization") String token,
                                         @RequestParam(name = "tag", required = false) String tagsParam,
                                         @PathVariable("workspaceId") Long workspaceId) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errors = workspaceService.getWorkspaceParticipantErrors(workspace, user);
        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        Set<Project> projects;
        if (tagsParam != null && !tagsParam.isBlank()) {
            var tags = tagService.parseTagParam(tagsParam);
            projects = projectService.findByWorkspaceIdAndTags(workspaceId, tags);
        } else projects = projectService.findByWorkspaceId(workspaceId);

        List<ProjectResponseBody> projectsResponseBody = projects.stream()
                .map(ProjectResponseBody::fromProject)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response.withPayload(projectsResponseBody));
    }

    @PostMapping("/{workspaceId}/projects/add")
    public ResponseEntity<?> addProject(@RequestHeader(name = "Authorization") String token,
                                        @PathVariable("workspaceId") Long workspaceId,
                                        @RequestBody ProjectRequest projectRequest) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errors = workspaceService.getWorkspaceOwnerErrors(workspace, user);
        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        projectService.createProject(user, workspace, projectRequest);
        return ResponseEntity.ok(response.withPayload(new MessageResponseBody("Проект успешно добавлен")));
    }

    @GetMapping("/{workspaceId}/codes")
    public ResponseEntity<?> getCodes(@RequestHeader(name = "Authorization") String token,
                                      @PathVariable("workspaceId") Long workspaceId) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errors = workspaceService.getWorkspaceParticipantErrors(workspace, user);
        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        var responseBody = workspace.getCodes().stream()
                .map(WorkspaceCodeResponseBody::fromWorkspaceCode)
                .collect(Collectors.toSet());
        return ResponseEntity.ok(response.withPayload(responseBody));
    }

    @PostMapping("/{workspaceId}/participants/add")
    public ResponseEntity<?> addParticipant(@RequestHeader(name = "Authorization") String token,
                                            @PathVariable("workspaceId") Long workspaceId,
                                            @RequestParam(name = "code") String code) {
        var response = new GeneralResponse<>();
        var workspace = workspaceService.findById(workspaceId);
        var user = userService.parseAndFindByJwt(token);
        var workspaceCode = workspaceCodeService.findByCode(code);
        workspaceService.addWorkspaceParticipant(user, workspace, workspaceCode);
        var okMessage = String.format("Пользователь %s добавлен в workspace %s", user.getLogin(), workspace.getName());
        return ResponseEntity.ok(response.withPayload(new MessageResponseBody(okMessage)));
    }
}
