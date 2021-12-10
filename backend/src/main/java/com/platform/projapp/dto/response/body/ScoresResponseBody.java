package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor(staticName = "of")
public class ScoresResponseBody implements ResponseBody {
    private int currentSprintNumber;
    private Set<ScoreResponseBody> scores;
}
