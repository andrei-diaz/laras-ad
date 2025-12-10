package com.laras.repository;

import com.laras.entity.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {

    List<Dish> findByCategoryIdOrderByDisplayOrderAsc(Long categoryId);

    List<Dish> findByCategoryIdAndIsAvailableTrueOrderByDisplayOrderAsc(Long categoryId);

    List<Dish> findByIsAvailableTrueOrderByDisplayOrderAsc();

    List<Dish> findAllByOrderByDisplayOrderAsc();

    @Query("SELECT COALESCE(MAX(d.displayOrder), 0) + 1 FROM Dish d WHERE d.category.id = :categoryId")
    Integer getNextDisplayOrder(@Param("categoryId") Long categoryId);

    boolean existsByNameIgnoreCaseAndCategoryId(String name, Long categoryId);
}
