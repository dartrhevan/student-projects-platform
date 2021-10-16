package com.platform.projapp.repository;

import com.platform.projapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yarullin Renat
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
    Boolean existsByLogin(String login);
    Boolean existsByEmail(String email);
}
