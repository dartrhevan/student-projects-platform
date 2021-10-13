package com.platform.projapp.dto;

import com.platform.projapp.mock.UserMock;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class JwtResponse {
    private String jwt;
    // TODO после подключения бд заменить на entity user
    private UserMock userMock;
}
