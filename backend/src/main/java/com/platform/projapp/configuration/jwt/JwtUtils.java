package com.platform.projapp.configuration.jwt;

import com.platform.projapp.model.User;
import com.platform.projapp.property.AppProperties;
import com.platform.projapp.service.UserService;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author Yarullin Renat
 */
@Slf4j
@Component
public class JwtUtils {
    private final AppProperties appProperties;

    private final UserService userService;

    public JwtUtils(AppProperties appProperties, @Lazy UserService userService) {
        this.appProperties = appProperties;
        this.userService = userService;
    }

    public String generateJwtToken(Authentication authentication) {

        UserDetails userPrincipal = (User) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + appProperties.getJwt().getExpirationMs()))
                .signWith(SignatureAlgorithm.HS512, appProperties.getJwt().getSecret())
                .compact();
    }

    public String generateJwtTokenFromUsername(String username) {

        UserDetails userPrincipal = userService.findByUserName(username);

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + appProperties.getJwt().getExpirationMs()))
                .signWith(SignatureAlgorithm.HS512, appProperties.getJwt().getSecret())
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .setSigningKey(appProperties.getJwt().getSecret())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser()
                    .setSigningKey(appProperties.getJwt().getSecret())
                    .parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException e) {
            log.warn("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.warn("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.warn("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.warn("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
