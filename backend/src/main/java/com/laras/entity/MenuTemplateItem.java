package com.laras.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

/**
 * Menu template item - represents an item on the visual menu template.
 * Stores position data for overlay on menu images.
 */
@Entity
@Table(name = "menu_template_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuTemplateItem extends BaseEntity {

    // Which menu section this belongs to (e.g., "bebidas", "snacks", "papas", "tortas")
    @NotBlank
    @Size(max = 50)
    @Column(name = "menu_section", nullable = false)
    private String menuSection;

    // Menu number (1 = first menu image, 2 = second menu image, etc.)
    @Column(name = "menu_number")
    @Builder.Default
    private Integer menuNumber = 1;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String name;

    @Size(max = 500)
    private String description;

    // Single price (for items with one price)
    private BigDecimal price;

    // Price for half portion (e.g., 1/2 litro)
    @Column(name = "price_half")
    private BigDecimal priceHalf;

    // Price for full portion (e.g., 1 litro)
    @Column(name = "price_full")
    private BigDecimal priceFull;

    // Alternative price labels (e.g., "Naturales", "Con queso")
    @Column(name = "price_label_1")
    @Size(max = 50)
    private String priceLabel1;

    @Column(name = "price_1")
    private BigDecimal price1;

    @Column(name = "price_label_2")
    @Size(max = 50)
    private String priceLabel2;

    @Column(name = "price_2")
    private BigDecimal price2;

    // CSS position values (stored as strings like "14%", "5%")
    @Column(name = "position_top")
    @Size(max = 20)
    private String positionTop;

    @Column(name = "position_left")
    @Size(max = 20)
    private String positionLeft;

    @Column(name = "position_width")
    @Size(max = 20)
    @Builder.Default
    private String positionWidth = "22%";

    @Column(name = "min_height")
    @Size(max = 20)
    private String minHeight;

    // Height (e.g., "70px", "auto")
    @Column(name = "position_height")
    @Size(max = 20)
    private String positionHeight;

    // Font size for text (e.g., "9px", "8px")
    @Column(name = "font_size")
    @Size(max = 20)
    private String fontSize;

    // Icon name (e.g., "cow", "chicken", "veggie")
    @Column(name = "icon")
    @Size(max = 50)
    private String icon;

    // Icon size (e.g., "26px")
    @Column(name = "icon_size")
    @Size(max = 20)
    private String iconSize;

    // Background color (e.g., "bg-white", "bg-[rgb(68,118,74)]")
    @Column(name = "bg_color")
    @Size(max = 50)
    private String bgColor;

    // Text color ("dark" or "white")
    @Column(name = "text_color")
    @Size(max = 20)
    private String textColor;

    // Display order within the section
    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    // Style variant (for different colored overlays)
    @Column(name = "style_variant")
    @Size(max = 20)
    private String styleVariant;

    // Active/inactive
    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
