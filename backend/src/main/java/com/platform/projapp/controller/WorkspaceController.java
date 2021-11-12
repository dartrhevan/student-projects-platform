package com.platform.projapp.controller;

import com.platform.projapp.dto.request.WorkspaceRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.dto.response.body.WorkspaceCodeResponseBody;
import com.platform.projapp.dto.response.body.WorkspaceResponseBody;
import com.platform.projapp.dto.response.body.WorkspacesResponseBody;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorUtils;
import com.platform.projapp.service.UserService;
import com.platform.projapp.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    private final WorkspaceService workspaceService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getWorkspaces(@PageableDefault(size = 9) Pageable pageable,
                                           @RequestHeader(name = "Authorization") String token) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var page = workspaceService.findAllByUser(user, pageable);
        var pageErrorResponseEntity = ErrorUtils.getPageErrorResponseEntity(
                pageable.getPageNumber(),
                page.getTotalPages()
        );
        if (pageErrorResponseEntity != null) return pageErrorResponseEntity;
        var workspaceResponseBodies = page.stream()
                .map(WorkspaceResponseBody::fromWorkspace)
                .collect(Collectors.toSet());
        return ResponseEntity.ok(response.withData(WorkspacesResponseBody.of(page.getTotalElements(), workspaceResponseBodies)));
    }

    @PostMapping
    public ResponseEntity<?> addWorkspace(@RequestHeader(name = "Authorization") String token,
                                          @RequestBody @Valid WorkspaceRequest request,
                                          BindingResult bindingResult) {
        var errorResponseEntity = ErrorUtils.getIncompleteOrIncorrectErrorResponseEntity(bindingResult);
        if (errorResponseEntity != null) return errorResponseEntity;
        var user = userService.parseAndFindByJwt(token);
        workspaceService.createWorkspace(user, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{workspaceId}")
    public ResponseEntity<?> updateWorkspace(@RequestHeader(name = "Authorization") String token,
                                             @PathVariable("workspaceId") Long workspaceId,
                                             @RequestBody @Valid WorkspaceRequest request,
                                             BindingResult bindingResult) {
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspace,
                user.getId(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_OWNER));
        if (errorResponseEntity != null)
            return errorResponseEntity;
        ResponseEntity<?> incompleteOrIncorrectErrorResponseEntity = ErrorUtils.getIncompleteOrIncorrectErrorResponseEntity(bindingResult);
        if (incompleteOrIncorrectErrorResponseEntity != null)
            return incompleteOrIncorrectErrorResponseEntity;
        workspaceService.updateWorkspace(workspace, request);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/{workspaceId}")
    public ResponseEntity<?> getCodes(@RequestHeader(name = "Authorization") String token,
                                      @PathVariable("workspaceId") Long workspaceId) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspace,
                user.getId(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_OWNER));
        return errorResponseEntity != null ?
                errorResponseEntity :
                ResponseEntity.ok(response.withData(WorkspaceCodeResponseBody.fromWorkspace(workspace)));
    }

    @DeleteMapping("/{workspaceId}")
    public ResponseEntity<?> deleteWorkspace(@RequestHeader(name = "Authorization") String token,
                                             @PathVariable("workspaceId") Long workspaceId) {
        var user = userService.parseAndFindByJwt(token);
        var workspace = workspaceService.findById(workspaceId);
        var errorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspace,
                user.getId(),
                List.of(ErrorConstants.USER_NOT_WORKSPACE_OWNER));
        if (errorResponseEntity != null)
            return errorResponseEntity;
        workspaceService.delete(workspace);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/participants")
    public ResponseEntity<?> addParticipant(@RequestHeader(name = "Authorization") String token,
                                            @RequestParam String code) {
        var user = userService.parseAndFindByJwt(token);
        var workspaceByCode = workspaceService.findByCode(code);
        if (workspaceByCode == null)
            return ResponseEntity.badRequest().body(MessageResponseBody.of(ErrorConstants.INCORRECT_KEY.getMessage()));
        var errorResponseEntity = workspaceService.getWorkspaceErrorResponseEntity(workspaceByCode,
                user.getId(),
                List.of(ErrorConstants.USER_IN_WORKSPACE));
        if (errorResponseEntity != null)
            return errorResponseEntity;
        workspaceService.addWorkspaceParticipant(user, workspaceByCode, code);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleException() {
        return ResponseEntity.badRequest().body(MessageResponseBody.of(ErrorConstants.INCORRECT_DATA.getMessage()));
    }
}
