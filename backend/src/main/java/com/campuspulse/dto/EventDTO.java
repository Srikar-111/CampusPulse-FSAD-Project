package com.campuspulse.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String venue;
    private String imageUrl;
    private String category;
    private Long clubId;
    private String clubName;
    private int registrationCount;
    private boolean isRegistered;
    private LocalDateTime createdAt;
}
