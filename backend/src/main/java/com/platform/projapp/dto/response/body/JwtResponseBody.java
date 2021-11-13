package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class JwtResponseBody implements ResponseBody {
    private String accessToken;
    private String refreshToken;
    private User user;
}
