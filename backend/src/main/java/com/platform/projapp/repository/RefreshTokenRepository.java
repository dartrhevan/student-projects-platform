package com.platform.projapp.repository;

import com.platform.projapp.model.RefreshToken;
import com.platform.projapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yarullin Renat
 */
@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByToken(String token);
    RefreshToken findByUser(User user);
}
