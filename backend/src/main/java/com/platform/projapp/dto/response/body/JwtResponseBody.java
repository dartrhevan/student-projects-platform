package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class JwtResponseBody {
    private String jwt;
    private String refreshToken;
    private User user;
}
