package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor(staticName = "of")
public class ProjectsWithScoresResponseBody implements ResponseBody {
    private Integer sprintsCount;
    private Set<ProjectWithScoresResponseBody> projects;
}
