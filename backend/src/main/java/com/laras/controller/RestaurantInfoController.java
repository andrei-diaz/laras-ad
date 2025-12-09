package com.laras.controller;

import com.laras.dto.RestaurantInfoDto;
import com.laras.service.RestaurantInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RestaurantInfoController {

    private final RestaurantInfoService restaurantInfoService;

    // Public endpoint
    @GetMapping("/info")
    public ResponseEntity<RestaurantInfoDto> getInfo() {
        return ResponseEntity.ok(restaurantInfoService.getInfo());
    }

    // Admin endpoint
    @GetMapping("/admin/info")
    public ResponseEntity<RestaurantInfoDto> getAdminInfo() {
        return ResponseEntity.ok(restaurantInfoService.getInfo());
    }

    @PutMapping("/admin/info")
    public ResponseEntity<RestaurantInfoDto> saveInfo(@RequestBody RestaurantInfoDto dto) {
        return ResponseEntity.ok(restaurantInfoService.saveInfo(dto));
    }
}
