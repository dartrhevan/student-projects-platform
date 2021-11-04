package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Yarullin Renat
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenRefreshRequest {
    private String tokenRefresh;
}
