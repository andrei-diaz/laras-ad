package com.laras.controller;

import com.laras.dto.TestimonialDto;
import com.laras.service.TestimonialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TestimonialController {

    private final TestimonialService testimonialService;

    // Public endpoint
    @GetMapping("/testimonials")
    public ResponseEntity<List<TestimonialDto>> getVisibleTestimonials() {
        return ResponseEntity.ok(testimonialService.getVisibleTestimonials());
    }

    // Admin endpoints
    @GetMapping("/admin/testimonials")
    public ResponseEntity<List<TestimonialDto>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    @GetMapping("/admin/testimonials/{id}")
    public ResponseEntity<TestimonialDto> getTestimonialById(@PathVariable Long id) {
        return ResponseEntity.ok(testimonialService.getTestimonialById(id));
    }

    @PostMapping("/admin/testimonials")
    public ResponseEntity<TestimonialDto> createTestimonial(@Valid @RequestBody TestimonialDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(testimonialService.createTestimonial(dto));
    }

    @PutMapping("/admin/testimonials/{id}")
    public ResponseEntity<TestimonialDto> updateTestimonial(@PathVariable Long id,
            @Valid @RequestBody TestimonialDto dto) {
        return ResponseEntity.ok(testimonialService.updateTestimonial(id, dto));
    }

    @DeleteMapping("/admin/testimonials/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.noContent().build();
    }
}
