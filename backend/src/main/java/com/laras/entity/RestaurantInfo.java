package com.laras.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * Restaurant information entity for About Us, contact details, and social
 * media.
 * Single row table - only one record should exist.
 */
@Entity
@Table(name = "restaurant_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantInfo extends BaseEntity {

    // About Us content
    @Column(name = "about_us", columnDefinition = "TEXT")
    private String aboutUs;

    @Size(max = 500)
    private String mission;

    @Size(max = 500)
    private String values;

    // Location
    @Size(max = 500)
    private String address;

    private Double latitude;

    private Double longitude;

    // Contact
    @Size(max = 20)
    private String phone;

    @Size(max = 100)
    private String email;

    @Size(max = 20)
    private String whatsapp;

    // Social Media
    @Size(max = 255)
    @Column(name = "facebook_url")
    private String facebookUrl;

    @Size(max = 255)
    @Column(name = "instagram_url")
    private String instagramUrl;

    @Size(max = 255)
    @Column(name = "tiktok_url")
    private String tiktokUrl;

    // Banner
    @Size(max = 500)
    @Column(name = "banner_image_url")
    private String bannerImageUrl;

    @Size(max = 500)
    @Column(name = "logo_url")
    private String logoUrl;
}
