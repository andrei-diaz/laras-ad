package com.laras.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromotionDto {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 150)
    private String title;

    @Size(max = 2000)
    private String description;

    private String imageUrl;

    private LocalDate startDate;

    private LocalDate endDate;

    private Boolean isFeatured;

    private Boolean isActive;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
