package com.platform.projapp.repository;

import com.platform.projapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Yarullin Renat
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLogin(String login);

    Boolean existsByLogin(String login);

    User getById(Long Id);
}
