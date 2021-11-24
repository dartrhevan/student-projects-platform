package com.platform.projapp.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkspaceRequest {
    @NotBlank(message = "Поле title обязательно для заполнения")
    private String title;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    @NotNull(message = "Поле startDate обязательно для заполнения")
    private LocalDate startDate;
    @NotNull(message = "Поле sprintLength обязательно для заполнения")
    @Positive(message = "Поле sprintLength должно быть больше 0")
    private Integer sprintLength;
    @NotNull(message = "Поле sprintCount обязательно для заполнения")
    @Positive(message = "Поле sprintCount должно быть больше 0")
    private Integer sprintCount;

}
