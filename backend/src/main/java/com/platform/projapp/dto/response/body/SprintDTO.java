package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Comment;
import com.platform.projapp.model.Sprint;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
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
        this.presentation = String.format("/api/presentation/%d", sprint.getPresentationId());
//        this.maxParticipantsCount = sprint.getMaxParticipantsCount();
        this.comments = sprint.getComments().stream().map(c -> new CommentDTO(c.getMentorName(), c.getComment())).collect(Collectors.toList());
    }

    private long id;
    private int orderNumber;
    private String goals;
    private LocalDate startDate;
    private LocalDate endDate;
    private String presentation;
//    private Integer maxParticipantsCount;
    private List<CommentDTO> comments;
}
