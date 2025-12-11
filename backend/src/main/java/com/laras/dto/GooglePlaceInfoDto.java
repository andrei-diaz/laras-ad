package com.laras.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GooglePlaceInfoDto {

    private Double rating;
    private Integer totalReviews;
    private List<GoogleReviewDto> reviews;
}
