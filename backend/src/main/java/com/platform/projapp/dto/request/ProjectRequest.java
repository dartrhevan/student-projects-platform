package com.platform.projapp.dto.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.platform.projapp.enumarate.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {
    @JsonAlias("title")
    @NotBlank(message = "Поле name обязательно для заполнения")
    private String name;
    private String shortDescription;
    private String fullDescription;
    private String trackerLink;
    private List<Long> tags;
    private Integer maxParticipantsCount;
    private ProjectStatus status;
}
