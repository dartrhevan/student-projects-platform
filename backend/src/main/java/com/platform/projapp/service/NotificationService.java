package com.platform.projapp.service;

import com.platform.projapp.dto.request.NotificationInviteRequest;
import com.platform.projapp.dto.request.NotificationReqRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.enumarate.NotificationType;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.error.ErrorUtils;
import com.platform.projapp.model.*;
import com.platform.projapp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final ProjectService projectService;
    private final ProjectRoleService projectRoleService;
    private final ParticipantService participantService;

    public Notification findById(Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    public Page<Notification> findAllByRecipient(User recipient, Pageable pageable) {
        return notificationRepository.findAllByRecipient(recipient, pageable);
    }

    public boolean notificationExists(User recipient, User sender, Project project, NotificationType type) {
        return notificationRepository.existsByRecipientAndSenderAndProjectAndTypeAndAnswerNull(recipient, sender, project, type);
    }

    public boolean hasNew(User recipient) {
        return notificationRepository.existsByRecipientAndIsNew(recipient, true);
    }

    public ResponseEntity<?> sendInviteNotification(User sender, NotificationInviteRequest request, NotificationType notificationType) {
        User recipient = userService.findByUserName(request.getUsername());
        Project project = projectService.findById(request.getProjectId());
        ProjectRole role = projectRoleService.createProjectRole(request.getRole());
        if (notificationExists(sender, recipient, project, NotificationType.REQUEST))
            return ResponseEntity.badRequest().body(new GeneralResponse<>().withError(ErrorConstants.USER_ALREADY_SEND_YOU_REQ));
        Notification notification = new Notification(recipient, sender, notificationType, project, role);
        notificationRepository.save(notification);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> sendReqNotification(User sender, NotificationReqRequest request, NotificationType notificationType) {
        Project project = projectService.findById(request.getProjectId());
        ProjectRole role = projectRoleService.createProjectRole(request.getRole());
        User recipient = project.getOwner();
        if (notificationExists(sender, recipient, project, NotificationType.INVITE))
            return ResponseEntity.badRequest().body(new GeneralResponse<>().withError(ErrorConstants.USER_ALREADY_SEND_YOU_INV));
        Notification notification = new Notification(recipient, sender, notificationType, project, role);
        notificationRepository.save(notification);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> sendNotification(User sender, Notification notification, NotificationType notificationType) {
        User recipient = notification.getSender();
        Project project = notification.getProject();
        ProjectRole role = notification.getProjectRole();
        ResponseEntity<?> notFoundErrors = ErrorUtils.getNotFoundErrorResponseEntity(List.of(recipient, project, role));
        if (notFoundErrors != null) return notFoundErrors;
        Notification newNotification = new Notification(recipient, sender, notificationType, project, role);
        if (newNotification.getType().equals(NotificationType.JOINED) || newNotification.getType().equals(NotificationType.REQUEST_CONFIRMED)) {
            participantService.createParticipant(newNotification.getProject(), newNotification.getParticipantRequest());
        }
        notificationRepository.save(newNotification);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public void sendSprintNotification(Sprint sprint, NotificationType notificationType) {
        Set<Notification> notifications = sprint.getProject().getWorkspaceMentors().stream()
                .map(user -> new Notification(user, sprint.getProject().getOwner(), notificationType, sprint))
                .collect(Collectors.toSet());
        notificationRepository.saveAll(notifications);
    }

    public ResponseEntity<?> sendSprintNotification(Notification notification, NotificationType notificationType) {
        Notification newNotification = new Notification(notification.getSender(), notification.getRecipient(), notificationType, notification.getSprint());
        notificationRepository.save(newNotification);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> replyToNotification(User sender, Notification notification, Boolean answer) {
        NotificationType type;
        ResponseEntity<?> notFoundErrors = ErrorUtils.getNotFoundErrorResponseEntity(Collections.singletonList(notification));
        if (notFoundErrors != null) return notFoundErrors;
        if (notification.getType().equals(NotificationType.INVITE))
            type = answer ? NotificationType.JOINED : NotificationType.NOT_JOINED;
        else if (notification.getType().equals(NotificationType.REQUEST))
            type = answer ? NotificationType.REQUEST_CONFIRMED : NotificationType.REQUEST_REJECTED;
        else if (notification.getType().equals(NotificationType.DEMO_VERIFICATION))
            type = answer ? NotificationType.DEMO_CONFIRMED : NotificationType.DEMO_REJECTED;
        else
            return ResponseEntity.badRequest()
                    .body(new GeneralResponse<>()
                            .withData(MessageResponseBody.of(ErrorConstants.NOTIFICATION_TYPE_NOT_VALID.getMessage())));
        notification.setAnswer(answer);
        notification.setNew(false);
        notificationRepository.save(notification);
        if (notification.getType().equals(NotificationType.DEMO_VERIFICATION))
            return sendSprintNotification(notification, type);
        else return sendNotification(sender, notification, type);
    }


    public void markViewed(Notification notification) {
        notification.setNew(false);
        notificationRepository.save(notification);
    }
}
