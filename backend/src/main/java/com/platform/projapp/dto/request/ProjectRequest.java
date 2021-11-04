package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {
    private String name;
    private String shortDescription;
    private String fullDescription;
    private String status;
    private Integer maxParticipantsCount;
    private List<String> tagsName;
}
