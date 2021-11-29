package com.platform.projapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * @author Yarullin Renat
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Sprint {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true)
    private Long id;
    private Integer number;
    private LocalDate date;
    @ManyToOne
    private Project project;

    public boolean isTomorrow() {
        return date.minusDays(1L).equals(LocalDate.now());
    }

    public boolean isHalfTheDuration() {
        return date.minusWeeks(project.getWorkspace().getFrequencyOfSprints() / 2).equals(LocalDate.now());
    }
}
