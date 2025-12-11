package com.laras.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoogleReviewDto {

    private String authorName;
    private String authorPhotoUrl;
    private Integer rating;
    private String text;
    private String relativeTimeDescription;
    private Long time;
}
