package com.platform.projapp.controller;

import com.platform.projapp.dto.request.ParticipantRequest;
import com.platform.projapp.dto.request.ProjectRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.ProjectResponseBody;
import com.platform.projapp.dto.response.body.ProjectsResponseEntity;
import com.platform.projapp.dto.response.body.ResponseBody;
import com.platform.projapp.enumarate.ProjectRole;
import com.platform.projapp.enumarate.WorkspaceRole;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorUtils;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.User;
import com.platform.projapp.service.ProjectService;
import com.platform.projapp.service.TagsService;
import com.platform.projapp.service.UserService;
import com.platform.projapp.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;
    private final TagsService tagsService;
    private final WorkspaceService workspaceService;

    @GetMapping
    public ResponseEntity<?> getProjects(@PageableDefault(size = 9) Pageable pageable,
                                         @RequestHeader(name = "Authorization") String token,
                                         @RequestParam(name = "tag", required = false) String tagsParam,
                                         @RequestParam("workspaceId") Long workspaceId) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);

        ResponseEntity<?> workspaceErrorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspace,
                user.getId(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_PARTICIPANT));
        if (workspaceErrorResponseEntity != null)
            return workspaceErrorResponseEntity;

        Page<Project> page;
        if (tagsParam != null && !tagsParam.isBlank()) {
            var tags = tagsService.findByTagParam(tagsParam);
            page = projectService.findAllByWorkspaceAndTagsInTags(workspace, tags, pageable);
        } else page = projectService.findAllByWorkspace(workspace, pageable);

        var pageErrorResponseEntity = ErrorUtils.getPageErrorResponseEntity(
                pageable.getPageNumber(),
                page.getTotalPages()
        );
        if (pageErrorResponseEntity != null) return pageErrorResponseEntity;

        Set<ProjectResponseBody> projectsResponseBodyList = page.stream()
                .map(ProjectResponseBody::fromProject)
                .collect(Collectors.toSet());

        ProjectsResponseEntity projectsResponseEntity = ProjectsResponseEntity.of(
                workspace.getWorkspaceRoleByUser(user).getText(),
                page.getTotalElements(),
                projectsResponseBodyList
        );
        return ResponseEntity.ok(response.withData(projectsResponseEntity));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProject(@RequestHeader(name = "Authorization") String token,
                                        @PathVariable("projectId") Long projectId) {
        GeneralResponse<ResponseBody> response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var project = projectService.findById(projectId);
        var workspaceRole = project.getWorkspace().getWorkspaceRoleByUser(user);

        ResponseEntity<?> projectErrorResponseEntity = projectService.getProjectErrorResponseEntity(project,
                user.getId(), List.of(ErrorConstants.USER_NOT_WORKSPACE_PARTICIPANT));
        return projectErrorResponseEntity != null ? projectErrorResponseEntity :
                ResponseEntity.ok(response.withData(ProjectResponseBody.fromProject(project, toProjectRole(workspaceRole, project, user))));
    }

    private static ProjectRole toProjectRole(WorkspaceRole role, Project project, User user) {
        if (project.getOwnerId() == user.getId()) return ProjectRole.OWNER;
        return switch (role) {
            case MENTOR, ORGANIZER -> ProjectRole.MENTOR;
            case STUDENT -> !project.hasUser(user.getId()) ? ProjectRole.STRANGER : ProjectRole.PARTICIPANT;
        };
    }


    @PostMapping
    public ResponseEntity<?> addProject(@RequestHeader(name = "Authorization") String token,
                                        @RequestParam("workspaceId") Long workspaceId,
                                        @RequestBody @Valid ProjectRequest projectRequest,
                                        BindingResult bindingResult) {
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        ResponseEntity<?> workspaceErrorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspace,
                user.getId(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_PARTICIPANT));
        if (workspaceErrorResponseEntity != null)
            return workspaceErrorResponseEntity;
        var errorResponseEntity = ErrorUtils.getIncompleteOrIncorrectErrorResponseEntity(bindingResult);
        if (errorResponseEntity != null) return errorResponseEntity;
        projectService.createProject(user, workspace, projectRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<?> updateProject(@RequestHeader(name = "Authorization") String token,
                                           @PathVariable("projectId") Long projectId,
                                           @RequestBody @Valid ProjectRequest projectRequest,
                                           BindingResult bindingResult) {
        var user = userService.parseAndFindByJwt(token);
        var project = projectService.findById(projectId);
        ResponseEntity<?> projectErrorResponseEntity = projectService.getProjectErrorResponseEntity(project,
                user.getId(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_OWNER));
        if (projectErrorResponseEntity != null) return projectErrorResponseEntity;
        var errorResponseEntity = ErrorUtils.getIncompleteOrIncorrectErrorResponseEntity(bindingResult);
        if (errorResponseEntity != null) return errorResponseEntity;
        projectService.updateProject(project, projectRequest);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@RequestHeader(name = "Authorization") String token,
                                           @PathVariable("projectId") Long projectId) {
        var user = userService.parseAndFindByJwt(token);
        var project = projectService.findById(projectId);
        ResponseEntity<?> projectErrorResponseEntity = projectService.getProjectErrorResponseEntity(project,
                user.getId(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_OWNER));
        if (projectErrorResponseEntity != null) return projectErrorResponseEntity;
        projectService.delete(project);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{projectId}")
    public ResponseEntity<?> addParticipant(@RequestHeader(name = "Authorization") String token,
                                            @PathVariable("projectId") Long projectId,
                                            @RequestBody ParticipantRequest request) {
        var user = userService.parseAndFindByJwt(token);
        var project = projectService.findById(projectId);
        ResponseEntity<?> projectErrorResponseEntity = projectService.getProjectErrorResponseEntity(project,
                request.getUserId(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_PARTICIPANT, ErrorConstants.USER_IN_PROJECT));
        if (projectErrorResponseEntity != null) return projectErrorResponseEntity;
        projectService.addParticipant(project, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
