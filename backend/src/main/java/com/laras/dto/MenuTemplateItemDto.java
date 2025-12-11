package com.laras.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuTemplateItemDto {

    private Long id;

    @NotBlank(message = "Menu section is required")
    private String menuSection;

    private Integer menuNumber;

    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    // Pricing options
    private BigDecimal price;
    private BigDecimal priceHalf;
    private BigDecimal priceFull;
    private String priceLabel1;
    private BigDecimal price1;
    private String priceLabel2;
    private BigDecimal price2;

    // Position
    private String positionTop;
    private String positionLeft;
    private String positionWidth;
    private String minHeight;
    private String positionHeight;

    // Styling
    private String fontSize;
    private String icon;
    private String iconSize;
    private String bgColor;
    private String textColor;

    private Integer displayOrder;
    private String styleVariant;
    private Boolean isActive;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
