package com.platform.projapp.schedule;

import com.platform.projapp.enumarate.NotificationType;
import com.platform.projapp.enumarate.ProjectStatus;
import com.platform.projapp.model.Notification;
import com.platform.projapp.model.Project;
import com.platform.projapp.model.Sprint;
import com.platform.projapp.model.Workspace;
import com.platform.projapp.repository.NotificationRepository;
import com.platform.projapp.repository.ProjectRepository;
import com.platform.projapp.service.NotificationService;
import com.platform.projapp.service.SprintService;
import com.platform.projapp.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
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
    private final ProjectRepository projectRepository;
    private final WorkspaceService workspaceService;
    private final NotificationRepository notificationRepository;

    @Scheduled(cron = "0 0 1 * * ?")
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

    @Scheduled(cron = "0 0 1 * * ?")
    public void checkForProjectsEnd() {
        List<Workspace> workspaces = workspaceService.findAll();
        for (Workspace workspace : workspaces) {
            if (workspace.getEndDate().isBefore(LocalDate.now())) {
                List<Project> projects = projectRepository.findAllByWorkspace(workspace);
                for (Project project : projects) {
                    project.setStatus(ProjectStatus.ENDED); //TODO: подумать
                }
            }
        }
    }

    @Scheduled(cron = "0 0 2 * * ?")
    public void deleteNotifications() {
        List<Notification> notifications = notificationRepository.findAll();
        for (Notification notification : notifications) {
            if (!notification.isNew() && (notification.getAnswer() == true || notification.getAnswer() == false) && notification.getDate().isBefore(LocalDate.now().minusMonths(1)))
                notificationRepository.delete(notification);
            else if (notification.getDate().equals(null))
                notification.setDate(LocalDate.now());
        }
    }
}
