package com.platform.projapp.service;

import com.platform.projapp.dto.request.AddOrUpdateSprintRequest;
import com.platform.projapp.dto.response.body.SprintDTO;
import com.platform.projapp.error.NotFoundException;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.repository.ProjectRepository;
import com.platform.projapp.repository.SprintsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SprintsService {
    private final SprintsRepository sprintsRepository;
    private final ProjectRepository projectRepository;

    public List<SprintDTO> getForProject(long projectId) throws NotFoundException {
        if (!projectRepository.existsById(projectId)) {
            throw new NotFoundException();
        }
        return sprintsRepository.findAllByProjectId(projectId).stream().map(SprintDTO::new).collect(Collectors.toList());
    }

    public void addSprint(AddOrUpdateSprintRequest addOrUpdateSprintRequest) throws NotFoundException {
        sprintsRepository.save(new Sprint(addOrUpdateSprintRequest.getNumber(), addOrUpdateSprintRequest.getGoals(),
                addOrUpdateSprintRequest.getStartDate(), addOrUpdateSprintRequest.getEndDate(),
                projectRepository.findById(addOrUpdateSprintRequest.getProjectId()).orElseThrow(NotFoundException::new)));
    }

    public void updateSprint(AddOrUpdateSprintRequest addOrUpdateSprintRequest) throws NotFoundException {
        var sprint = sprintsRepository.findById(addOrUpdateSprintRequest.getSprintId()).orElseThrow(NotFoundException::new);
        sprint.setGoals(addOrUpdateSprintRequest.getGoals());
        sprint.setStartDate(addOrUpdateSprintRequest.getStartDate());
        sprint.setEndDate(addOrUpdateSprintRequest.getEndDate());
        if (addOrUpdateSprintRequest.getNumber() != null)
            sprint.setOrderNumber(addOrUpdateSprintRequest.getNumber());
        //TODO: set presentation

        sprintsRepository.save(sprint);
//        sprintsRepository.save(new Sprint(addOrUpdateSprintRequest.getNumber(), addOrUpdateSprintRequest.getGoals(),
//                addOrUpdateSprintRequest.getStartDate(), addOrUpdateSprintRequest.getEndDate(),
//                projectRepository.findById(addOrUpdateSprintRequest.getProjectId()).orElseThrow(NotFoundException::new)));
    }

//    public void updateSprint(long projectId, int number, LocalDate startDate, LocalDate endDate) throws NotFoundException {
//        sprintsRepository.save(new Sprint(number, "", startDate, endDate, projectRepository.findById(projectId)
//                .orElseThrow(NotFoundException::new)));
//    }
}
