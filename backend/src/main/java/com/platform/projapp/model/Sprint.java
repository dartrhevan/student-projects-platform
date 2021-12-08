package com.platform.projapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

import static javax.persistence.CascadeType.ALL;

@Getter
@Setter
@Entity
@Table
@ToString(exclude = {"scores"})
@NoArgsConstructor
public class Sprint {

    public Sprint(int orderNumber, String goals, LocalDate startDate, LocalDate endDate, Project project) {
        this.orderNumber = orderNumber;
        this.goals = goals;
        this.startDate = startDate;
        this.project = project;
        this.endDate = endDate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true)
    private Long id;
    private int orderNumber;
    private String goals;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long presentationId;
    @ManyToOne
    private Project project;
    @OneToMany(mappedBy = "sprint", cascade = ALL, orphanRemoval = true)
    private List<Score> scores;

    public boolean isTomorrow() {
        return endDate.minusDays(1L).equals(LocalDate.now());
    }

    public boolean isHalfTheDuration() {
        return endDate.minusWeeks(project.getWorkspace().getFrequencyOfSprints() / 2).equals(LocalDate.now());
    }

    public Float getResultScore() {
        float result = 0f;
        for (Score score :
                scores) {
            result = +score.getResultScore();
        }
        return result;
    }
}
