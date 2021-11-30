package com.platform.projapp.controller;

import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.NotificationResponseBody;
import com.platform.projapp.dto.response.body.NotificationsResponseBody;
import com.platform.projapp.error.ErrorUtils;
import com.platform.projapp.service.NotificationService;
import com.platform.projapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

/**
 * @author Yarullin Renat
 */
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final UserService userService;
    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<?> getNotifications(@RequestHeader(name = "Authorization") String token,
                                              @PageableDefault(size = 9) Pageable pageable) {
        var response = new GeneralResponse<>();
        var user = userService.parseAndFindByJwt(token);
        var page = notificationService.findAllByRecipient(user, pageable);
        ResponseEntity<?> pageErrorResponseEntity = ErrorUtils.getPageErrorResponseEntity(page.getNumber(), page.getTotalPages());
        if (pageErrorResponseEntity != null) return pageErrorResponseEntity;
        var notificationResponseBodies = page.getContent().stream()
                .map(NotificationResponseBody::fromNotification)
                .collect(Collectors.toSet());
        return ResponseEntity.ok(response.withData(NotificationsResponseBody.of(page.getTotalElements(), notificationResponseBodies)));
    }

    @PostMapping ResponseEntity<?> markViewed(@RequestParam(name = "notificationId") Long notificationId) {
        return null;//TODO: implement
    }
}
