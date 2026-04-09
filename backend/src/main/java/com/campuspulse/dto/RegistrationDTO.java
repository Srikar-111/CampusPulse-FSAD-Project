package com.campuspulse.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationDTO {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private Long eventId;
    private String eventName;
    private String status;
    private LocalDateTime registeredAt;
}
