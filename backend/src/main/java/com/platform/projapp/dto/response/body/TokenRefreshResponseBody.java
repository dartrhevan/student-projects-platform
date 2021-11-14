package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
public class TokenRefreshResponseBody implements ResponseBody {
    private String accessToken;
    private String refreshToken;
}
