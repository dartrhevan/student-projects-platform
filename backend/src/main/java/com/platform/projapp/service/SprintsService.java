package com.platform.projapp.service;

import com.platform.projapp.dto.request.AddOrUpdateSprintRequest;
import com.platform.projapp.dto.response.body.ProjectPlan;
import com.platform.projapp.dto.response.body.SprintDTO;
import com.platform.projapp.error.NotFoundException;
import com.platform.projapp.model.Presentation;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.repository.PresentationRepository;
import com.platform.projapp.repository.ProjectRepository;
import com.platform.projapp.repository.ScoreRepository;
import com.platform.projapp.repository.SprintsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SprintsService {
    private final ScoreRepository scoresRepository;
    private final SprintsRepository sprintsRepository;
    private final ProjectRepository projectRepository;
    private final PresentationRepository presentationRepository;

    public Sprint findById(Long id) {
        return sprintsRepository.findById(id).orElse(null);
    }

    public Integer getCurrentSprintOrderNumberByWorkspaceAndDate(Workspace workspace, LocalDate date) {
        List<Sprint> sprints = new ArrayList<>(findAllByWorkspaceAndDate(workspace, date));
        if (sprints.size() > 0)
            return sprints.get(0).getOrderNumber();

        return 0;
    }

    public Set<Sprint> findAllByWorkspaceAndDate(Workspace workspace, LocalDate date) {
        return sprintsRepository.findAllByWorkspaceAndDate(workspace, date);
    }

    public Set<Sprint> findAllByWorkspaceAndOrderNumber(Workspace workspace, int orderNumber) {
        return sprintsRepository.findAllByWorkspaceAndOrderNumber(workspace, orderNumber);
    }

    public ProjectPlan getForProject(User user, long projectId) throws NotFoundException {
        var project = projectRepository.findById(projectId).orElseThrow(NotFoundException::new);
        var workspaceRole = project.getWorkspace().getWorkspaceRoleByUser(user);
        return new ProjectPlan(project.getSprints().stream().sorted(Comparator.comparing(Sprint::getOrderNumber))
                .map(SprintDTO::new).collect(Collectors.toList()),
                project.getName(), ProjectService.toProjectRole(workspaceRole, project, user));
        //sprintsRepository.findAllByProjectId(projectId).stream().map(SprintDTO::new).collect(Collectors.toList());
    }

    public Long addSprint(AddOrUpdateSprintRequest addOrUpdateSprintRequest) throws NotFoundException {
        return sprintsRepository.save(new Sprint(addOrUpdateSprintRequest.getNumber(), addOrUpdateSprintRequest.getGoals(),
                addOrUpdateSprintRequest.getStartDate(), addOrUpdateSprintRequest.getEndDate(),
                projectRepository.findById(addOrUpdateSprintRequest.getProjectId()).orElseThrow(NotFoundException::new))).getId();
    }

    public void updateSprint(AddOrUpdateSprintRequest addOrUpdateSprintRequest) throws NotFoundException {
        var sprint = sprintsRepository.findById(addOrUpdateSprintRequest.getSprintId()).orElseThrow(NotFoundException::new);
        sprint.setGoals(addOrUpdateSprintRequest.getGoals());
        sprint.setStartDate(addOrUpdateSprintRequest.getStartDate());
        sprint.setEndDate(addOrUpdateSprintRequest.getEndDate());
        if (addOrUpdateSprintRequest.getPresentation() != null) {
            var oldPresentation = sprint.getPresentation();
            byte[] bytes = Base64.getDecoder().decode(addOrUpdateSprintRequest.getPresentation());
            Presentation presentation = new Presentation(bytes);
            presentationRepository.save(presentation);
            sprint.setPresentation(presentation);
            if (oldPresentation != null) {
                presentationRepository.delete(oldPresentation);
            }
        }
        sprintsRepository.save(sprint);
    }

    @Transactional
    public void removeSprint(long springId) {
        scoresRepository.deleteAllBySprintId(springId);
        sprintsRepository.findById(springId).ifPresent(sprint ->
                sprintsRepository.shiftSprints(sprint.getOrderNumber(), sprint.getProject().getId()));
        sprintsRepository.deleteById(springId);;
    }
}
