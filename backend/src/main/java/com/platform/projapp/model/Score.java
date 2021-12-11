package com.platform.projapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author Yarullin Renat
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true)
    private Long id;

    @ManyToOne
    private Sprint sprint;
    @ManyToOne
    @JoinColumn(name = "creator_username")
    private User user;

    private Float presentationScore;
    private Float trackerScore;
    private String comment;

    public Score(Sprint sprint, User user, Float presentationScore, Float trackerScore, String comment) {
        this.sprint = sprint;
        this.user = user;
        this.presentationScore = presentationScore;
        this.trackerScore = trackerScore;
        this.comment = comment;
    }

    public Float getResultScore() {
        return (presentationScore + trackerScore) / 2.0f;
    }
}
