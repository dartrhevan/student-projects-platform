package com.platform.projapp.controller;

import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.WorkspaceParticipantInListResponseBody;
import com.platform.projapp.dto.response.body.WorkspaceParticipantsListResponseBody;
import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorUtils;
import com.platform.projapp.model.Participant;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.WorkspaceParticipant;
import com.platform.projapp.service.ParticipantService;
import com.platform.projapp.service.UserService;
import com.platform.projapp.service.WorkspaceParticipantService;
import com.platform.projapp.service.WorkspaceService;
import com.platform.projapp.utils.StrUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static com.platform.projapp.specification.WorkspaceParticipantSpecification.byParams;

/**
 * @author Yarullin Renat
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class UserController {
    private final UserService userService;
    private final WorkspaceService workspaceService;
    private final WorkspaceParticipantService workspaceParticipantService;
    private final ParticipantService participantService;

    @GetMapping
    public ResponseEntity<?> getUsersInWorkspace(@RequestHeader(name = "Authorization") String token,
                                                 @RequestParam(name = "workspaceId") Long workspaceId,
                                                 @RequestParam(name = "name", required = false) String name,
                                                 @RequestParam(name = "projectId", required = false) Long projectId,
                                                 @RequestParam(name = "surname", required = false) String surname,
                                                 @RequestParam(name = "skills", required = false) String skills,
                                                 @RequestParam(name = "roles", required = false) String roles,
                                                 @PageableDefault(size = 6) Pageable pageable) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspace,
                user.getLogin(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_PARTICIPANT));
        if (errorResponseEntity != null)
            return errorResponseEntity;

        Specification<WorkspaceParticipant> specification = byParams(workspace,
                name, surname, skills != null ? StrUtils.parseStrByComma(skills) : null,
                roles != null ? StrUtils.parseStrByComma(roles) : null);
        var page = workspaceParticipantService.findAll(specification, pageable);

        var pageErrorResponseEntity = ErrorUtils.getPageErrorResponseEntity(
                pageable.getPageNumber(),
                page.getTotalPages()
        );
        if (pageErrorResponseEntity != null) return pageErrorResponseEntity;

        var participantInListResponseBodies = page.getContent().stream()
                .map(workspaceParticipant -> {
                    var projectParticipant = participantService.findByUserAndProjectStatus(
                            workspaceParticipant.getUser(), workspaceParticipant.getWorkspace(),
                            Set.of(ProjectStatus.IN_PROGRESS, ProjectStatus.MODIFYING, ProjectStatus.NEW));
                    if (projectParticipant.stream().anyMatch(p -> p.getProject().getId().equals(projectId)))
                        return null;
                    var project = projectParticipant.size() != 0 ? projectParticipant.get(0).getProject() : null;
//                    if (project != null) {
//                        project = project.getWorkspace().equals(workspaceParticipant.getWorkspace()) ? project : null;
//                    }
                    return WorkspaceParticipantInListResponseBody.fromWorkspaceParticipant(workspaceParticipant, project);
                }).filter(Objects::nonNull).collect(Collectors.toSet());

        WorkspaceParticipantsListResponseBody participantsListResponseBody = WorkspaceParticipantsListResponseBody.of(
                (long) page.getNumberOfElements(),
                participantInListResponseBodies
        );

        return ResponseEntity.ok(response.withData(participantsListResponseBody));
    }
}
