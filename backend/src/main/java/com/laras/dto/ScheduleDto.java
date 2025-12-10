package com.laras.dto;

import com.laras.entity.Schedule;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDto {

    private Long id;

    @NotNull(message = "Schedule type is required")
    private Schedule.ScheduleType scheduleType;

    // For REGULAR - list of days (e.g., ["MONDAY", "TUESDAY", "WEDNESDAY"])
    private List<String> daysOfWeek;

    // For SPECIAL - start date
    private LocalDate startDate;

    // For SPECIAL - end date (null for single day)
    private LocalDate endDate;

    private LocalTime openTime;

    private LocalTime closeTime;

    private Boolean isClosed;

    private String description;

    private Integer priority;

    // Display order for frontend (lower = appears first)
    private Integer displayOrder;

    // For OVERRIDE - expiration date
    private LocalDate expiresAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Helper for frontend display
    private String displayDays;
    private String displayDateRange;
}
