package com.platform.projapp.service;

import com.platform.projapp.model.RefreshToken;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.RefreshTokenRepository;
import com.platform.projapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

/**
 * @author Yarullin Renat
 */
@Service
public class RefreshTokenService {
    @Value("${projapp.jwt.expirationRefresh}")
    private Long refreshTokenExpiration;

    @Autowired
    private RefreshTokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    public RefreshToken findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public RefreshToken findByUser(User user) {
        return tokenRepository.findByUser(user);
    }

    public RefreshToken createRefreshToken(User user) {
        RefreshToken tokenByUser;
        if ((tokenByUser = tokenRepository.findByUser(user)) != null) {
            tokenRepository.delete(tokenByUser);
        }
        RefreshToken refreshToken = new RefreshToken(UUID.randomUUID().toString(),
                Instant.now().plusMillis(refreshTokenExpiration),
                user);
        tokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken refreshToken) {
        if (refreshToken.getExpiryDate().compareTo(Instant.now()) < 0) {
            tokenRepository.delete(refreshToken);
            throw new RuntimeException("refresh token is dead");
        }
        return refreshToken;
    }
}
