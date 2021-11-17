package com.platform.projapp.utils;

import java.util.List;

/**
 * @author Yarullin Renat
 */

public class StrUtils {
    public static List<String> parseStrByComma(String str) {
        return List.of(str.split(","));
    }
}
