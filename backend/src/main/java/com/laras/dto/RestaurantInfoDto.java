package com.laras.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantInfoDto {

    private Long id;

    private String aboutUs;
    private String mission;
    private String values;

    private String address;
    private Double latitude;
    private Double longitude;

    private String phone;
    private String email;
    private String whatsapp;

    private String facebookUrl;
    private String instagramUrl;
    private String tiktokUrl;

    private String bannerImageUrl;
    private String logoUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
