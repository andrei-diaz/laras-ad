package com.laras.controller;

import com.laras.dto.RestaurantStatusDto;
import com.laras.dto.ScheduleDto;
import com.laras.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    // Public endpoints
    @GetMapping("/status")
    public ResponseEntity<RestaurantStatusDto> getRestaurantStatus() {
        return ResponseEntity.ok(scheduleService.getRestaurantStatus());
    }

    @GetMapping("/schedule")
    public ResponseEntity<List<ScheduleDto>> getRegularSchedules() {
        return ResponseEntity.ok(scheduleService.getRegularSchedules());
    }

    // Admin endpoints
    @GetMapping("/admin/schedules/regular")
    public ResponseEntity<List<ScheduleDto>> getAllRegularSchedules() {
        return ResponseEntity.ok(scheduleService.getRegularSchedules());
    }

    @GetMapping("/admin/schedules/special")
    public ResponseEntity<List<ScheduleDto>> getSpecialSchedules() {
        return ResponseEntity.ok(scheduleService.getSpecialSchedules());
    }

    @GetMapping("/admin/schedules/overrides")
    public ResponseEntity<List<ScheduleDto>> getOverrides() {
        return ResponseEntity.ok(scheduleService.getOverrides());
    }

    @GetMapping("/admin/schedules/{id}")
    public ResponseEntity<ScheduleDto> getScheduleById(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.getScheduleById(id));
    }

    @PostMapping("/admin/schedules")
    public ResponseEntity<ScheduleDto> createSchedule(@Valid @RequestBody ScheduleDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(scheduleService.createSchedule(dto));
    }

    @PutMapping("/admin/schedules/{id}")
    public ResponseEntity<ScheduleDto> updateSchedule(@PathVariable Long id, @Valid @RequestBody ScheduleDto dto) {
        return ResponseEntity.ok(scheduleService.updateSchedule(id, dto));
    }

    @DeleteMapping("/admin/schedules/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }
}
