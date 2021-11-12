package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {
    @NotBlank(message = "Поле name обязательно для заполнения")
    private String name;
    private String shortDescription;
    private String fullDescription;
    private String trackerLink;
    private List<Long> tags;
    @NotNull(message = "Поле sprintCount обязательно для заполнения")
    @Positive(message = "Поле sprintCount должно быть больше 0")
    private Integer maxParticipantsCount;
}
