package com.platform.projapp.controller;

import com.platform.projapp.dto.request.ScoreRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.ProjectWithScoresResponseBody;
import com.platform.projapp.dto.response.body.ProjectsWithScoresResponseBody;
import com.platform.projapp.dto.response.body.ScoreResponseBody;
import com.platform.projapp.dto.response.body.ScoresResponseBody;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.service.ScoreService;
import com.platform.projapp.service.SprintService;
import com.platform.projapp.service.UserService;
import com.platform.projapp.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/scores")
public class ScoreController {
    private final ScoreService scoreService;
    private final SprintService sprintService;
    private final WorkspaceService workspaceService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getScores(@RequestParam(name = "workspaceId") Long workspaceId) {
        var workspace = workspaceService.findById(workspaceId);
        ResponseEntity<?> workspaceErrorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspace,
                "",
                Collections.emptyList());
        if (workspaceErrorResponseEntity != null)
            return workspaceErrorResponseEntity;
        Set<ProjectWithScoresResponseBody> projectWithScoresResponseBodies = workspace.getProjects().stream()
                .map(ProjectWithScoresResponseBody::fromProject)
                .collect(Collectors.toSet());
        return ResponseEntity.ok(new GeneralResponse<>().withData(ProjectsWithScoresResponseBody.of(projectWithScoresResponseBodies.size(), projectWithScoresResponseBodies)));
    }

    @GetMapping("/evaluate")
    public ResponseEntity<?> getTableOfScores(@RequestHeader(name = "Authorization") String token,
                                              @RequestParam(name = "sprintId") Long sprintId) {
        Sprint sprint = sprintService.findById(sprintId);
        var user = userService.parseAndFindByJwt(token);
        Workspace workspace = sprint.getProject().getWorkspace();
        ResponseEntity<?> workspaceErrorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspace,
                user.getLogin(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_MENTOR_OR_OWNER));
        if (workspaceErrorResponseEntity != null)
            return workspaceErrorResponseEntity;
        Set<ScoreResponseBody> scoreResponseBodies = scoreService.findAllBySprint(sprint).stream().map(ScoreResponseBody::fromScore).collect(Collectors.toSet());
        return ResponseEntity.ok(new GeneralResponse<>().withData(ScoresResponseBody.of(scoreResponseBodies)));
    }

    @PostMapping("/evaluate")
    public ResponseEntity<?> addScores(@RequestHeader(name = "Authorization") String token,
                                       @RequestBody List<ScoreRequest> scoreRequestList) {
        var user = userService.parseAndFindByJwt(token);
        Sprint sprint = sprintService.findById(scoreRequestList.get(0).getSprintId());
        Workspace workspace = sprint.getProject().getWorkspace();
        ResponseEntity<?> workspaceErrorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspace,
                user.getLogin(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_MENTOR_OR_OWNER));
        if (workspaceErrorResponseEntity != null)
            return workspaceErrorResponseEntity;
        scoreService.addScores(scoreRequestList);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
