package com.laras.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * Testimonial entity for customer reviews/testimonials.
 */
@Entity
@Table(name = "testimonials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Testimonial extends BaseEntity {

    @NotBlank(message = "Customer name is required")
    @Size(max = 100)
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @NotBlank(message = "Testimonial text is required")
    @Size(max = 1000)
    @Column(nullable = false, length = 1000)
    private String text;

    @Min(1)
    @Max(5)
    @Column(nullable = false)
    @Builder.Default
    private Integer rating = 5;

    @Column(name = "is_visible")
    @Builder.Default
    private Boolean isVisible = true;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}
