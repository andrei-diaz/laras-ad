package com.laras.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Schedule entity for restaurant operating hours.
 * Supports regular hours (by day of week) and special dates (holidays, etc.)
 */
@Entity
@Table(name = "schedules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Schedule extends BaseEntity {

    public enum ScheduleType {
        REGULAR, // Normal weekly schedule
        SPECIAL, // Special date (holiday, event)
        OVERRIDE // Temporary override (force open/closed)
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "schedule_type", nullable = false)
    @NotNull
    private ScheduleType scheduleType;

    // For REGULAR schedules - which day of the week
    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week")
    private DayOfWeek dayOfWeek;

    // For SPECIAL schedules - specific date
    @Column(name = "special_date")
    private LocalDate specialDate;

    @Column(name = "open_time")
    private LocalTime openTime;

    @Column(name = "close_time")
    private LocalTime closeTime;

    // If true, restaurant is closed this day/date
    @Column(name = "is_closed")
    @Builder.Default
    private Boolean isClosed = false;

    // Description for special schedules (e.g., "Christmas", "Vacation")
    @Size(max = 200)
    private String description;

    // Priority for override logic (higher = more priority)
    @Column(name = "priority")
    @Builder.Default
    private Integer priority = 0;
}
