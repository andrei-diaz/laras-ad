package com.laras.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * Schedule entity for restaurant operating hours.
 * Supports regular hours (by days of week) and special dates (holidays, date ranges, etc.)
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
        REGULAR,  // Normal weekly schedule (can have multiple days)
        SPECIAL,  // Special date or date range (holiday, event, vacation)
        OVERRIDE  // Temporary override (force open/closed) with optional expiration
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "schedule_type", nullable = false)
    @NotNull
    private ScheduleType scheduleType;

    // For REGULAR schedules - which days of the week (stored as comma-separated string)
    // Example: "MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY"
    @Column(name = "days_of_week")
    private String daysOfWeek;

    // For SPECIAL schedules - start date (single date or range start)
    @Column(name = "start_date")
    private LocalDate startDate;

    // For SPECIAL schedules - end date (null for single date, set for range)
    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "open_time")
    private LocalTime openTime;

    @Column(name = "close_time")
    private LocalTime closeTime;

    // If true, restaurant is closed this day/date/range
    @Column(name = "is_closed")
    @Builder.Default
    private Boolean isClosed = false;

    // Description for schedules (e.g., "Christmas", "Vacation", "Remodelación")
    @Size(max = 200)
    private String description;

    // Priority for override logic (higher = more priority)
    @Column(name = "priority")
    @Builder.Default
    private Integer priority = 0;

    // Display order for frontend (lower = appears first)
    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    // For OVERRIDE schedules - when this override expires (null = no expiration)
    @Column(name = "expires_at")
    private LocalDate expiresAt;

    // Helper methods for days of week
    public Set<DayOfWeek> getDaysOfWeekSet() {
        if (daysOfWeek == null || daysOfWeek.isEmpty()) {
            return new HashSet<>();
        }
        return Arrays.stream(daysOfWeek.split(","))
                .map(String::trim)
                .map(DayOfWeek::valueOf)
                .collect(Collectors.toSet());
    }

    public void setDaysOfWeekSet(Set<DayOfWeek> days) {
        if (days == null || days.isEmpty()) {
            this.daysOfWeek = null;
        } else {
            this.daysOfWeek = days.stream()
                    .map(DayOfWeek::name)
                    .sorted()
                    .collect(Collectors.joining(","));
        }
    }

    public boolean containsDay(DayOfWeek day) {
        return getDaysOfWeekSet().contains(day);
    }

    public boolean isDateInRange(LocalDate date) {
        if (startDate == null) return false;
        if (endDate == null) {
            return date.equals(startDate);
        }
        return !date.isBefore(startDate) && !date.isAfter(endDate);
    }

    public boolean isExpired() {
        if (expiresAt == null) return false;
        return LocalDate.now().isAfter(expiresAt);
    }
}
