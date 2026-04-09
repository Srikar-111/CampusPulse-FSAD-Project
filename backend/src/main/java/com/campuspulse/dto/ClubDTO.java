package com.campuspulse.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClubDTO {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String color;
    private int memberCount;
    private int eventCount;
    private LocalDateTime createdAt;
}
