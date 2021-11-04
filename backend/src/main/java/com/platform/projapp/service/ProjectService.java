package com.platform.projapp.service;

import com.platform.projapp.dto.request.ParticipantRequest;
import com.platform.projapp.dto.request.ProjectRequest;
import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorInfo;
import com.platform.projapp.model.*;
import com.platform.projapp.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
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

    public Project findById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public void delete(Project project) {
        projectRepository.delete(project);
    }

    public Set<Project> findByWorkspaceId(Long workspaceId) {
        return projectRepository.findAllByWorkspaceId(workspaceId);
    }

    public Set<Project> findByWorkspaceIdAndTags(Long workspaceId, Set<Tag> tags) {
        return projectRepository.findAllByWorkspaceIdAndTagsIn(workspaceId, tags);
    }

    public void createProject(User user, Workspace workspace, ProjectRequest projectRequest) {
        Project project = new Project(projectRequest.getName(),
                projectRequest.getShortDescription(),
                projectRequest.getFullDescription(),
                ProjectStatus.valueOf(projectRequest.getStatus()),
                projectRequest.getMaxParticipantsCount(),
                user,
                workspace,
                tagService.findByNameIn(projectRequest.getTagsName()));
        projectRepository.save(project);
    }

    public void updateProject(Project project, ProjectRequest projectRequest) {
        project.setName(projectRequest.getName());
        project.setShortDescription(projectRequest.getShortDescription());
        project.setFullDescription(projectRequest.getFullDescription());
        project.setStatus(ProjectStatus.valueOf(projectRequest.getStatus()));
        project.setMaxParticipantsCount(projectRequest.getMaxParticipantsCount());
        project.setTags(tagService.findByNameIn(projectRequest.getTagsName()));
        projectRepository.save(project);
    }

    public Participant addParticipant(Project project, ParticipantRequest participantRequest) {
        Participant participant = participantService.createParticipant(project, participantRequest);
        project.getParticipants().add(participant);
        projectRepository.save(project);
        return participant;
    }

    public List<ErrorInfo> getProjectErrors(Project project, User user) {
        if (project == null) return List.of(ErrorConstants.PROJECT_NOT_FOUND);
        return workspaceService.getWorkspaceParticipantErrors(project.getWorkspace(), user);
    }
}
