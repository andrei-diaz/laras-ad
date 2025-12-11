package com.laras.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * Hero slide for the homepage carousel.
 */
@Entity
@Table(name = "hero_slides")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeroSlide extends BaseEntity {

    @NotBlank(message = "Image URL is required")
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Size(max = 100)
    private String title;

    @Size(max = 200)
    private String subtitle;

    @Size(max = 500)
    @Column(name = "link_url")
    private String linkUrl;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
