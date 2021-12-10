package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Sprint;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class SprintDTO {
    public SprintDTO(Sprint sprint) {
        this.id = sprint.getId();
        this.orderNumber = sprint.getOrderNumber();
        this.goals = sprint.getGoals();
        this.startDate = sprint.getStartDate();
        this.endDate = sprint.getEndDate();
        if (sprint.getPresentationId() != null)
            this.presentation = String.format("/api/presentation/%d", sprint.getPresentationId());
//        this.maxParticipantsCount = sprint.getMaxParticipantsCount();
        this.comment = new CommentDTO(sprint.getScore().getUser().getName(), sprint.getScore().getComment());
    }

    private long id;
    private int orderNumber;
    private String goals;
    private LocalDate startDate;
    private LocalDate endDate;
    private String presentation;
    //    private Integer maxParticipantsCount;
    private CommentDTO comment;
}
