package com.laras.service;

import com.laras.dto.HeroSlideDto;
import com.laras.entity.HeroSlide;
import com.laras.repository.HeroSlideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class HeroSlideService {

    private final HeroSlideRepository repository;

    // Public - get active slides for the homepage
    public List<HeroSlideDto> getActiveSlides() {
        return repository.findByIsActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // Admin - get all slides
    public List<HeroSlideDto> getAllSlides() {
        return repository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public HeroSlideDto getSlideById(Long id) {
        HeroSlide slide = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero slide not found with id: " + id));
        return toDto(slide);
    }

    public HeroSlideDto createSlide(HeroSlideDto dto) {
        // Get max order and add 1
        Integer maxOrder = repository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(HeroSlide::getDisplayOrder)
                .max(Integer::compareTo)
                .orElse(0);

        HeroSlide slide = HeroSlide.builder()
                .imageUrl(dto.getImageUrl())
                .title(dto.getTitle())
                .subtitle(dto.getSubtitle())
                .linkUrl(dto.getLinkUrl())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : maxOrder + 1)
                .isActive(dto.getIsActive() != null ? dto.getIsActive() : true)
                .build();

        HeroSlide saved = repository.save(slide);
        return toDto(saved);
    }

    public HeroSlideDto updateSlide(Long id, HeroSlideDto dto) {
        HeroSlide slide = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero slide not found with id: " + id));

        slide.setImageUrl(dto.getImageUrl());
        slide.setTitle(dto.getTitle());
        slide.setSubtitle(dto.getSubtitle());
        slide.setLinkUrl(dto.getLinkUrl());
        if (dto.getDisplayOrder() != null) slide.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getIsActive() != null) slide.setIsActive(dto.getIsActive());

        HeroSlide saved = repository.save(slide);
        return toDto(saved);
    }

    public void deleteSlide(Long id) {
        repository.deleteById(id);
    }

    public void toggleActive(Long id) {
        HeroSlide slide = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero slide not found with id: " + id));
        slide.setIsActive(!slide.getIsActive());
        repository.save(slide);
    }

    public void reorderSlides(List<Long> orderedIds) {
        for (int i = 0; i < orderedIds.size(); i++) {
            HeroSlide slide = repository.findById(orderedIds.get(i))
                    .orElseThrow(() -> new RuntimeException("Hero slide not found"));
            slide.setDisplayOrder(i + 1);
            repository.save(slide);
        }
    }

    private HeroSlideDto toDto(HeroSlide slide) {
        return HeroSlideDto.builder()
                .id(slide.getId())
                .imageUrl(slide.getImageUrl())
                .title(slide.getTitle())
                .subtitle(slide.getSubtitle())
                .linkUrl(slide.getLinkUrl())
                .displayOrder(slide.getDisplayOrder())
                .isActive(slide.getIsActive())
                .createdAt(slide.getCreatedAt())
                .updatedAt(slide.getUpdatedAt())
                .build();
    }
}
