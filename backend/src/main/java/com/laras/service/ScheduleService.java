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
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm");
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private static final Map<String, String> DAY_NAMES = Map.of(
            "MONDAY", "Lunes",
            "TUESDAY", "Martes",
            "WEDNESDAY", "Miércoles",
            "THURSDAY", "Jueves",
            "FRIDAY", "Viernes",
            "SATURDAY", "Sábado",
            "SUNDAY", "Domingo"
    );

    public List<ScheduleDto> getRegularSchedules() {
        return scheduleRepository.findByScheduleTypeOrderByDaysOfWeekAsc(Schedule.ScheduleType.REGULAR)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Get regular schedules for public display, ordered by displayOrder
     */
    public List<ScheduleDto> getPublicSchedules() {
        return scheduleRepository.findRegularSchedulesOrderedByDisplay()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ScheduleDto> getSpecialSchedules() {
        return scheduleRepository.findByScheduleTypeOrderByStartDateDesc(Schedule.ScheduleType.SPECIAL)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<ScheduleDto> getOverrides() {
        return scheduleRepository.findActiveOverrides(LocalDate.now())
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
                .daysOfWeek(dto.getDaysOfWeek() != null ? String.join(",", dto.getDaysOfWeek()) : null)
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .openTime(dto.getOpenTime())
                .closeTime(dto.getCloseTime())
                .isClosed(dto.getIsClosed() != null ? dto.getIsClosed() : false)
                .description(dto.getDescription())
                .priority(dto.getPriority() != null ? dto.getPriority() : 0)
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .expiresAt(dto.getExpiresAt())
                .build();

        Schedule saved = scheduleRepository.save(schedule);
        return toDto(saved);
    }

    public ScheduleDto updateSchedule(Long id, ScheduleDto dto) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));

        schedule.setScheduleType(dto.getScheduleType());
        schedule.setDaysOfWeek(dto.getDaysOfWeek() != null ? String.join(",", dto.getDaysOfWeek()) : null);
        schedule.setStartDate(dto.getStartDate());
        schedule.setEndDate(dto.getEndDate());
        schedule.setOpenTime(dto.getOpenTime());
        schedule.setCloseTime(dto.getCloseTime());
        if (dto.getIsClosed() != null) {
            schedule.setIsClosed(dto.getIsClosed());
        }
        schedule.setDescription(dto.getDescription());
        if (dto.getPriority() != null) {
            schedule.setPriority(dto.getPriority());
        }
        if (dto.getDisplayOrder() != null) {
            schedule.setDisplayOrder(dto.getDisplayOrder());
        }
        schedule.setExpiresAt(dto.getExpiresAt());

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

        // Check for active overrides first (not expired)
        List<Schedule> overrides = scheduleRepository.findActiveOverrides(today);
        if (!overrides.isEmpty()) {
            Schedule override = overrides.get(0);
            return buildStatus(override, now);
        }

        // Check for special schedule for today (single date or range)
        List<Schedule> specialSchedules = scheduleRepository.findSpecialSchedulesForDate(today);
        if (!specialSchedules.isEmpty()) {
            Schedule special = specialSchedules.get(0);
            return buildStatus(special, now);
        }

        // Fall back to regular schedule
        List<Schedule> regularSchedules = scheduleRepository.findRegularSchedulesContainingDay(dayOfWeek.name());
        if (!regularSchedules.isEmpty()) {
            Schedule regular = regularSchedules.get(0);
            return buildStatus(regular, now);
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
                    .statusMessage("Cerrado" + (schedule.getDescription() != null ? " - " + schedule.getDescription() : ""))
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
        List<String> days = null;
        String displayDays = null;

        if (schedule.getDaysOfWeek() != null && !schedule.getDaysOfWeek().isEmpty()) {
            days = Arrays.asList(schedule.getDaysOfWeek().split(","));
            displayDays = formatDaysDisplay(days);
        }

        String displayDateRange = null;
        if (schedule.getStartDate() != null) {
            if (schedule.getEndDate() != null && !schedule.getEndDate().equals(schedule.getStartDate())) {
                displayDateRange = schedule.getStartDate().format(DATE_FORMAT) + " - " + schedule.getEndDate().format(DATE_FORMAT);
            } else {
                displayDateRange = schedule.getStartDate().format(DATE_FORMAT);
            }
        }

        return ScheduleDto.builder()
                .id(schedule.getId())
                .scheduleType(schedule.getScheduleType())
                .daysOfWeek(days)
                .startDate(schedule.getStartDate())
                .endDate(schedule.getEndDate())
                .openTime(schedule.getOpenTime())
                .closeTime(schedule.getCloseTime())
                .isClosed(schedule.getIsClosed())
                .description(schedule.getDescription())
                .priority(schedule.getPriority())
                .displayOrder(schedule.getDisplayOrder())
                .expiresAt(schedule.getExpiresAt())
                .createdAt(schedule.getCreatedAt())
                .updatedAt(schedule.getUpdatedAt())
                .displayDays(displayDays)
                .displayDateRange(displayDateRange)
                .build();
    }

    private String formatDaysDisplay(List<String> days) {
        if (days == null || days.isEmpty()) return null;

        // Sort days by week order
        List<String> orderedDays = Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY");
        List<String> sortedDays = days.stream()
                .sorted(Comparator.comparingInt(orderedDays::indexOf))
                .collect(Collectors.toList());

        // Check for common patterns
        if (sortedDays.equals(Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"))) {
            return "Lunes a Viernes";
        }
        if (sortedDays.equals(Arrays.asList("SATURDAY", "SUNDAY"))) {
            return "Sábado y Domingo";
        }
        if (sortedDays.equals(Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"))) {
            return "Todos los días";
        }

        // Check for consecutive days
        if (areConsecutive(sortedDays, orderedDays)) {
            String first = DAY_NAMES.get(sortedDays.get(0));
            String last = DAY_NAMES.get(sortedDays.get(sortedDays.size() - 1));
            return first + " a " + last;
        }

        // List individual days (abbreviated if more than 3)
        if (sortedDays.size() > 3) {
            return sortedDays.stream()
                    .map(d -> DAY_NAMES.get(d).substring(0, 3))
                    .collect(Collectors.joining(", "));
        }

        return sortedDays.stream()
                .map(DAY_NAMES::get)
                .collect(Collectors.joining(", "));
    }

    private boolean areConsecutive(List<String> days, List<String> orderedDays) {
        if (days.size() < 2) return false;

        int firstIndex = orderedDays.indexOf(days.get(0));
        for (int i = 1; i < days.size(); i++) {
            int currentIndex = orderedDays.indexOf(days.get(i));
            if (currentIndex != firstIndex + i) {
                return false;
            }
        }
        return true;
    }
}
