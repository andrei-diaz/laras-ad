package com.laras.service;

import com.laras.dto.TestimonialDto;
import com.laras.entity.Testimonial;
import com.laras.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public List<TestimonialDto> getAllTestimonials() {
        return testimonialRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<TestimonialDto> getVisibleTestimonials() {
        return testimonialRepository.findByIsVisibleTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public TestimonialDto getTestimonialById(Long id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Testimonial not found with id: " + id));
        return toDto(testimonial);
    }

    public TestimonialDto createTestimonial(TestimonialDto dto) {
        Testimonial testimonial = Testimonial.builder()
                .customerName(dto.getCustomerName())
                .text(dto.getText())
                .rating(dto.getRating() != null ? dto.getRating() : 5)
                .isVisible(dto.getIsVisible() != null ? dto.getIsVisible() : true)
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        Testimonial saved = testimonialRepository.save(testimonial);
        return toDto(saved);
    }

    public TestimonialDto updateTestimonial(Long id, TestimonialDto dto) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Testimonial not found with id: " + id));

        testimonial.setCustomerName(dto.getCustomerName());
        testimonial.setText(dto.getText());
        if (dto.getRating() != null)
            testimonial.setRating(dto.getRating());
        if (dto.getIsVisible() != null)
            testimonial.setIsVisible(dto.getIsVisible());
        if (dto.getDisplayOrder() != null)
            testimonial.setDisplayOrder(dto.getDisplayOrder());

        Testimonial saved = testimonialRepository.save(testimonial);
        return toDto(saved);
    }

    public void deleteTestimonial(Long id) {
        testimonialRepository.deleteById(id);
    }

    private TestimonialDto toDto(Testimonial testimonial) {
        return TestimonialDto.builder()
                .id(testimonial.getId())
                .customerName(testimonial.getCustomerName())
                .text(testimonial.getText())
                .rating(testimonial.getRating())
                .isVisible(testimonial.getIsVisible())
                .displayOrder(testimonial.getDisplayOrder())
                .createdAt(testimonial.getCreatedAt())
                .updatedAt(testimonial.getUpdatedAt())
                .build();
    }
}
