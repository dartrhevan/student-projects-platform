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
public class NotificationReqRequest {
    private Long projectId;
    private String role;
}
