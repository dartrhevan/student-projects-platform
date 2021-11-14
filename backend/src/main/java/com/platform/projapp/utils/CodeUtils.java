package com.platform.projapp.utils;

import com.platform.projapp.enumarate.WorkspaceRole;
import org.apache.commons.lang3.RandomStringUtils;

/**
 * @author Yarullin Renat
 */

public class CodeUtils {
    public static String getRandomCodeByWorkspaceRole(WorkspaceRole workspaceRole) {
        String firstLetters = workspaceRole.getText();
        return firstLetters + RandomStringUtils.random(9 - firstLetters.length(), true, true);
    }
}
