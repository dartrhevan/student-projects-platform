package com.platform.projapp.dto.response.body;

import com.platform.projapp.enumarate.ProjectRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectPlan {
    private List<SprintDTO> plan;
    private String projectTitle;
    private ProjectRole role;
}
