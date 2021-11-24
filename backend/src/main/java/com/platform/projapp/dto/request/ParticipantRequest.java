package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Yarullin Renat
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantRequest {
//    private Long userId;
    private String username;
    private Long projectRoleId;
}
