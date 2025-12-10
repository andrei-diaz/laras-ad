package com.laras.controller;

import com.laras.dto.MenuTemplateItemDto;
import com.laras.service.MenuTemplateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MenuTemplateController {

    private final MenuTemplateService menuTemplateService;

    // ===== PUBLIC ENDPOINTS =====

    @GetMapping("/menu-template")
    public ResponseEntity<List<MenuTemplateItemDto>> getActiveMenuItems() {
        return ResponseEntity.ok(menuTemplateService.getActiveItems());
    }

    @GetMapping("/menu-template/{menuNumber}")
    public ResponseEntity<List<MenuTemplateItemDto>> getActiveMenuItemsByNumber(@PathVariable Integer menuNumber) {
        return ResponseEntity.ok(menuTemplateService.getActiveItemsByMenuNumber(menuNumber));
    }

    // ===== ADMIN ENDPOINTS =====

    @GetMapping("/admin/menu-template")
    public ResponseEntity<List<MenuTemplateItemDto>> getAllMenuItems() {
        return ResponseEntity.ok(menuTemplateService.getAllItems());
    }

    @GetMapping("/admin/menu-template/section/{section}")
    public ResponseEntity<List<MenuTemplateItemDto>> getMenuItemsBySection(@PathVariable String section) {
        return ResponseEntity.ok(menuTemplateService.getItemsBySection(section));
    }

    @GetMapping("/admin/menu-template/item/{id}")
    public ResponseEntity<MenuTemplateItemDto> getMenuItemById(@PathVariable Long id) {
        return ResponseEntity.ok(menuTemplateService.getItemById(id));
    }

    @PostMapping("/admin/menu-template")
    public ResponseEntity<MenuTemplateItemDto> createMenuItem(@Valid @RequestBody MenuTemplateItemDto dto) {
        MenuTemplateItemDto created = menuTemplateService.createItem(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/admin/menu-template/{id}")
    public ResponseEntity<MenuTemplateItemDto> updateMenuItem(
            @PathVariable Long id,
            @Valid @RequestBody MenuTemplateItemDto dto) {
        return ResponseEntity.ok(menuTemplateService.updateItem(id, dto));
    }

    @DeleteMapping("/admin/menu-template/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuTemplateService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/admin/menu-template/{id}/toggle-active")
    public ResponseEntity<Void> toggleActive(@PathVariable Long id) {
        menuTemplateService.toggleActive(id);
        return ResponseEntity.ok().build();
    }
}
