package com.laras.service;

import com.laras.dto.RestaurantStatusDto;
import com.laras.dto.ScheduleDto;
import com.laras.entity.Schedule;
import com.laras.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm");

    public List<ScheduleDto> getRegularSchedules() {
        return scheduleRepository.findByScheduleTypeOrderByDayOfWeekAsc(Schedule.ScheduleType.REGULAR)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ScheduleDto> getSpecialSchedules() {
        return scheduleRepository.findByScheduleTypeOrderBySpecialDateDesc(Schedule.ScheduleType.SPECIAL)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ScheduleDto> getOverrides() {
        return scheduleRepository.findActiveOverrides()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public ScheduleDto getScheduleById(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));
        return toDto(schedule);
    }

    public ScheduleDto createSchedule(ScheduleDto dto) {
        Schedule schedule = Schedule.builder()
                .scheduleType(dto.getScheduleType())
                .dayOfWeek(dto.getDayOfWeek())
                .specialDate(dto.getSpecialDate())
                .openTime(dto.getOpenTime())
                .closeTime(dto.getCloseTime())
                .isClosed(dto.getIsClosed() != null ? dto.getIsClosed() : false)
                .description(dto.getDescription())
                .priority(dto.getPriority() != null ? dto.getPriority() : 0)
                .build();

        Schedule saved = scheduleRepository.save(schedule);
        return toDto(saved);
    }

    public ScheduleDto updateSchedule(Long id, ScheduleDto dto) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));

        schedule.setScheduleType(dto.getScheduleType());
        schedule.setDayOfWeek(dto.getDayOfWeek());
        schedule.setSpecialDate(dto.getSpecialDate());
        schedule.setOpenTime(dto.getOpenTime());
        schedule.setCloseTime(dto.getCloseTime());
        if (dto.getIsClosed() != null)
            schedule.setIsClosed(dto.getIsClosed());
        schedule.setDescription(dto.getDescription());
        if (dto.getPriority() != null)
            schedule.setPriority(dto.getPriority());

        Schedule saved = scheduleRepository.save(schedule);
        return toDto(saved);
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }

    /**
     * Calculate current restaurant status (Open/Closed).
     * Priority: OVERRIDE > SPECIAL > REGULAR
     */
    public RestaurantStatusDto getRestaurantStatus() {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DayOfWeek dayOfWeek = today.getDayOfWeek();

        // Check for active overrides first
        List<Schedule> overrides = scheduleRepository.findActiveOverrides();
        if (!overrides.isEmpty()) {
            Schedule override = overrides.get(0);
            return buildStatus(override, now);
        }

        // Check for special schedule for today
        Optional<Schedule> specialSchedule = scheduleRepository.findSpecialScheduleForDate(today);
        if (specialSchedule.isPresent()) {
            return buildStatus(specialSchedule.get(), now);
        }

        // Fall back to regular schedule
        Optional<Schedule> regularSchedule = scheduleRepository.findRegularScheduleForDay(dayOfWeek);
        if (regularSchedule.isPresent()) {
            return buildStatus(regularSchedule.get(), now);
        }

        // No schedule configured
        return RestaurantStatusDto.builder()
                .isOpen(false)
                .statusMessage("Horario no configurado")
                .build();
    }

    private RestaurantStatusDto buildStatus(Schedule schedule, LocalTime now) {
        if (schedule.getIsClosed()) {
            return RestaurantStatusDto.builder()
                    .isOpen(false)
                    .statusMessage(
                            "Cerrado" + (schedule.getDescription() != null ? " - " + schedule.getDescription() : ""))
                    .build();
        }

        boolean isOpen = false;
        if (schedule.getOpenTime() != null && schedule.getCloseTime() != null) {
            isOpen = !now.isBefore(schedule.getOpenTime()) && now.isBefore(schedule.getCloseTime());
        }

        return RestaurantStatusDto.builder()
                .isOpen(isOpen)
                .statusMessage(isOpen ? "Abierto" : "Cerrado")
                .openTime(schedule.getOpenTime() != null ? schedule.getOpenTime().format(TIME_FORMAT) : null)
                .closeTime(schedule.getCloseTime() != null ? schedule.getCloseTime().format(TIME_FORMAT) : null)
                .nextStatusChange(isOpen && schedule.getCloseTime() != null
                        ? "Cierra a las " + schedule.getCloseTime().format(TIME_FORMAT)
                        : !isOpen && schedule.getOpenTime() != null
                                ? "Abre a las " + schedule.getOpenTime().format(TIME_FORMAT)
                                : null)
                .build();
    }

    private ScheduleDto toDto(Schedule schedule) {
        return ScheduleDto.builder()
                .id(schedule.getId())
                .scheduleType(schedule.getScheduleType())
                .dayOfWeek(schedule.getDayOfWeek())
                .specialDate(schedule.getSpecialDate())
                .openTime(schedule.getOpenTime())
                .closeTime(schedule.getCloseTime())
                .isClosed(schedule.getIsClosed())
                .description(schedule.getDescription())
                .priority(schedule.getPriority())
                .createdAt(schedule.getCreatedAt())
                .updatedAt(schedule.getUpdatedAt())
                .build();
    }
}
