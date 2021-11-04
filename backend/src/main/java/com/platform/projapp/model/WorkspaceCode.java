package com.platform.projapp.model;

import com.platform.projapp.enumarate.WorkspaceRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

/**
 * @author Yarullin Renat
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class WorkspaceCode {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String code;
    private WorkspaceRole type;

    public WorkspaceCode(WorkspaceRole type) {
        this.type = type;
        code = UUID.randomUUID().toString();
    }
}
