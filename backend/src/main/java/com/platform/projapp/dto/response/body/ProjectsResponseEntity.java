package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor(staticName = "of")
public class ProjectsResponseEntity implements ResponseBody {
    private String role;
    private Long totalCount;
    private Set<ProjectResponseBody> projects;

}
