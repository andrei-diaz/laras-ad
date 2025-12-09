package com.laras.controller;

import com.laras.dto.DishDto;
import com.laras.service.DishService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DishController {

    private final DishService dishService;

    // Public endpoints - only available dishes
    @GetMapping("/menu")
    public ResponseEntity<List<DishDto>> getAvailableDishes() {
        return ResponseEntity.ok(dishService.getAvailableDishes());
    }

    @GetMapping("/menu/category/{categoryId}")
    public ResponseEntity<List<DishDto>> getAvailableDishesByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(dishService.getAvailableDishesByCategory(categoryId));
    }

    @GetMapping("/menu/{id}")
    public ResponseEntity<DishDto> getDishById(@PathVariable Long id) {
        return ResponseEntity.ok(dishService.getDishById(id));
    }

    // Admin endpoints - all dishes
    @GetMapping("/admin/dishes")
    public ResponseEntity<List<DishDto>> getAllDishes() {
        return ResponseEntity.ok(dishService.getAllDishes());
    }

    @GetMapping("/admin/dishes/category/{categoryId}")
    public ResponseEntity<List<DishDto>> getDishesByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(dishService.getDishesByCategory(categoryId));
    }

    @PostMapping("/admin/dishes")
    public ResponseEntity<DishDto> createDish(@Valid @RequestBody DishDto dto) {
        DishDto created = dishService.createDish(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/admin/dishes/{id}")
    public ResponseEntity<DishDto> updateDish(
            @PathVariable Long id,
            @Valid @RequestBody DishDto dto) {
        return ResponseEntity.ok(dishService.updateDish(id, dto));
    }

    @DeleteMapping("/admin/dishes/{id}")
    public ResponseEntity<Void> deleteDish(@PathVariable Long id) {
        dishService.deleteDish(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/admin/dishes/{id}/toggle-availability")
    public ResponseEntity<Void> toggleAvailability(@PathVariable Long id) {
        dishService.toggleAvailability(id);
        return ResponseEntity.ok().build();
    }
}
