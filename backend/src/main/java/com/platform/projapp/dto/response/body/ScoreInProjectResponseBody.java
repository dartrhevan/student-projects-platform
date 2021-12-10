package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Sprint;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class ScoreInProjectResponseBody implements ResponseBody {
    private Integer numberSprint;
    private Float sprintScore;

    public static ScoreInProjectResponseBody fromSprint(Sprint sprint) {
        return new ScoreInProjectResponseBody(sprint.getOrderNumber(), sprint.getProject().getResultScore());
    }
}
