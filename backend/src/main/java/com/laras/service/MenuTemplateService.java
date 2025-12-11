package com.laras.service;

import com.laras.dto.MenuTemplateItemDto;
import com.laras.entity.MenuTemplateItem;
import com.laras.repository.MenuTemplateItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MenuTemplateService {

    private final MenuTemplateItemRepository repository;

    // Public methods
    public List<MenuTemplateItemDto> getActiveItems() {
        return repository.findByIsActiveTrueOrderByMenuNumberAscMenuSectionAscDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<MenuTemplateItemDto> getActiveItemsByMenuNumber(Integer menuNumber) {
        return repository.findByMenuNumberAndIsActiveTrueOrderByMenuSectionAscDisplayOrderAsc(menuNumber)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // Admin methods
    public List<MenuTemplateItemDto> getAllItems() {
        return repository.findAllByOrderByMenuNumberAscMenuSectionAscDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<MenuTemplateItemDto> getItemsBySection(String menuSection) {
        return repository.findByMenuSectionOrderByDisplayOrderAsc(menuSection)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public MenuTemplateItemDto getItemById(Long id) {
        MenuTemplateItem item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
        return toDto(item);
    }

    public MenuTemplateItemDto createItem(MenuTemplateItemDto dto) {
        MenuTemplateItem item = MenuTemplateItem.builder()
                .menuSection(dto.getMenuSection())
                .menuNumber(dto.getMenuNumber() != null ? dto.getMenuNumber() : 1)
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .priceHalf(dto.getPriceHalf())
                .priceFull(dto.getPriceFull())
                .priceLabel1(dto.getPriceLabel1())
                .price1(dto.getPrice1())
                .priceLabel2(dto.getPriceLabel2())
                .price2(dto.getPrice2())
                .positionTop(dto.getPositionTop())
                .positionLeft(dto.getPositionLeft())
                .positionWidth(dto.getPositionWidth() != null ? dto.getPositionWidth() : "22%")
                .minHeight(dto.getMinHeight())
                .positionHeight(dto.getPositionHeight())
                .fontSize(dto.getFontSize())
                .icon(dto.getIcon())
                .iconSize(dto.getIconSize())
                .bgColor(dto.getBgColor())
                .textColor(dto.getTextColor())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .styleVariant(dto.getStyleVariant())
                .isActive(dto.getIsActive() != null ? dto.getIsActive() : true)
                .build();

        MenuTemplateItem saved = repository.save(item);
        return toDto(saved);
    }

    public MenuTemplateItemDto updateItem(Long id, MenuTemplateItemDto dto) {
        MenuTemplateItem item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));

        item.setMenuSection(dto.getMenuSection());
        if (dto.getMenuNumber() != null) item.setMenuNumber(dto.getMenuNumber());
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        item.setPriceHalf(dto.getPriceHalf());
        item.setPriceFull(dto.getPriceFull());
        item.setPriceLabel1(dto.getPriceLabel1());
        item.setPrice1(dto.getPrice1());
        item.setPriceLabel2(dto.getPriceLabel2());
        item.setPrice2(dto.getPrice2());
        item.setPositionTop(dto.getPositionTop());
        item.setPositionLeft(dto.getPositionLeft());
        if (dto.getPositionWidth() != null) item.setPositionWidth(dto.getPositionWidth());
        item.setMinHeight(dto.getMinHeight());
        item.setPositionHeight(dto.getPositionHeight());
        item.setFontSize(dto.getFontSize());
        item.setIcon(dto.getIcon());
        item.setIconSize(dto.getIconSize());
        item.setBgColor(dto.getBgColor());
        item.setTextColor(dto.getTextColor());
        if (dto.getDisplayOrder() != null) item.setDisplayOrder(dto.getDisplayOrder());
        item.setStyleVariant(dto.getStyleVariant());
        if (dto.getIsActive() != null) item.setIsActive(dto.getIsActive());

        MenuTemplateItem saved = repository.save(item);
        return toDto(saved);
    }

    public void deleteItem(Long id) {
        repository.deleteById(id);
    }

    public void toggleActive(Long id) {
        MenuTemplateItem item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
        item.setIsActive(!item.getIsActive());
        repository.save(item);
    }

    private MenuTemplateItemDto toDto(MenuTemplateItem item) {
        return MenuTemplateItemDto.builder()
                .id(item.getId())
                .menuSection(item.getMenuSection())
                .menuNumber(item.getMenuNumber())
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .priceHalf(item.getPriceHalf())
                .priceFull(item.getPriceFull())
                .priceLabel1(item.getPriceLabel1())
                .price1(item.getPrice1())
                .priceLabel2(item.getPriceLabel2())
                .price2(item.getPrice2())
                .positionTop(item.getPositionTop())
                .positionLeft(item.getPositionLeft())
                .positionWidth(item.getPositionWidth())
                .minHeight(item.getMinHeight())
                .positionHeight(item.getPositionHeight())
                .fontSize(item.getFontSize())
                .icon(item.getIcon())
                .iconSize(item.getIconSize())
                .bgColor(item.getBgColor())
                .textColor(item.getTextColor())
                .displayOrder(item.getDisplayOrder())
                .styleVariant(item.getStyleVariant())
                .isActive(item.getIsActive())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }
}
