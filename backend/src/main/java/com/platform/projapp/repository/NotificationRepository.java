package com.platform.projapp.repository;

import com.platform.projapp.enumarate.NotificationType;
import com.platform.projapp.model.Notification;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.User;
import com.platform.projapp.model.Workspace;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Repository
public interface NotificationRepository extends PagingAndSortingRepository<Notification, Long> {
    Page<Notification> findAllByRecipient(User recipient, Pageable pageable);

    boolean existsByRecipientAndSenderAndProjectAndTypeAndAnswerNull(User recipient, User sender, Project project, NotificationType type);

    boolean existsByRecipientAndIsNew(User recipient, boolean isNew);

    @Override
    List<Notification> findAll();
}
