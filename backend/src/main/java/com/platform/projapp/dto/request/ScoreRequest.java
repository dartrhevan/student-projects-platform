package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreRequest {
    private String mentor;
    private Long sprintId;
    private Float presentationScore;
    private Float trackerLinkScore;
    private String comment;
}
