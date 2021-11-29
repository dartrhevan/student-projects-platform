package com.platform.projapp.repository;

import com.platform.projapp.model.Notification;
import com.platform.projapp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yarullin Renat
 */
@Repository
public interface NotificationRepository extends PagingAndSortingRepository<Notification, Long> {
    Page<Notification> findAllByRecipient(User recipient, Pageable pageable);
}
