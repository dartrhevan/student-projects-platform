package com.platform.projapp.service;

import com.platform.projapp.model.RefreshToken;
import com.platform.projapp.model.User;
import com.platform.projapp.property.AppProperties;
import com.platform.projapp.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final AppProperties appProperties;

    private final RefreshTokenRepository tokenRepository;


    public RefreshToken findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public RefreshToken findByUser(User user) {
        return tokenRepository.findByUser(user);
    }

    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken;
        String token = UUID.randomUUID().toString();
        Instant expiryDate = Instant.now().plusMillis(appProperties.getJwt().getRefreshExpirationMs());
        if ((refreshToken = findByUser(user)) != null) {
            refreshToken.setToken(token);
            refreshToken.setExpiryDate(expiryDate);
        } else refreshToken = new RefreshToken(token, expiryDate, user);
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
