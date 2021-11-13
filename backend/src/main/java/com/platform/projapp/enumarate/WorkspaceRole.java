package com.platform.projapp.enumarate;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

/**
 * @author Yarullin Renat
 */
@AllArgsConstructor
public enum WorkspaceRole {
    STUDENT("std"), MENTOR("men"), ORGANIZER("org");

    @Getter
    private String text;

    public static WorkspaceRole findByText(String text) {
        return Arrays.stream(WorkspaceRole.values())
                .filter(workspaceRole -> workspaceRole.getText().equalsIgnoreCase(text))
                .findFirst()
                .orElse(null);
    }
}
