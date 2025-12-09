package com.laras.service;

import com.laras.dto.CategoryDto;
import com.laras.entity.Category;
import com.laras.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<CategoryDto> getActiveCategories() {
        return categoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return toDto(category);
    }

    public CategoryDto createCategory(CategoryDto dto) {
        if (categoryRepository.existsByNameIgnoreCase(dto.getName())) {
            throw new RuntimeException("Category with this name already exists");
        }

        Category category = Category.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder()
                        : categoryRepository.getNextDisplayOrder())
                .isActive(dto.getIsActive() != null ? dto.getIsActive() : true)
                .build();

        Category saved = categoryRepository.save(category);
        return toDto(saved);
    }

    public CategoryDto updateCategory(Long id, CategoryDto dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        category.setName(dto.getName());
        category.setDescription(dto.getDescription());

        if (dto.getDisplayOrder() != null) {
            category.setDisplayOrder(dto.getDisplayOrder());
        }
        if (dto.getIsActive() != null) {
            category.setIsActive(dto.getIsActive());
        }

        Category saved = categoryRepository.save(category);
        return toDto(saved);
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        if (!category.getDishes().isEmpty()) {
            throw new RuntimeException("Cannot delete category with dishes. Remove dishes first.");
        }

        categoryRepository.delete(category);
    }

    public void updateDisplayOrders(List<Long> categoryIds) {
        for (int i = 0; i < categoryIds.size(); i++) {
            Category category = categoryRepository.findById(categoryIds.get(i))
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            category.setDisplayOrder(i + 1);
            categoryRepository.save(category);
        }
    }

    private CategoryDto toDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .displayOrder(category.getDisplayOrder())
                .isActive(category.getIsActive())
                .dishCount(category.getDishes() != null ? category.getDishes().size() : 0)
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
}
