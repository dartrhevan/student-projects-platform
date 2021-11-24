package com.platform.projapp.service;

import com.platform.projapp.dto.request.ParticipantRequest;
import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.model.Participant;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class ParticipantService {
    private final ParticipantRepository participantRepository;
    private final UserService userService;
    private final ProjectRoleService projectRoleService;

    public Participant findByUserAndProjectStatus(User user, ProjectStatus projectStatus) {
        return participantRepository.findByUserAndProjectStatus(user, projectStatus);
    }

    public Participant createParticipant(Project project, ParticipantRequest participantRequest) {
        var user = userService.findByUserName(participantRequest.getUsername());
        var participant = new Participant(project, false, user, projectRoleService.findById(participantRequest.getProjectRoleId()));
        participantRepository.save(participant);
        return participant;
    }
}
