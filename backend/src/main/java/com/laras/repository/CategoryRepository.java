package com.laras.repository;

import com.laras.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByIsActiveTrueOrderByDisplayOrderAsc();

    List<Category> findAllByOrderByDisplayOrderAsc();

    @Query("SELECT COALESCE(MAX(c.displayOrder), 0) + 1 FROM Category c")
    Integer getNextDisplayOrder();

    boolean existsByNameIgnoreCase(String name);
}
