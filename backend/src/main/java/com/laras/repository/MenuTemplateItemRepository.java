package com.laras.repository;

import com.laras.entity.MenuTemplateItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuTemplateItemRepository extends JpaRepository<MenuTemplateItem, Long> {

    // Get all items for a specific menu section
    List<MenuTemplateItem> findByMenuSectionOrderByDisplayOrderAsc(String menuSection);

    // Get all items for a specific menu number
    List<MenuTemplateItem> findByMenuNumberOrderByMenuSectionAscDisplayOrderAsc(Integer menuNumber);

    // Get active items for public display
    List<MenuTemplateItem> findByIsActiveTrueOrderByMenuNumberAscMenuSectionAscDisplayOrderAsc();

    // Get active items by menu number
    List<MenuTemplateItem> findByMenuNumberAndIsActiveTrueOrderByMenuSectionAscDisplayOrderAsc(Integer menuNumber);

    // Get all items ordered
    List<MenuTemplateItem> findAllByOrderByMenuNumberAscMenuSectionAscDisplayOrderAsc();

    // Get distinct menu sections
    List<String> findDistinctMenuSectionByMenuNumber(Integer menuNumber);
}
