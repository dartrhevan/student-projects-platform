package com.platform.projapp.service;

import com.platform.projapp.dto.request.AddOrUpdateSprintRequest;
import com.platform.projapp.dto.response.body.ProjectPlan;
import com.platform.projapp.dto.response.body.SprintDTO;
import com.platform.projapp.error.NotFoundException;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.ProjectRepository;
import com.platform.projapp.repository.SprintsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SprintsService {
    private final SprintsRepository sprintsRepository;
    private final ProjectRepository projectRepository;

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
//        if (addOrUpdateSprintRequest.getNumber() != null)
//            sprint.setOrderNumber(addOrUpdateSprintRequest.getNumber());
        //TODO: set presentation

        sprintsRepository.save(sprint);
    }

    public void removeSprint(long springId) {
        sprintsRepository.deleteById(springId);
    }
}
