package com.laras.dto;

import com.laras.entity.Schedule;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDto {

    private Long id;

    @NotNull(message = "Schedule type is required")
    private Schedule.ScheduleType scheduleType;

    private DayOfWeek dayOfWeek;

    private LocalDate specialDate;

    private LocalTime openTime;

    private LocalTime closeTime;

    private Boolean isClosed;

    private String description;

    private Integer priority;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
