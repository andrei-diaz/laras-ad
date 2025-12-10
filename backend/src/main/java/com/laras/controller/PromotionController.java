package com.laras.controller;

import com.laras.dto.PromotionDto;
import com.laras.service.PromotionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    // Public endpoints
    @GetMapping("/promotions")
    public ResponseEntity<List<PromotionDto>> getActivePromotions() {
        return ResponseEntity.ok(promotionService.getActivePromotions());
    }

    @GetMapping("/promotions/featured")
    public ResponseEntity<List<PromotionDto>> getFeaturedPromotions() {
        return ResponseEntity.ok(promotionService.getFeaturedPromotions());
    }

    @GetMapping("/promotions/{id}")
    public ResponseEntity<PromotionDto> getPromotionById(@PathVariable Long id) {
        return ResponseEntity.ok(promotionService.getPromotionById(id));
    }

    // Admin endpoints
    @GetMapping("/admin/promotions")
    public ResponseEntity<List<PromotionDto>> getAllPromotions() {
        return ResponseEntity.ok(promotionService.getAllPromotions());
    }

    @PostMapping("/admin/promotions")
    public ResponseEntity<PromotionDto> createPromotion(@Valid @RequestBody PromotionDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(promotionService.createPromotion(dto));
    }

    @PutMapping("/admin/promotions/{id}")
    public ResponseEntity<PromotionDto> updatePromotion(@PathVariable Long id, @Valid @RequestBody PromotionDto dto) {
        return ResponseEntity.ok(promotionService.updatePromotion(id, dto));
    }

    @DeleteMapping("/admin/promotions/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionService.deletePromotion(id);
        return ResponseEntity.noContent().build();
    }
}
