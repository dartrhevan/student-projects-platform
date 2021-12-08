package com.platform.projapp.model;

import com.platform.projapp.dto.request.ParticipantRequest;
import com.platform.projapp.enumarate.NotificationType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * @author Yarullin Renat
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true)
    private Long id;

    private LocalDate date;
    private NotificationType type;
    private Boolean answer;
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "recipient_username")
    private User recipient;
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "sender_username")
    private User sender;
    @ToString.Exclude
    @ManyToOne
    private Project project;
    @ToString.Exclude
    @ManyToOne
    private Sprint sprint;
    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "role_id")
    private ProjectRole projectRole;
    private boolean isNew = true;

    public Notification(User recipient, User sender, NotificationType type, Project project, ProjectRole projectRole) {
        this.type = type;
        this.recipient = recipient;
        this.sender = sender;
        this.project = project;
        this.projectRole = projectRole;

        this.date = LocalDate.now();
    }

    public Notification(User recipient, User sender, NotificationType type, Sprint sprint) {
        this.type = type;
        this.recipient = recipient;
        this.sender = sender;
        this.sprint = sprint;

        this.date = LocalDate.now();
    }

    public String getMessage() {
        return switch (type) {
            case INVITE -> String.format("Участник %s приглашает вас в команду %s на роль %s", sender.getFullName(), project.getName(), projectRole.getName());
            case REQUEST -> String.format("Участник %s хочет вступить в команду %s на роль %s", sender.getFullName(), project.getName(), projectRole.getName());
            case JOINED -> String.format("Участник %s вступил в команду %s на роль %s", sender.getFullName(), project.getName(), projectRole.getName());
            case NOT_JOINED -> String.format("Участник %s отказался вступать в команду %s на роль %s", sender.getFullName(), project.getName(), projectRole.getName());
            case REQUEST_REJECTED -> String.format("Ваш запрос на вступление в команду %s был отклонен", project.getName());
            case REQUEST_CONFIRMED -> String.format("Ваш запрос на вступление в команду %s был подтвержден", project.getName());
            case DEMO -> String.format("%s будет проходит демо по спринту № %s", sprint.getEndDate(), sprint.getOrderNumber());
            case DEMO_VERIFICATION -> String.format("Завтра %s будет проходит демо по %s. Будете ли вы присутствовать?", sprint.getEndDate(), sprint.getOrderNumber());
            case DEMO_CONFIRMED -> String.format("Ментор %s подтвердил свое присутствие завтра %s на демо спринта № %s", sender.getFullName(), sprint.getEndDate(), sprint.getOrderNumber());
            case DEMO_REJECTED -> String.format("Ментор %s не сможет присутствовать завтра %s на демо спринта № %s", sender.getFullName(), sprint.getEndDate(), sprint.getOrderNumber());
        };
    }

    public ParticipantRequest getParticipantRequest() {
        return switch (type) {
            case JOINED -> new ParticipantRequest(sender.getUsername(), projectRole.getId());
            case REQUEST_CONFIRMED -> new ParticipantRequest(recipient.getUsername(), projectRole.getId());
            default -> null;
        };
    }
}
