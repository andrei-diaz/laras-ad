package com.laras.service;

import com.laras.dto.DishDto;
import com.laras.entity.Category;
import com.laras.entity.Dish;
import com.laras.repository.CategoryRepository;
import com.laras.repository.DishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DishService {

    private final DishRepository dishRepository;
    private final CategoryRepository categoryRepository;

    public List<DishDto> getAllDishes() {
        return dishRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<DishDto> getDishesByCategory(Long categoryId) {
        return dishRepository.findByCategoryIdOrderByDisplayOrderAsc(categoryId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<DishDto> getAvailableDishes() {
        return dishRepository.findByIsAvailableTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<DishDto> getAvailableDishesByCategory(Long categoryId) {
        return dishRepository.findByCategoryIdAndIsAvailableTrueOrderByDisplayOrderAsc(categoryId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public DishDto getDishById(Long id) {
        Dish dish = dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));
        return toDto(dish);
    }

    public DishDto createDish(DishDto dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + dto.getCategoryId()));

        Dish dish = Dish.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .imageUrl(dto.getImageUrl())
                .isAvailable(dto.getIsAvailable() != null ? dto.getIsAvailable() : true)
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder()
                        : dishRepository.getNextDisplayOrder(dto.getCategoryId()))
                .category(category)
                .build();

        Dish saved = dishRepository.save(dish);
        return toDto(saved);
    }

    public DishDto updateDish(Long id, DishDto dto) {
        Dish dish = dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));

        dish.setName(dto.getName());
        dish.setDescription(dto.getDescription());
        dish.setPrice(dto.getPrice());

        if (dto.getImageUrl() != null) {
            dish.setImageUrl(dto.getImageUrl());
        }
        if (dto.getIsAvailable() != null) {
            dish.setIsAvailable(dto.getIsAvailable());
        }
        if (dto.getDisplayOrder() != null) {
            dish.setDisplayOrder(dto.getDisplayOrder());
        }
        if (dto.getCategoryId() != null && !dto.getCategoryId().equals(dish.getCategory().getId())) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + dto.getCategoryId()));
            dish.setCategory(category);
        }

        Dish saved = dishRepository.save(dish);
        return toDto(saved);
    }

    public void deleteDish(Long id) {
        Dish dish = dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));
        dishRepository.delete(dish);
    }

    public void toggleAvailability(Long id) {
        Dish dish = dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));
        dish.setIsAvailable(!dish.getIsAvailable());
        dishRepository.save(dish);
    }

    private DishDto toDto(Dish dish) {
        return DishDto.builder()
                .id(dish.getId())
                .name(dish.getName())
                .description(dish.getDescription())
                .price(dish.getPrice())
                .imageUrl(dish.getImageUrl())
                .isAvailable(dish.getIsAvailable())
                .displayOrder(dish.getDisplayOrder())
                .categoryId(dish.getCategory().getId())
                .categoryName(dish.getCategory().getName())
                .createdAt(dish.getCreatedAt())
                .updatedAt(dish.getUpdatedAt())
                .build();
    }
}
