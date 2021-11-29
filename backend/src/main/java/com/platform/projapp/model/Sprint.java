package com.platform.projapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table
@ToString
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
    private Long id;
    private int orderNumber;
    private String goals;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long presentationId;
    @ManyToOne
    private Project project;
    @OneToMany(mappedBy = "sprintId")
    private List<Comment> comments;
}
