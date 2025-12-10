package com.laras.repository;

import com.laras.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // Get all regular schedules
    List<Schedule> findByScheduleTypeOrderByDaysOfWeekAsc(Schedule.ScheduleType scheduleType);

    // Get all special schedules ordered by start date
    List<Schedule> findByScheduleTypeOrderByStartDateDesc(Schedule.ScheduleType scheduleType);

    // Get active overrides (not expired)
    @Query("SELECT s FROM Schedule s WHERE s.scheduleType = 'OVERRIDE' " +
           "AND (s.expiresAt IS NULL OR s.expiresAt >= :today) " +
           "ORDER BY s.priority DESC")
    List<Schedule> findActiveOverrides(@Param("today") LocalDate today);

    // Find special schedules that apply to a specific date (single date or date range)
    @Query("SELECT s FROM Schedule s WHERE s.scheduleType = 'SPECIAL' " +
           "AND s.startDate <= :date " +
           "AND (s.endDate IS NULL AND s.startDate = :date OR s.endDate >= :date) " +
           "ORDER BY s.priority DESC")
    List<Schedule> findSpecialSchedulesForDate(@Param("date") LocalDate date);

    // Find regular schedules that contain a specific day
    @Query("SELECT s FROM Schedule s WHERE s.scheduleType = 'REGULAR' " +
           "AND s.daysOfWeek LIKE %:day%")
    List<Schedule> findRegularSchedulesContainingDay(@Param("day") String day);

    // Get all regular schedules ordered by displayOrder for public view
    @Query("SELECT s FROM Schedule s WHERE s.scheduleType = 'REGULAR' ORDER BY s.displayOrder ASC")
    List<Schedule> findRegularSchedulesOrderedByDisplay();
}
