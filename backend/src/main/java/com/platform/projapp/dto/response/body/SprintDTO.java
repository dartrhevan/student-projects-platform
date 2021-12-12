package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Sprint;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class SprintDTO {
    @SneakyThrows
    public SprintDTO(Sprint sprint) {
        this.id = sprint.getId();
        this.orderNumber = sprint.getOrderNumber();
        this.goals = sprint.getGoals();
        this.startDate = sprint.getStartDate();
        this.endDate = sprint.getEndDate();
        if (sprint.getPresentation()!= null) {
            this.presentation =String.format("/api/presentation/%d", sprint.getPresentation().getId());
        }
        this.comments = sprint.getScores().stream().map(s -> new CommentDTO(s.getUser().getFullName(), s.getComment()))
                .collect(Collectors.toSet());
    }

    private long id;
    private int orderNumber;
    private String goals;
    private LocalDate startDate;
    private LocalDate endDate;
    private String presentation;
    private Set<CommentDTO> comments;
}
