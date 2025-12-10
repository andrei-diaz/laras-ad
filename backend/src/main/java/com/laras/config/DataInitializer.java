package com.laras.config;

import com.laras.entity.MenuTemplateItem;
import com.laras.entity.User;
import com.laras.repository.MenuTemplateItemRepository;
import com.laras.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

/**
 * Initializes default data on application startup if none exists.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MenuTemplateItemRepository menuTemplateItemRepository;

    @Override
    public void run(String... args) {
        initializeAdminUser();
        initializeMenuTemplateItems();
    }

    private void initializeAdminUser() {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@laras.com")
                    .password(passwordEncoder.encode("admin123"))
                    .active(true)
                    .build();

            userRepository.save(admin);
            log.info("Default admin user created: admin / admin123");
        }
    }

    private void initializeMenuTemplateItems() {
        if (menuTemplateItemRepository.count() == 0) {
            List<MenuTemplateItem> items = createMenuTemplateItems();
            menuTemplateItemRepository.saveAll(items);
            log.info("Initialized {} menu template items", items.size());
        }
    }

    private List<MenuTemplateItem> createMenuTemplateItems() {
        return Arrays.asList(
                // ===== MENU 1: BEBIDAS Y AGUAS =====
                createItem("bebidas", 1, "LICUADOS",
                        "Fresa, mango, guanábana o mix berrie, plátanos, melón, papaya, chocomilk.",
                        null, new BigDecimal("50"), new BigDecimal("70"),
                        null, null, null, null,
                        "14%", "5%", "22%", "9%", 1),

                createItem("bebidas", 1, "SMOOTHIES",
                        "Mango, piña con mango y chamoy, plátano, fresa, mix berrie o piña natural.",
                        null, new BigDecimal("55"), new BigDecimal("75"),
                        null, null, null, null,
                        "23%", "5%", "22%", null, 2),

                createItem("bebidas", 1, "SODAS",
                        "Coca Cola, Coca Cola Light, Fanta, Manzana, Sangría, Sprite y Ponche.",
                        new BigDecimal("27"), null, null,
                        null, null, null, null,
                        "32%", "5%", "22%", null, 3),

                createItem("bebidas", 1, "AGUA DE FRUTAS",
                        "Piña, melón, mango, fresa, papaya, pepino con limón, limonada o guanábana.",
                        null, new BigDecimal("45"), new BigDecimal("58"),
                        null, null, null, null,
                        "40%", "5%", "22%", null, 4),

                createItem("bebidas", 1, "CHOCOLATE",
                        "Chocolate caliente con bombones.",
                        null, new BigDecimal("45"), null,
                        null, null, null, null,
                        "49.9%", "5%", "22%", "6%", 5),

                createItem("bebidas", 1, "FRAPPÉ",
                        "Capuchino Moka",
                        new BigDecimal("50"), null, null,
                        null, null, null, null,
                        "57%", "5%", "22%", null, 6),

                createItem("bebidas", 1, "MANGONADA FRAPPÉ",
                        "Mango, chamoy, chile en polvo y varita de tamarindo",
                        null, new BigDecimal("55"), new BigDecimal("75"),
                        null, null, null, null,
                        "63.4%", "5%", "22%", null, 7),

                createItem("bebidas", 1, "CAFÉ",
                        "Estilo americano.",
                        new BigDecimal("25"), null, null,
                        null, null, null, null,
                        "70.9%", "5%", "22%", null, 8),

                // ===== MENU 2: SNACKS =====
                createItem("snacks", 2, "SÁNDWICH TURKEY",
                        "Mayonesa, aguacate, tomate, lechuga, jamón de pavo, quesos.",
                        new BigDecimal("48"), null, null,
                        null, null, null, null,
                        "5%", "2%", "18%", null, 1),

                createItem("snacks", 2, "SÁNDWICH VEGGIE",
                        "Mayonesa, aguacate, tomate, lechuga, bologna, quesos.",
                        new BigDecimal("55"), null, null,
                        null, null, null, null,
                        "14%", "2%", "18%", null, 2),

                createItem("snacks", 2, "SÁNDWICH DE POLLO",
                        "Mayonesa, aguacate, tomate, lechuga, pechuga de pollo marinado especial, quesos.",
                        new BigDecimal("60"), null, null,
                        null, null, null, null,
                        "23%", "2%", "18%", null, 3),

                createItem("snacks", 2, "SINCRONIZADA DE RES/POLLO",
                        "Carne de res salteada con morrón y cebolla, quesos, tortilla de harina.",
                        new BigDecimal("99"), null, null,
                        null, null, null, null,
                        "34%", "2%", "18%", null, 4),

                createItem("snacks", 2, "SINCRONIZADA VEGETARIANA",
                        "Fajita de gluten al jengibre salteada con morrón, cebolla, quesos, tortilla de harina.",
                        new BigDecimal("115"), null, null,
                        null, null, null, null,
                        "45%", "2%", "18%", null, 5),

                createItem("snacks", 2, "TENDERS",
                        "Pechuga de pollo, quesos, papas a la francesa incluye refresco.",
                        new BigDecimal("160"), null, null,
                        null, null, null, null,
                        "56%", "2%", "18%", null, 6),

                createItem("snacks", 2, "BONELESS",
                        "Papas a la francesa, aderezo Ranch, zanahoria y Apio.",
                        new BigDecimal("125"), null, null,
                        null, null, null, null,
                        "70%", "2%", "18%", null, 7),

                // ===== MENU 2: PAPAS =====
                createItem("papas", 2, "PAPAS",
                        "A la francesa naturales. A la francesa con queso y aderezo Laras.",
                        null, null, null,
                        "Naturales", new BigDecimal("49"), "Queso", new BigDecimal("60"),
                        "20%", "20%", "18%", null, 8),

                createItem("papas", 2, "BEEF BOWL",
                        "Papas a la francesa con queso, aderezo Laras con carne.",
                        new BigDecimal("115"), null, null,
                        null, null, null, null,
                        "30%", "20%", "18%", null, 9),

                createItem("papas", 2, "SALCHIPAPAS",
                        "Papas a la francesa con queso, aderezo Laras con salchicha veggie.",
                        new BigDecimal("120"), null, null,
                        null, null, null, null,
                        "40%", "20%", "18%", null, 10),

                createItem("papas", 2, "BONELESS BOWL",
                        "Papas a la francesa con queso, aderezo Laras, boneless bañados en salsa búfalo.",
                        new BigDecimal("140"), null, null,
                        null, null, null, null,
                        "50%", "20%", "18%", null, 11),

                createItem("papas", 2, "CHICKEN BOWL",
                        "Papas a la francesa con queso, aderezo Laras con pollo.",
                        new BigDecimal("115"), null, null,
                        null, null, null, null,
                        "60%", "20%", "18%", null, 12),

                // ===== MENU 2: TORTAS VEGETARIANAS =====
                createItem("tortas", 2, "MILANESA DE GLUTEN ENCHILADO",
                        "Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.",
                        new BigDecimal("115"), null, null,
                        null, null, null, null,
                        "42%", "55%", "18%", null, 13),

                createItem("tortas", 2, "MILANESA DE GLUTEN EMPANIZADO",
                        "Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.",
                        new BigDecimal("115"), null, null,
                        null, null, null, null,
                        "42%", "75%", "18%", null, 14),

                createItem("tortas", 2, "FAJITA DE GLUTEN AL JENGIBRE",
                        "Mayonesa, tomate, morrón, cebolla, aguacate, quesos, lechuga y aderezo Laras.",
                        new BigDecimal("115"), null, null,
                        null, null, null, null,
                        "60%", "55%", "18%", null, 15),

                createItem("tortas", 2, "GLUTEN AL PASTOR",
                        "Trocitos de piña, mayonesa, tomate, aguacate, queso, aderezo Laras y cebolla.",
                        new BigDecimal("115"), null, null,
                        null, null, null, null,
                        "75%", "55%", "18%", null, 16)
        );
    }

    private MenuTemplateItem createItem(
            String section, Integer menuNumber, String name, String description,
            BigDecimal price, BigDecimal priceHalf, BigDecimal priceFull,
            String priceLabel1, BigDecimal price1, String priceLabel2, BigDecimal price2,
            String top, String left, String width, String minHeight, Integer order) {

        return MenuTemplateItem.builder()
                .menuSection(section)
                .menuNumber(menuNumber)
                .name(name)
                .description(description)
                .price(price)
                .priceHalf(priceHalf)
                .priceFull(priceFull)
                .priceLabel1(priceLabel1)
                .price1(price1)
                .priceLabel2(priceLabel2)
                .price2(price2)
                .positionTop(top)
                .positionLeft(left)
                .positionWidth(width)
                .minHeight(minHeight)
                .displayOrder(order)
                .isActive(true)
                .build();
    }
}
