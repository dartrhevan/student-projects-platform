package com.platform.projapp.controller;

import com.platform.projapp.dto.request.ParticipantRequest;
import com.platform.projapp.dto.request.ProjectRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.dto.response.body.ProjectResponseBody;
import com.platform.projapp.dto.response.body.ResponseBody;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.model.Participant;
import com.platform.projapp.service.ProjectService;
import com.platform.projapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Yarullin Renat
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects/{projectId}")
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getProject(@RequestHeader(name = "Authorization") String token,
                                        @PathVariable("projectId") Long projectId) {
        GeneralResponse<ResponseBody> response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var project = projectService.findById(projectId);
        List<ErrorInfo> errors = projectService.getProjectErrors(project, user);
        return errors.isEmpty() ?
                ResponseEntity.ok(response.withPayload(ProjectResponseBody.fromProject(project))) :
                ResponseEntity.badRequest().body(response.withErrors(errors));
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProject(@RequestHeader(name = "Authorization") String token,
                                           @PathVariable("projectId") Long projectId,
                                           @RequestBody ProjectRequest projectRequest) {
        GeneralResponse<ResponseBody> response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var project = projectService.findById(projectId);
        List<ErrorInfo> errors = projectService.getProjectErrors(project, user);
        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        projectService.updateProject(project, projectRequest);
        return ResponseEntity.ok(response.withPayload(new MessageResponseBody("Проект успешно обновлен")));

    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteProject(@RequestHeader(name = "Authorization") String token,
                                           @PathVariable("projectId") Long projectId) {
        GeneralResponse<ResponseBody> response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var project = projectService.findById(projectId);
        List<ErrorInfo> errors = projectService.getProjectErrors(project, user);
        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        projectService.delete(project);
        return ResponseEntity.ok(response.withPayload(new MessageResponseBody("Проект успешно удален")));
    }

    @PostMapping("/participants/add")
    public ResponseEntity<?> addParticipant(@RequestHeader(name = "Authorization") String token,
                                            @PathVariable("projectId") Long projectId,
                                            @RequestBody ParticipantRequest request) {
        GeneralResponse<ResponseBody> response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var project = projectService.findById(projectId);
        List<ErrorInfo> errors = projectService.getProjectErrors(project, user);
        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(response.withErrors(errors));
        Participant participant = projectService.addParticipant(project, request);
        var okMessage = String.format("Пользователь %s добавлен в проект %s",
                participant.getUser().getLogin(),
                project.getName());
        return ResponseEntity.ok(response.withPayload(new MessageResponseBody(okMessage)));
    }
}
