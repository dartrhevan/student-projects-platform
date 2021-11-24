package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class MessageResponseBody implements ResponseBody {
    private String message;
}
