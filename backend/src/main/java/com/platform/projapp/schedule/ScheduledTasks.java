package com.platform.projapp.schedule;

import com.platform.projapp.enumarate.NotificationType;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.service.NotificationService;
import com.platform.projapp.service.SprintService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Component
@RequiredArgsConstructor
public class ScheduledTasks {
    private final SprintService sprintService;
    private final NotificationService notificationService;

    @Scheduled(cron = "0 0 10 * * ?")
    public void sendSprintNotificationEveryDay() {
        Set<Sprint> sprints = sprintService.findAll().stream()
                .filter(sprint -> sprint.isHalfTheDuration() || sprint.isTomorrow())
                .collect(Collectors.toSet());
        for (Sprint sprint :
                sprints) {
            if (sprint.isHalfTheDuration())
                notificationService.sendSprintNotification(sprint, NotificationType.DEMO);
            if (sprint.isTomorrow())
                notificationService.sendSprintNotification(sprint, NotificationType.DEMO_VERIFICATION);
        }
    }
}
