package com.laras.service;

import com.laras.dto.GooglePlaceInfoDto;
import com.laras.dto.GoogleReviewDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GooglePlacesService {

    @Value("${google.places.api-key:}")
    private String apiKey;

    @Value("${google.places.place-id:}")
    private String placeId;

    private final RestTemplate restTemplate;

    public GooglePlacesService() {
        this.restTemplate = new RestTemplate();
    }

    public List<GoogleReviewDto> getReviews() {
        GooglePlaceInfoDto info = getPlaceInfo();
        return info.getReviews();
    }

    public GooglePlaceInfoDto getPlaceInfo() {
        if (apiKey == null || apiKey.isEmpty() || placeId == null || placeId.isEmpty()) {
            log.warn("Google Places API key or Place ID not configured");
            return GooglePlaceInfoDto.builder()
                    .rating(4.5)
                    .totalReviews(0)
                    .reviews(new ArrayList<>())
                    .build();
        }

        // Try the new Places API first
        GooglePlaceInfoDto info = fetchPlaceInfoFromNewApi();
        if (info != null && !info.getReviews().isEmpty()) {
            return info;
        }

        // Fallback to legacy API
        return fetchPlaceInfoFromLegacyApi();
    }

    private GooglePlaceInfoDto fetchPlaceInfoFromNewApi() {
        String url = String.format(
                "https://places.googleapis.com/v1/places/%s?languageCode=es",
                placeId);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Goog-Api-Key", apiKey);
            headers.set("X-Goog-FieldMask",
                    "rating,userRatingCount,reviews.authorAttribution,reviews.rating,reviews.text,reviews.relativePublishTimeDescription");

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

            if (response.getBody() == null) {
                log.debug("No response from new Places API");
                return null;
            }

            Map<String, Object> body = response.getBody();

            Double rating = body.get("rating") != null ? ((Number) body.get("rating")).doubleValue() : 4.5;
            Integer totalReviews = body.get("userRatingCount") != null
                    ? ((Number) body.get("userRatingCount")).intValue()
                    : 0;

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> reviews = (List<Map<String, Object>>) body.get("reviews");
            List<GoogleReviewDto> reviewDtos = new ArrayList<>();

            if (reviews != null && !reviews.isEmpty()) {
                reviewDtos = reviews.stream()
                        .map(this::mapFromNewApi)
                        .toList();
            }

            log.info("Successfully fetched place info: rating={}, totalReviews={}, reviews={}",
                    rating, totalReviews, reviewDtos.size());

            return GooglePlaceInfoDto.builder()
                    .rating(rating)
                    .totalReviews(totalReviews)
                    .reviews(reviewDtos)
                    .build();

        } catch (RestClientException e) {
            log.debug("New Places API failed: {}", e.getMessage());
            return null;
        }
    }

    private GooglePlaceInfoDto fetchPlaceInfoFromLegacyApi() {
        String url = String.format(
                "https://maps.googleapis.com/maps/api/place/details/json?place_id=%s&fields=rating,user_ratings_total,reviews&key=%s&language=es",
                placeId, apiKey);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response == null) {
                log.error("Null response from legacy Places API");
                return GooglePlaceInfoDto.builder()
                        .rating(4.5)
                        .totalReviews(0)
                        .reviews(new ArrayList<>())
                        .build();
            }

            String status = (String) response.get("status");
            if (!"OK".equals(status)) {
                String errorMessage = (String) response.get("error_message");
                log.error("Legacy Places API error: {} - {}", status, errorMessage);
                return GooglePlaceInfoDto.builder()
                        .rating(4.5)
                        .totalReviews(0)
                        .reviews(new ArrayList<>())
                        .build();
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> result = (Map<String, Object>) response.get("result");
            if (result == null) {
                return GooglePlaceInfoDto.builder()
                        .rating(4.5)
                        .totalReviews(0)
                        .reviews(new ArrayList<>())
                        .build();
            }

            Double rating = result.get("rating") != null ? ((Number) result.get("rating")).doubleValue() : 4.5;
            Integer totalReviews = result.get("user_ratings_total") != null
                    ? ((Number) result.get("user_ratings_total")).intValue()
                    : 0;

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> reviews = (List<Map<String, Object>>) result.get("reviews");
            List<GoogleReviewDto> reviewDtos = new ArrayList<>();

            if (reviews != null) {
                reviewDtos = reviews.stream()
                        .map(this::mapFromLegacyApi)
                        .toList();
            }

            log.info("Successfully fetched place info from legacy API: rating={}, totalReviews={}", rating,
                    totalReviews);

            return GooglePlaceInfoDto.builder()
                    .rating(rating)
                    .totalReviews(totalReviews)
                    .reviews(reviewDtos)
                    .build();

        } catch (RestClientException e) {
            log.error("Error fetching from legacy API: {}", e.getMessage());
            return GooglePlaceInfoDto.builder()
                    .rating(4.5)
                    .totalReviews(0)
                    .reviews(new ArrayList<>())
                    .build();
        }
    }

    private GoogleReviewDto mapFromNewApi(Map<String, Object> review) {
        @SuppressWarnings("unchecked")
        Map<String, Object> authorAttribution = (Map<String, Object>) review.get("authorAttribution");
        @SuppressWarnings("unchecked")
        Map<String, Object> text = (Map<String, Object>) review.get("text");

        String authorName = authorAttribution != null ? (String) authorAttribution.get("displayName") : "Cliente";
        String photoUri = authorAttribution != null ? (String) authorAttribution.get("photoUri") : null;

        // Convert photoUri to a proper URL - the new API returns just a path
        String authorPhotoUrl = null;
        if (photoUri != null && !photoUri.isEmpty()) {
            if (photoUri.startsWith("http")) {
                authorPhotoUrl = photoUri;
            } else if (photoUri.startsWith("//")) {
                authorPhotoUrl = "https:" + photoUri;
            } else {
                authorPhotoUrl = "https://lh3.googleusercontent.com" + photoUri;
            }
        }

        String reviewText = text != null ? (String) text.get("text") : "";

        return GoogleReviewDto.builder()
                .authorName(authorName)
                .authorPhotoUrl(authorPhotoUrl)
                .rating((Integer) review.get("rating"))
                .text(reviewText)
                .relativeTimeDescription((String) review.get("relativePublishTimeDescription"))
                .time(null)
                .build();
    }

    private GoogleReviewDto mapFromLegacyApi(Map<String, Object> review) {
        return GoogleReviewDto.builder()
                .authorName((String) review.get("author_name"))
                .authorPhotoUrl((String) review.get("profile_photo_url"))
                .rating((Integer) review.get("rating"))
                .text((String) review.get("text"))
                .relativeTimeDescription((String) review.get("relative_time_description"))
                .time(review.get("time") != null ? ((Number) review.get("time")).longValue() : null)
                .build();
    }
}
