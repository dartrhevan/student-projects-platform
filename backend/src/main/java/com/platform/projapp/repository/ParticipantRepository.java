package com.platform.projapp.repository;

import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.model.Participant;
import com.platform.projapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yarullin Renat
 */
@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    Participant findByUserAndProjectStatus(User user, ProjectStatus projectStatus);
}
