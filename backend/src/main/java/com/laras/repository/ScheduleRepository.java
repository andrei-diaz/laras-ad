package com.laras.repository;

import com.laras.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByScheduleTypeOrderByDayOfWeekAsc(Schedule.ScheduleType scheduleType);

    Optional<Schedule> findByScheduleTypeAndDayOfWeek(Schedule.ScheduleType scheduleType, DayOfWeek dayOfWeek);

    Optional<Schedule> findByScheduleTypeAndSpecialDate(Schedule.ScheduleType scheduleType, LocalDate specialDate);

    @Query("SELECT s FROM Schedule s WHERE s.scheduleType = 'OVERRIDE' ORDER BY s.priority DESC")
    List<Schedule> findActiveOverrides();

    @Query("SELECT s FROM Schedule s WHERE s.scheduleType = 'SPECIAL' AND s.specialDate = :date")
    Optional<Schedule> findSpecialScheduleForDate(@Param("date") LocalDate date);

    @Query("SELECT s FROM Schedule s WHERE s.scheduleType = 'REGULAR' AND s.dayOfWeek = :day")
    Optional<Schedule> findRegularScheduleForDay(@Param("day") DayOfWeek day);

    List<Schedule> findByScheduleTypeOrderBySpecialDateDesc(Schedule.ScheduleType scheduleType);
}
