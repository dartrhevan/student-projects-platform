package com.platform.projapp.repository;

import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.model.Participant;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    Participant findByUserAndProjectStatus(User user, ProjectStatus projectStatus);

    List<Participant> findByUser(User user, Pageable pageable);
}
