package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Notification;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class NotificationResponseBody implements ResponseBody {
    private Long id;
    private Boolean isNew;
    private String typeNote;
    private String date;
    private String text;

    public static NotificationResponseBody fromNotification(Notification notification) {
        return new NotificationResponseBody(
                notification.getId(),
                notification.isNew(),
                notification.getType().toString(),
                notification.getDate().toString(),
                notification.getMessage()
        );
    }
}
