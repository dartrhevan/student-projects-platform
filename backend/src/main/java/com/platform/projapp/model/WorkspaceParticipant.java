package com.platform.projapp.model;

import com.platform.projapp.enumarate.WorkspaceRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author Yarullin Renat
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class WorkspaceParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Workspace workspace;
    private WorkspaceRole workspaceRole;

    public WorkspaceParticipant(User user, Workspace workspace, WorkspaceRole workspaceRole) {
        this.user = user;
        this.workspace = workspace;
        this.workspaceRole = workspaceRole;
    }
}
