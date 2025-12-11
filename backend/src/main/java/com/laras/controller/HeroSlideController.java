package com.laras.controller;

import com.laras.dto.HeroSlideDto;
import com.laras.service.HeroSlideService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HeroSlideController {

    private final HeroSlideService heroSlideService;

    // ===== PUBLIC ENDPOINTS =====

    @GetMapping("/hero-slides")
    public ResponseEntity<List<HeroSlideDto>> getActiveSlides() {
        return ResponseEntity.ok(heroSlideService.getActiveSlides());
    }

    // ===== ADMIN ENDPOINTS =====

    @GetMapping("/admin/hero-slides")
    public ResponseEntity<List<HeroSlideDto>> getAllSlides() {
        return ResponseEntity.ok(heroSlideService.getAllSlides());
    }

    @GetMapping("/admin/hero-slides/{id}")
    public ResponseEntity<HeroSlideDto> getSlideById(@PathVariable Long id) {
        return ResponseEntity.ok(heroSlideService.getSlideById(id));
    }

    @PostMapping("/admin/hero-slides")
    public ResponseEntity<HeroSlideDto> createSlide(@Valid @RequestBody HeroSlideDto dto) {
        HeroSlideDto created = heroSlideService.createSlide(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/admin/hero-slides/{id}")
    public ResponseEntity<HeroSlideDto> updateSlide(
            @PathVariable Long id,
            @Valid @RequestBody HeroSlideDto dto) {
        return ResponseEntity.ok(heroSlideService.updateSlide(id, dto));
    }

    @DeleteMapping("/admin/hero-slides/{id}")
    public ResponseEntity<Void> deleteSlide(@PathVariable Long id) {
        heroSlideService.deleteSlide(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/admin/hero-slides/{id}/toggle-active")
    public ResponseEntity<Void> toggleActive(@PathVariable Long id) {
        heroSlideService.toggleActive(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/admin/hero-slides/reorder")
    public ResponseEntity<Void> reorderSlides(@RequestBody List<Long> orderedIds) {
        heroSlideService.reorderSlides(orderedIds);
        return ResponseEntity.ok().build();
    }
}
