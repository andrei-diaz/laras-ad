package com.laras.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for restaurant Open/Closed status response.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantStatusDto {

    private boolean isOpen;
    private String statusMessage;
    private String openTime;
    private String closeTime;
    private String nextStatusChange;
}
