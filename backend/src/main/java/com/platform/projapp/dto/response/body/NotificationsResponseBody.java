package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor(staticName = "of")
public class NotificationsResponseBody implements ResponseBody {
    private Long totalCount;
    private Set<NotificationResponseBody> notifications;
}
