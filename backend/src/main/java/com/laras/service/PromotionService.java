package com.laras.service;

import com.laras.dto.PromotionDto;
import com.laras.entity.Promotion;
import com.laras.repository.PromotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PromotionService {

    private final PromotionRepository promotionRepository;

    public List<PromotionDto> getAllPromotions() {
        return promotionRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<PromotionDto> getActivePromotions() {
        LocalDate today = LocalDate.now();
        return promotionRepository
                .findByIsActiveTrueAndStartDateLessThanEqualAndEndDateGreaterThanEqualOrderByIsFeaturedDesc(today,
                        today)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<PromotionDto> getFeaturedPromotions() {
        return promotionRepository.findByIsActiveTrueAndIsFeaturedTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public PromotionDto getPromotionById(Long id) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found with id: " + id));
        return toDto(promotion);
    }

    public PromotionDto createPromotion(PromotionDto dto) {
        Promotion promotion = Promotion.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .isFeatured(dto.getIsFeatured() != null ? dto.getIsFeatured() : false)
                .isActive(dto.getIsActive() != null ? dto.getIsActive() : true)
                .build();

        Promotion saved = promotionRepository.save(promotion);
        return toDto(saved);
    }

    public PromotionDto updatePromotion(Long id, PromotionDto dto) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found with id: " + id));

        promotion.setTitle(dto.getTitle());
        promotion.setDescription(dto.getDescription());
        if (dto.getImageUrl() != null)
            promotion.setImageUrl(dto.getImageUrl());
        promotion.setStartDate(dto.getStartDate());
        promotion.setEndDate(dto.getEndDate());
        if (dto.getIsFeatured() != null)
            promotion.setIsFeatured(dto.getIsFeatured());
        if (dto.getIsActive() != null)
            promotion.setIsActive(dto.getIsActive());

        Promotion saved = promotionRepository.save(promotion);
        return toDto(saved);
    }

    public void deletePromotion(Long id) {
        promotionRepository.deleteById(id);
    }

    private PromotionDto toDto(Promotion promotion) {
        return PromotionDto.builder()
                .id(promotion.getId())
                .title(promotion.getTitle())
                .description(promotion.getDescription())
                .imageUrl(promotion.getImageUrl())
                .startDate(promotion.getStartDate())
                .endDate(promotion.getEndDate())
                .isFeatured(promotion.getIsFeatured())
                .isActive(promotion.getIsActive())
                .createdAt(promotion.getCreatedAt())
                .updatedAt(promotion.getUpdatedAt())
                .build();
    }
}
