package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Score;
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
        Float scores = sprint.getScores().stream().map(Score::getResultScore).reduce(0f, Float::sum);
        scores = sprint.getScores().size() > 0 ? scores / sprint.getScores().size() : 0f;
        return new ScoreInProjectResponseBody(sprint.getOrderNumber(), scores);
    }
}
