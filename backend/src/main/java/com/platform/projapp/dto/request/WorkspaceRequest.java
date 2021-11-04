package com.platform.projapp.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkspaceRequest {
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate zeroSprintDate;
    private Integer frequencyOfSprints;
    private Integer sprintCount;

}
