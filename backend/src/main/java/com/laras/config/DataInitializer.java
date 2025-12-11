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

import java.util.ArrayList;
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
            List<MenuTemplateItem> items = new ArrayList<>();

            // ===== MENU 1: BEBIDAS Y AGUAS (8 items) =====
            items.addAll(createBebidasItems());

            // ===== MENU 2: SNACKS (7 items) =====
            items.addAll(createSnacksItems());

            // ===== MENU 2: PAPAS (5 items) =====
            items.addAll(createPapasItems());

            // ===== MENU 2: TORTAS VEGETARIANAS (4 items) =====
            items.addAll(createTortasVegItems());

            // ===== MENU 3: HAMBURGUESAS (8 items) =====
            items.addAll(createHamburguesasItems());

            // ===== MENU 3: CARNES (4 items) =====
            items.addAll(createCarnesItems());

            // ===== MENU 4: TACOS (4 items) =====
            items.addAll(createTacosItems());

            // ===== MENU 4: TORTAS CON CARNITA (3 items) =====
            items.addAll(createTortasCarnitaItems());

            // ===== MENU 4: COMBOS (9 items) =====
            items.addAll(createCombosItems());

            // ===== MENU 4: SALSAS (1 item) =====
            items.addAll(createSalsasItems());

            menuTemplateItemRepository.saveAll(items);
            log.info("Initialized {} menu template items", items.size());
        }
    }

    // ===== MENU 1: BEBIDAS Y AGUAS =====
    private List<MenuTemplateItem> createBebidasItems() {
        List<MenuTemplateItem> items = new ArrayList<>();
        int order = 1;

        items.add(createItem("bebidas", 1, "LICUADOS",
                "Fresa, mango, guanábana o mix berrie, plátanos, melón, papaya, chocomilk.\n1/2 litro $50    1 litro $70",
                "14%", "5%", "22%", "auto", null, "9px", null, null, "bg-white", "dark", order++));

        items.add(createItem("bebidas", 1, "SMOOTHIES",
                "Mango, piña con mango y chamoy, plátano, fresa, mix berrie o piña natural.\n1/2 litro $55    1 litro $75",
                "23%", "5%", "22%", "auto", null, "9px", null, null, "bg-white", "dark", order++));

        items.add(createItem("bebidas", 1, "SODAS",
                "Coca Cola, Coca Cola Light, Fanta, Manzana, Sangría, Sprite y Ponche. $27",
                "31.8%", "5%", "22%", "auto", null, "9px", null, null, "bg-white", "dark", order++));

        items.add(createItem("bebidas", 1, "AGUA DE FRUTAS",
                "Piña, melón, mango, fresa, papaya, pepino con limón, limonada o guanábana.\n1/2 litro $45    1 litro $58",
                "40%", "5%", "22%", "auto", null, "9px", null, null, "bg-white", "dark", order++));

        items.add(createItem("bebidas", 1, "CHOCOLATE",
                "Chocolate caliente con bombones.\n1/2 litro $45",
                "49.9%", "5%", "22%", "auto", null, "9px", null, null, "bg-white", "dark", order++));

        items.add(createItem("bebidas", 1, "FRAPPÉ",
                "Capuchino Moka $50",
                "57%", "5%", "22%", "30px", null, "9px", null, null, "bg-white", "dark", order++));

        items.add(createItem("bebidas", 1, "MANGONADA FRAPPÉ",
                "Mango, chamoy, chile en polvo y varita de tamarindo\n1/2 litro $55    1 litro $75",
                "63.6%", "5%", "22%", "55px", null, "9px", null, null, "bg-white", "dark", order++));

        items.add(createItem("bebidas", 1, "CAFÉ",
                "Estilo americano. $25",
                "73%", "5%", "22%", "auto", null, "9px", null, null, "bg-white", "dark", order++));

        return items;
    }

    // ===== MENU 2: SNACKS =====
    private List<MenuTemplateItem> createSnacksItems() {
        List<MenuTemplateItem> items = new ArrayList<>();
        int order = 1;

        items.add(createItem("snacks", 2, "SÁNDWICH \nTURKEY",
                "Mayonesa, aguacate, tomate, lechuga, jamón de pavo, quesos. $48",
                "12%", "2%", "23%", "43px", null, "8.2px", "chicken", "26px", "bg-white", "dark", order++));

        items.add(createItem("snacks", 2, "SÁNDWICH \nVEGGIE",
                "Mayonesa, aguacate, tomate, lechuga, bologna, quesos. $55",
                "19.6%", "2%", "23%", "43px", null, "8.5px", "veggie", "26px", "bg-white", "dark", order++));

        items.add(createItem("snacks", 2, "SÁNDWICH \nDE POLLO",
                "Mayonesa, aguacate, tomate, lechuga, pechuga de pollo marinado especial, quesos. $60",
                "27.3%", "2%", "23%", "auto", null, "8.5px", "chicken", "26px", "bg-white", "dark", order++));

        items.add(createItem("snacks", 2, "SINCRONIZADA \nDE RES/POLLO",
                "Carne de res salteada con morrón y cebolla, quesos, tortilla de harina. $98",
                "35.5%", "2%", "23%", "auto", null, "8.5px", "cow", "26px", "bg-white", "dark", order++));

        items.add(createItem("snacks", 2, "SINCRONIZADA \nVEGETARIANA",
                "Fajita de gluten al jengibre salteada con morrón, cebolla, quesos, tortilla de harina. $115",
                "43.58%", "2%", "23%", "auto", null, "8.3px", "veggie", "26px", "bg-white", "dark", order++));

        items.add(createItem("snacks", 2, "TENDERS",
                "Pechuga de pollo, quesos, papas a la francesa incluye refresco. Elige tu aderezo: Ranch, Búfalo, Laras, Salsa habanera y/o limón. $160",
                "52%", "2%", "23%", "45px", null, "8.5px", "chicken", "26px", "bg-white", "dark", order++));

        items.add(createItem("snacks", 2, "BONELESS",
                "Papas a la francesa, \naderezo Ranch, zanahoria y Apio. $125",
                "59.6%", "2%", "23%", "auto", null, "8.5px", "chicken", "26px", "bg-white", "dark", order++));

        return items;
    }

    // ===== MENU 2: PAPAS =====
    private List<MenuTemplateItem> createPapasItems() {
        List<MenuTemplateItem> items = new ArrayList<>();
        int order = 1;

        items.add(createItem("papas", 2, "PAPAS",
                "A la francesa naturales. $49\nA la francesa con queso y aderezo Laras. $60",
                "28%", "26.5%", "22%", "auto", null, "8.6px", null, null, "bg-white", "dark", order++));

        items.add(createItem("papas", 2, "BEEF BOWL",
                "Papas a la francesa con queso, aderezo Laras con carne. $115",
                "35.5%", "26.5%", "22%", "40px", null, "8.7px", "cow", "26px", "bg-white", "dark", order++));

        items.add(createItem("papas", 2, "SALCHIPAPAS",
                "Papas a la francesa con \nqueso, aderezo Laras con salchicha veggie. $120",
                "43%", "26.5%", "22%", "auto", null, "8.5px", "veggie", "26px", "bg-white", "dark", order++));

        items.add(createItem("papas", 2, "BONELESS \nBOWL",
                "Papas a la francesa con queso, aderezo Laras, boneless bañados en salsa búfalo. $140",
                "51%", "26.5%", "22%", "59px", null, "8px", "chicken", "26px", "bg-white", "dark", order++));

        items.add(createItem("papas", 2, "CHICKEN BOWL",
                "Papas a la francesa con \nqueso, aderezo Laras con \npollo. $115",
                "60.2%", "26.5%", "22%", "auto", null, "8px", "chicken", "26px", "bg-white", "dark", order++));

        return items;
    }

    // ===== MENU 2: TORTAS VEGETARIANAS =====
    private List<MenuTemplateItem> createTortasVegItems() {
        List<MenuTemplateItem> items = new ArrayList<>();
        int order = 1;

        items.add(createItem("tortas-veg", 2, "MILANESA \nDE GLUTEN \nENCHILADO",
                "Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.\n$115",
                "50%", "52.6%", "21%", "66px", null, "8.3px", "veggie", "26px", "bg-[rgb(68,118,74)]", "white", order++));

        items.add(createItem("tortas-veg", 2, "MILANESA \nDE GLUTEN \nEMPANIZADO",
                "Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.\n$115",
                "50%", "76.3%", "20%", "63.4px", null, "7.69px", "veggie", "26px", "bg-[rgb(68,118,74)]", "white", order++));

        items.add(createItem("tortas-veg", 2, "FAJITA \nDE GLUTEN \nAL JENGIBRE",
                "Mayonesa, tomate, morrón, cebolla, aguacate, quesos, lechuga y aderezo Laras.\n$115",
                "62%", "50.052%", "29%", "74.3px", null, "9px", "veggie", "26px", "bg-[rgb(68,118,74)]", "white", order++));

        items.add(createItem("tortas-veg", 2, "GLUTEN \nAL PASTOR",
                "Trocitos de piña, mayonesa, tomate, aguacate, queso, aderezo Laras y cebolla.\n$115",
                "75.4%", "50.052%", "29%", "63px", null, "9px", "veggie", "26px", "bg-[rgb(68,118,74)]", "white", order++));

        return items;
    }

    // ===== MENU 3: HAMBURGUESAS =====
    private List<MenuTemplateItem> createHamburguesasItems() {
        List<MenuTemplateItem> items = new ArrayList<>();
        int order = 1;

        items.add(createItem("hamburguesas", 3, "CLASSIC BEEF",
                "Carne de res preparación especial 1/4 de libra, \nmostaza, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $98",
                "15%", "2%", "22%", "70px", null, "7.8px", "cow", "26px", "bg-white", "dark", order++));

        items.add(createItem("hamburguesas", 3, "CLASSIC VEGGIE",
                "Carne vegetal preparación especial 1/4 de libra, \nmostaza, mayonesa, jamón vegetariano, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $115",
                "15%", "25%", "22.3%", "70px", null, "7.8px", "veggie", "26px", "bg-white", "dark", order++));

        items.add(createItem("hamburguesas", 3, "HAMBURGUESA \nDOBLE",
                "Doble carne de res \npreparación especial 1/4 de libra, mostaza, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $125",
                "27%", "2%", "22.3%", "79px", null, "7.8px", "cow", null, "bg-white", "dark", order++));

        items.add(createItem("hamburguesas", 3, "HAMBURGUESA \nDOBLE VEGGIE",
                "Doble carne vegetal \npreparación especial 1/4 de libra, mostaza, mayonesa, aguacate, jamón vegetariano, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $135",
                "27%", "25%", "22.3%", "79px", null, "7.8px", "veggie", "26px", "bg-white", "dark", order++));

        items.add(createItem("hamburguesas", 3, "SALCHI-BURGUER",
                "Carne de res preparación \nespecial 180 gr., mostaza, mayonesa, aguacate, jamón de pavo, salchichas, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $130",
                "41.6%", "2%", "22.3%", "76px", null, "7.8px", "cow", null, "bg-white", "dark", order++));

        items.add(createItem("hamburguesas", 3, "SALCHI-BURGUER \nVEGGIE",
                "Carne vegetariana preparado \nespecial, salchicha vegetal, mayonesa, mostaza pepinillos, tomate, lechuga, bologna, mezcla de 3 quesos y aderezo Laras. $140",
                "41.6%", "25%", "22.3%", "76px", null, "7.8px", "veggie", "26px", "bg-white", "dark", order++));

        items.add(createItem("hamburguesas", 3, "HAMBURGUESA \nJALAPEÑO",
                "Carne de res preparación especial 180 gr., mostaza, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $115",
                "55%", "2%", "22.3%", "82px", null, "8px", "cow", null, "bg-white", "dark", order++));

        items.add(createItem("hamburguesas", 3, "HAMBURGUESA \nJALAPEÑO VEGGIE",
                "Carne vegetal preparación especial 180 gr., mostaza, mayonesa, aguacate, jamón vegetariano, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $120",
                "55%", "25%", "22.3%", "82px", null, "8px", "veggie", "26px", "bg-white", "dark", order++));

        return items;
    }

    // ===== MENU 3: CARNES =====
    private List<MenuTemplateItem> createCarnesItems() {
        List<MenuTemplateItem> items = new ArrayList<>();
        int order = 1;

        items.add(createItem("carnes", 3, "CHICKEN TENDER \nBURGER",
                "Tenders empanizados con \nsalsa búfalo, queso, lechuga, tomate y aderezo Laras. $138",
                "38%", "52%", "24%", "57px", null, "8px", "chicken", null, "bg-[rgb(192,111,54)]", "white", order++));

        items.add(createItem("carnes", 3, "HAMBURGUESA \nBBQ",
                "Carne de res preparación \nespecial 180 gr., aderezada con salsa BBQ especial, mostaza, cebolla a la plancha, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $128",
                "47.128667%", "52%", "24%", "100px", null, "8.5px", "cow", null, "bg-[rgb(192,111,54)]", "white", order++));

        items.add(createItem("carnes", 3, "HAMBURGUESA \nBBQ VEGGIE",
                "Carne vegetal preparación \nespecial 180 gr., aderezada con salsa BBQ especial, mostaza, mayonesa, aguacate, jamón vegetariano, mezcla de quesos, cebolla a la plancha, tomate, lechuga, pepinillos y aderezo Laras. $130",
                "63.28%", "52%", "24%", "98px", null, "8px", "veggie", "26px", "bg-[rgb(192,111,54)]", "white", order++));

        items.add(createItem("carnes", 3, "HAMBURGUESA \nHAWAIANA",
                "Carne de res preparación \nespecial 180 gr., rebanada de piña asada, salsa especial de piña, mostaza, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga y aderezo Laras. $130",
                "79.02%", "52%", "24%", "76px", null, "8px", "cow", null, "bg-[rgb(192,111,54)]", "white", order++));

        return items;
    }

    // ===== MENU 4: TACOS =====
    private List<MenuTemplateItem> createTacosItems() {
        List<MenuTemplateItem> items = new ArrayList<>();
        int order = 1;

        items.add(createItem("tacos", 4, "TACOS DE \nCARNE DE RES",
                "Con morrón y cebolla, \ncilantro y tortilla de maíz. $20 c/u",
                "21.8%", "2%", "23%", "55px", null, "8px", "cow", null, "bg-white", "dark", order++));

        items.add(createItem("tacos", 4, "TACOS \nVEGETARIANOS \nENCHILADOS",
                "Gluten enchilado salteado con morrón y cebolla. $25 c/u",
                "21.8%", "25%", "22%", "55px", null, "8px", "veggie", "26px", "bg-white", "dark", order++));

        items.add(createItem("tacos", 4, "TACOS \nVEGETARIANOS",
                "Gluten al jengibre salteado \ncon morrón y cebolla. $25 c/u",
                "32%", "2%", "22%", "55px", null, "8px", "veggie", "26px", "bg-white", "dark", order++));

        items.add(createItem("tacos", 4, "TACOS AL \nPASTOR VEGGIE",
                "Salteados con trocitos \nde piña y cebolla y tortilla de maíz. $25 c/u",
                "32%", "25%", "22%", "55px", null, "8px", "veggie", "26px", "bg-white", "dark", order++));

        return items;
    }

    // ===== MENU 4: TORTAS CON CARNITA =====
    private List<MenuTemplateItem> createTortasCarnitaItems() {
        List<MenuTemplateItem> items = new ArrayList<>();
        int order = 1;

        items.add(createItem("tortas-carnita", 4, "FAJITA BEEF",
                "Carne de res marinado \nespecial, morrón, cebolla, mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras. $98",
                "53%", "2%", "22%", "65px", null, "8px", "cow", null, "bg-white", "dark", order++));

        items.add(createItem("tortas-carnita", 4, "CHICKEN FAJITA",
                "Pechuga de pollo \nmarinado especial, \nmorrón, cebolla, mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras. $98",
                "53%", "25%", "22%", "65px", null, "8px", "chicken", null, "bg-white", "dark", order++));

        items.add(createItem("tortas-carnita", 4, "ARRACHERA \nCHEESE STEAK",
                "Arrachera americana, \nmorrón, cebolla, mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras. $135",
                "65.4%", "0%", "26.37%", "67px", null, "8px", "cow", null, "bg-white", "dark", order++));

        return items;
    }

    // ===== MENU 4: COMBOS =====
    private List<MenuTemplateItem> createCombosItems() {
        List<MenuTemplateItem> items = new ArrayList<>();
        int order = 1;

        items.add(createItem("combos", 4, "COMBO #1",
                "Fajita Beef o Chicken \nFajita, más agua del \ndía y papas. $115",
                "36%", "52%", "22%", "auto", null, "8.5px", "cow", null, "bg-white", "dark", order++));

        items.add(createItem("combos", 4, "COMBO #2",
                "Torta de Arrachera \nCheese Steak, más \nagua del día y papas. $150",
                "43%", "52%", "22%", "45px", null, "8.5px", "cow", null, "bg-white", "dark", order++));

        items.add(createItem("combos", 4, "COMBO #3",
                "Torta vegetariana, más \nagua del día y papas. $135",
                "50.6%", "52%", "22%", "37.7px", null, "8.5px", "veggie", null, "bg-white", "dark", order++));

        items.add(createItem("combos", 4, "COMBO #4",
                "Sándwich con jamón vegetariano + \nChocomilk. $75",
                "56.7%", "52%", "22%", "43px", null, "8.5px", "veggie", null, "bg-white", "dark", order++));

        items.add(createItem("combos", 4, "COMBO #5",
                "Sincronizada \nvegetariana, más agua \ndel día y papas. $135",
                "36%", "74.5%", "22%", "43.4px", null, "8.5px", "veggie", null, "bg-white", "dark", order++));

        items.add(createItem("combos", 4, "COMBO #6",
                "Sincronizada de Res o \nPollo, más agua del día y papas. $115",
                "42.8%", "74.5%", "22%", "45.5px", null, "8.5px", "cow", null, "bg-white", "dark", order++));

        items.add(createItem("combos", 4, "COMBO #7",
                "Arma tu combo: Elige \ntu hamburguesa (el precio \nmarcado en el menú) + $15 y llévate una soda.",
                "50.3%", "74.5%", "22%", "49px", null, "8.5px", "veggie", null, "bg-white", "dark", order++));

        items.add(createItem("combos", 4, "COMBO #8",
                "Sándwich de jamón de \npavo + Chocomilk. $70",
                "58%", "74.5%", "22%", "auto", null, "8.5px", "veggie", null, "bg-white", "dark", order++));

        items.add(createItem("combos", 4, "COMBO #9",
                "Sándwich de pollo + Chocomilk. $90",
                "62.9%", "74.5%", "22%", "auto", null, "8.5px", "cow", null, "bg-white", "dark", order++));

        return items;
    }

    // ===== MENU 4: SALSAS =====
    private List<MenuTemplateItem> createSalsasItems() {
        List<MenuTemplateItem> items = new ArrayList<>();

        items.add(createItem("salsas", 4, "SALSA EXTRA",
                "$10",
                "93.06%", "68.5%", "18%", "auto", null, "6px", null, null, "bg-white", "dark", 1));

        return items;
    }

    private MenuTemplateItem createItem(
            String section, Integer menuNumber, String name, String description,
            String top, String left, String width, String height, String minHeight,
            String fontSize, String icon, String iconSize,
            String bgColor, String textColor, Integer order) {

        return MenuTemplateItem.builder()
                .menuSection(section)
                .menuNumber(menuNumber)
                .name(name)
                .description(description)
                .positionTop(top)
                .positionLeft(left)
                .positionWidth(width)
                .positionHeight(height)
                .minHeight(minHeight)
                .fontSize(fontSize)
                .icon(icon)
                .iconSize(iconSize)
                .bgColor(bgColor)
                .textColor(textColor)
                .displayOrder(order)
                .isActive(true)
                .build();
    }
}
