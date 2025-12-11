package com.laras.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HeroSlideDto {

    private Long id;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private String title;

    private String subtitle;

    private String linkUrl;

    private Integer displayOrder;

    private Boolean isActive;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
