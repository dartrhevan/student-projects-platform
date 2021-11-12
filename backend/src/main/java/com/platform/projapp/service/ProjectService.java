package com.platform.projapp.service;

import com.platform.projapp.dto.request.ParticipantRequest;
import com.platform.projapp.dto.request.ProjectRequest;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.model.*;
import com.platform.projapp.repository.ProjectRepository;
import com.platform.projapp.repository.ProjectRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ParticipantService participantService;
    private final WorkspaceService workspaceService;
    private final TagService tagService;
    private final ProjectRoleRepository projectRoleRepository;

    public Project findById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public void delete(Project project) {
        project.getTags().clear();
        projectRepository.delete(project);
    }

    public Page<Project> findAllByWorkspace(Workspace workspace, Pageable pageable) {
        return projectRepository.findAllByWorkspace(workspace, pageable);
    }

    public Page<Project> findAllByWorkspaceAndTagsInTags(Workspace workspace, Set<Tag> tags, Pageable pageable) {
        return projectRepository.findAllByWorkspaceAndTagsInTags(workspace, tags, pageable);
    }

    public void createProject(User user, Workspace workspace, ProjectRequest projectRequest) {
        Project project = new Project(projectRequest.getName(),
                projectRequest.getShortDescription(),
                projectRequest.getFullDescription(),
                projectRequest.getTrackerLink(),
                ProjectStatus.NEW,
                projectRequest.getMaxParticipantsCount(),
                workspace,
                tagService.findAllByIdIn(projectRequest.getTags()));
        ProjectRole projectRole = new ProjectRole("создатель", 1);
        projectRoleRepository.save(projectRole);
        project.getParticipants().add(new Participant(project, true, user, projectRole));
        projectRepository.save(project);
    }

    public void updateProject(Project project, ProjectRequest projectRequest) {
        project.setName(projectRequest.getName());
        project.setShortDescription(projectRequest.getShortDescription());
        project.setFullDescription(projectRequest.getFullDescription());
        project.setTrackerLink(projectRequest.getTrackerLink());
        project.setMaxParticipantsCount(projectRequest.getMaxParticipantsCount());
        project.setTags(tagService.findAllByIdIn(projectRequest.getTags()));
        projectRepository.save(project);
    }

    public void addParticipant(Project project, ParticipantRequest participantRequest) {
        Participant participant = participantService.createParticipant(project, participantRequest);
        project.getParticipants().add(participant);
        projectRepository.save(project);
    }

    public ResponseEntity<?> getProjectErrorResponseEntity(Project project, Long userId, List<ErrorInfo> errorsInfo) {
        if (project == null) {
            return ResponseEntity.badRequest()
                    .body(MessageResponseBody.of(ErrorConstants.PROJECT_NOT_FOUND.getMessage()));
        }
        if (errorsInfo.contains(ErrorConstants.USER_IN_PROJECT) && project.hasUser(userId))
            return ResponseEntity.badRequest()
                    .body(MessageResponseBody.of(ErrorConstants.USER_IN_PROJECT.getMessage()));
        return workspaceService.getWorkspaceErrorResponseEntity(project.getWorkspace(), userId, errorsInfo);
    }
}
