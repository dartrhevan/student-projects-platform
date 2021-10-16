package com.platform.projapp.model;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;

/**
 * @author Yarullin Renat
 */

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;
    private Instant expiryDate;

    @OneToOne
    private User user;

    public RefreshToken(String token, Instant expiryDate, User user) {
        this.token = token;
        this.expiryDate = expiryDate;
        this.user = user;
    }
}
