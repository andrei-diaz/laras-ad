package com.laras.controller;

import com.laras.dto.GooglePlaceInfoDto;
import com.laras.dto.GoogleReviewDto;
import com.laras.service.GooglePlacesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GoogleReviewsController {

    private final GooglePlacesService googlePlacesService;

    @GetMapping("/google-reviews")
    public ResponseEntity<List<GoogleReviewDto>> getGoogleReviews() {
        List<GoogleReviewDto> reviews = googlePlacesService.getReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/google-place-info")
    public ResponseEntity<GooglePlaceInfoDto> getGooglePlaceInfo() {
        GooglePlaceInfoDto placeInfo = googlePlacesService.getPlaceInfo();
        return ResponseEntity.ok(placeInfo);
    }
}
