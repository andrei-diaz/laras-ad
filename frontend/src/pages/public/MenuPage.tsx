import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Instagram, Facebook } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import menuTemplateService, { MenuTemplateItem } from '../../services/menuTemplateService';
import restaurantInfoService, { RestaurantInfo } from '../../services/restaurantInfoService';

// ===== LAYOUT CONFIGURATIONS (positions hardcoded for responsiveness) =====
// These define WHERE items appear - positions are fixed for pixel-perfect layout

// MENU-1: BEBIDAS Y AGUAS
const bebidasLayout: Record<string, any> = {
    'licuados': { top: '13%', left: '4%', width: '23%', height: '38px', fontSize: '7px' },
    'smoothies': { top: '21%', left: '4%', width: '23%', height: '38px', fontSize: '7px' },
    'sodas': { top: '29%', left: '4%', width: '23%', height: '32px', fontSize: '7px' },
    'agua-frutas': { top: '37%', left: '4%', width: '23%', height: '38px', fontSize: '7px' },
    'chocolate': { top: '45%', left: '4%', width: '23%', height: '28px', fontSize: '7px' },
    'frappe': { top: '53%', left: '4%', width: '23%', height: '24px', fontSize: '7px' },
    'mangonada-frappe': { top: '60%', left: '4%', width: '23%', height: '40px', fontSize: '7px' },
    'cafe': { top: '69%', left: '4%', width: '23%', height: '24px', fontSize: '7px' },
};

// MENU-2: SNACKS
const snacksLayout: Record<string, any> = {
    'sandwich-turkey': { top: '12%', left: '2%', width: '23%', height: '40px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    'sandwich-veggie': { top: '20%', left: '2%', width: '23%', height: '40px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'sandwich-pollo': { top: '28%', left: '2%', width: '23%', height: '46px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    'sincronizada-res': { top: '35.8%', left: '2%', width: '23%', height: '40px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'sincronizada-veg': { top: '42.3%', left: '2%', width: '23%', height: '40px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'tenders': { top: '49.8%', left: '2%', width: '23%', height: '32px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    'boneless-snack': { top: '57%', left: '2%', width: '23%', height: '32px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
};

// MENU-2: PAPAS
const papasLayout: Record<string, any> = {
    'papas': { top: '27.7%', left: '26%', width: '22%', height: '32px', fontSize: '7px', icon: 'fries', iconSize: '18px' },
    'beef-bowl': { top: '35%', left: '26%', width: '22%', height: '35px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'salchipapas': { top: '42%', left: '26%', width: '22%', height: '42px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'boneless-bowl': { top: '49.5%', left: '26%', width: '22%', height: '36px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    'chicken-bowl': { top: '56.8%', left: '26%', width: '22%', height: '34px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
};

// MENU-2: TORTAS VEGETARIANAS (Green)
const tortasVegLayout: Record<string, any> = {
    'milanesa-enchilado': { top: '50%', left: '52%', width: '23.93%', height: '55px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'milanesa-empanizado': { top: '50%', left: '76%', width: '22%', height: '55px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'fajita-gluten': { top: '62%', left: '50%', width: '29.5%', height: '63px', fontSize: '8px', icon: 'veggie', iconSize: '20px' },
    'gluten-pastor': { top: '75.3%', left: '50%', width: '29.5%', height: '56px', fontSize: '8px', icon: 'veggie', iconSize: '20px' },
};

// MENU-3: HAMBURGUESAS
const hamburguesasLayout: Record<string, any> = {
    'classic-beef': { top: '18%', left: '2%', width: '22%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'classic-veggie': { top: '18%', left: '25%', width: '22%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'hamburguesa-doble': { top: '29%', left: '2%', width: '22%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'hamburguesa-doble-veggie': { top: '29%', left: '25%', width: '22%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'salchi-burguer': { top: '40%', left: '2%', width: '22%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'salchi-burguer-veggie': { top: '40%', left: '25%', width: '22%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'hamburguesa-jalapeno': { top: '52%', left: '2%', width: '22%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'hamburguesa-jalapeno-veggie': { top: '52%', left: '25%', width: '22%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
};

// MENU-3: CARNES (Orange)
const carnesLayout: Record<string, any> = {
    'chicken-tender': { top: '38%', left: '52%', width: '24%', height: '45px', fontSize: '7px', icon: 'chicken', iconSize: '20px', noBg: true },
    'hamburguesa-bbq': { top: '50%', left: '52%', width: '24%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px', noBg: true },
    'hamburguesa-bbq-veggie': { top: '62%', left: '52%', width: '24%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px', noBg: true },
    'hamburguesa-hawaiana': { top: '74%', left: '52%', width: '24%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px', noBg: true },
};

// MENU-4: TACOS
const tacosLayout: Record<string, any> = {
    'tacos-res': { top: '21%', left: '2%', width: '23%', height: '42px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'tacos-veg-enchilados': { top: '21%', left: '25%', width: '22%', height: '38px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'tacos-vegetarianos': { top: '31%', left: '2%', width: '22%', height: '38px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'tacos-pastor-veggie': { top: '31%', left: '25%', width: '22%', height: '41px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
};

// MENU-4: TORTAS CON CARNITA
const tortasCarnitaLayout: Record<string, any> = {
    'fajita-beef': { top: '54%', left: '3.2%', width: '21.4%', height: '40px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'chicken-fajita': { top: '54%', left: '26%', width: '20%', height: '40px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    'arrachera-cheese': { top: '66%', left: '2%', width: '24%', height: '38px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
};

// MENU-4: COMBOS
const combosLayout: Record<string, any> = {
    'combo-1': { top: '35%', left: '52%', width: '22%', height: '32px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'combo-2': { top: '42%', left: '52%', width: '22%', height: '32px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'combo-3': { top: '49%', left: '52%', width: '22%', height: '32px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'combo-4': { top: '56%', left: '52%', width: '22%', height: '32px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'combo-5': { top: '35%', left: '75%', width: '23%', height: '32px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'combo-6': { top: '42%', left: '75%', width: '23%', height: '32px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    'combo-7': { top: '49%', left: '75%', width: '23%', height: '32px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'combo-8': { top: '56%', left: '75%', width: '23%', height: '28px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    'combo-9': { top: '62%', left: '75%', width: '23%', height: '28px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
};

// MENU-4: SALSAS
const salsasLayout: Record<string, any> = {
    'salsa': { top: '93.05%', left: '68%', width: '12%', height: '8px', fontSize: '6px', noBg: true, whiteText: true },
};

// ===== DEFAULT DATA (fallback if API fails) =====
const defaultData: Record<string, { name: string; description: string }> = {
    // Bebidas
    'licuados': { name: 'LICUADOS', description: 'Fresa, mango, guanábana, mix berrie, plátanos, melón, papaya. 1/2L $50 | 1L $70' },
    'smoothies': { name: 'SMOOTHIES', description: 'Mango, piña con chamoy, plátano, fresa, mix berrie. 1/2L $55 | 1L $75' },
    'sodas': { name: 'SODAS', description: 'Coca Cola, Fanta, Manzana, Sangría, Sprite, Ponche. $27' },
    'agua-frutas': { name: 'AGUA DE FRUTAS', description: 'Piña, melón, mango, fresa, papaya, pepino, limonada. 1/2L $45 | 1L $58' },
    'chocolate': { name: 'CHOCOLATE', description: 'Chocolate caliente con bombones. 1/2L $45' },
    'frappe': { name: 'FRAPPÉ', description: 'Capuchino Moka $50' },
    'mangonada-frappe': { name: 'MANGONADA FRAPPÉ', description: 'Mango, chamoy, chile en polvo y tamarindo. 1/2L $55 | 1L $75' },
    'cafe': { name: 'CAFÉ', description: 'Estilo americano. $25' },
    // Snacks
    'sandwich-turkey': { name: 'SÁNDWICH TURKEY', description: 'Mayonesa, aguacate, tomate, lechuga, jamón pavo, quesos. $48' },
    'sandwich-veggie': { name: 'SÁNDWICH VEGGIE', description: 'Mayonesa, aguacate, tomate, lechuga, bologna, quesos. $55' },
    'sandwich-pollo': { name: 'SÁNDWICH POLLO', description: 'Mayonesa, aguacate, tomate, lechuga, pechuga pollo, quesos. $60' },
    'sincronizada-res': { name: 'SINCRONIZADA RES', description: 'Carne de res con morrón, cebolla, quesos, tortilla. $98' },
    'sincronizada-veg': { name: 'SINCRONIZADA VEG', description: 'Fajita de gluten al jengibre con morrón, cebolla, quesos. $115' },
    'tenders': { name: 'TENDERS', description: 'Pechuga, quesos, papas, refresco. Aderezo a elegir. $160' },
    'boneless-snack': { name: 'BONELESS', description: 'Papas a la francesa, \naderezo Ranch, zanahoria y Apio. $125' },
    // Papas
    'papas': { name: 'PAPAS', description: 'Naturales $49 | \nCon queso y aderezo \n$60' },
    'beef-bowl': { name: 'BEEF BOWL', description: 'Papas con queso, \naderezo Laras, carne. \n$115' },
    'salchipapas': { name: 'SALCHIPAPAS', description: 'Papas con queso, \naderezo, salchicha veggie. $120' },
    'boneless-bowl': { name: 'BONELESS BOWL', description: 'Papas con queso, aderezo, boneless búfalo. $140' },
    'chicken-bowl': { name: 'CHICKEN BOWL', description: 'Papas con queso, aderezo Laras, pollo. $115' },
    // Tortas Veg
    'milanesa-enchilado': { name: 'MILANESA GLUTEN ENCHILADO', description: 'Mayonesa, tomate, aguacate, quesos, lechuga. \n$115' },
    'milanesa-empanizado': { name: 'MILANESA GLUTEN EMPANIZADO', description: 'Mayonesa, tomate, aguacate, quesos, lechuga. \n$115' },
    'fajita-gluten': { name: 'FAJITA GLUTEN JENGIBRE', description: 'Mayonesa, tomate, morrón, cebolla, aguacate, quesos. \n$115' },
    'gluten-pastor': { name: 'GLUTEN AL PASTOR', description: 'Trocitos de piña, mayonesa, \ntomate, aguacate, queso. \n$115' },
    // Hamburguesas
    'classic-beef': { name: 'CLASSIC BEEF', description: 'Carne res 1/4 libra, \nmostaza, mayo, aguacate, quesos, tomate. $98' },
    'classic-veggie': { name: 'CLASSIC VEGGIE', description: 'Carne vegetal 1/4 libra, mostaza, mayo, quesos, tomate. $115' },
    'hamburguesa-doble': { name: 'HAMBURGUESA DOBLE', description: 'Doble carne res, mostaza, mayo, aguacate, quesos. $125' },
    'hamburguesa-doble-veggie': { name: 'HAMBURGUESA DOBLE VEG', description: 'Doble carne vegetal, mostaza, mayo, quesos. $135' },
    'salchi-burguer': { name: 'SALCHI-BURGUER', description: 'Carne res 180g, salchichas, mostaza, mayo, quesos. $130' },
    'salchi-burguer-veggie': { name: 'SALCHI-BURGUER VEG', description: 'Carne vegetal, salchicha vegetal, quesos. $140' },
    'hamburguesa-jalapeno': { name: 'HAMBURGUESA JALAPEÑO', description: 'Carne res 180g, jalapeños, mayo, quesos. $115' },
    'hamburguesa-jalapeno-veggie': { name: 'HAMBURGUESA JALAPEÑO VEG', description: 'Carne vegetal 180g, jalapeños, quesos. $120' },
    // Carnes
    'chicken-tender': { name: 'CHICKEN TENDER BURGER', description: 'Tenders con salsa búfalo, queso, lechuga, tomate. $138' },
    'hamburguesa-bbq': { name: 'HAMBURGUESA BBQ', description: 'Carne res 180g, salsa BBQ, cebolla, quesos. $128' },
    'hamburguesa-bbq-veggie': { name: 'HAMBURGUESA BBQ VEG', description: 'Carne vegetal 180g, salsa BBQ, quesos. $130' },
    'hamburguesa-hawaiana': { name: 'HAMBURGUESA HAWAIANA', description: 'Carne res 180g, piña asada, salsa de piña, quesos. $130' },
    // Tacos
    'tacos-res': { name: 'TACOS DE RES', description: 'Con morrón, cebolla, \ncilantro, tortilla maíz. \n$20 c/u' },
    'tacos-veg-enchilados': { name: 'TACOS VEG ENCHILADOS', description: 'Gluten enchilado con morrón y cebolla. $25 c/u' },
    'tacos-vegetarianos': { name: 'TACOS VEGETARIANOS', description: 'Gluten al jengibre con morrón y cebolla. $25 c/u' },
    'tacos-pastor-veggie': { name: 'TACOS AL PASTOR VEG', description: 'Con trocitos de piña, cebolla, tortilla maíz. \n$25 c/u' },
    // Tortas Carnita
    'fajita-beef': { name: 'FAJITA BEEF', description: 'Carne res marinada, \nmorrón, cebolla, quesos. $98' },
    'chicken-fajita': { name: 'CHICKEN FAJITA', description: 'Pechuga pollo marinado, morrón, cebolla, quesos. $98' },
    'arrachera-cheese': { name: 'ARRACHERA CHEESE STEAK', description: 'Arrachera americana, morrón, cebolla, quesos. $135' },
    // Combos
    'combo-1': { name: 'COMBO #1', description: 'Fajita Beef o Chicken + \nagua + papas. $115' },
    'combo-2': { name: 'COMBO #2', description: 'Arrachera Cheese \nSteak + agua + papas. \n$150' },
    'combo-3': { name: 'COMBO #3', description: 'Torta vegetariana + \nagua + papas. $135' },
    'combo-4': { name: 'COMBO #4', description: 'Sándwich vegetariano \n+ Chocomilk. $75' },
    'combo-5': { name: 'COMBO #5', description: 'Sincronizada vegetariana + \nagua + papas. $135' },
    'combo-6': { name: 'COMBO #6', description: 'Sincronizada Res/Pollo + \nagua + papas. $115' },
    'combo-7': { name: 'COMBO #7', description: 'Tu hamburguesa + $15 = soda.' },
    'combo-8': { name: 'COMBO #8', description: 'Sándwich pavo + \nChocomilk. $70' },
    'combo-9': { name: 'COMBO #9', description: 'Sándwich pollo + \nChocomilk. $90' },
    // Salsas
    'salsa': { name: '', description: 'Salsa extra $10' },
};

// Menu pages configuration
const menuPages = [
    { id: 4, title: 'Combos', image: '/images/menu-4.png' },
    { id: 3, title: 'Tacos y Hamburguesas', image: '/images/menu-3.png' },
    { id: 2, title: 'Snacks y Papas', image: '/images/menu-2.png' },
    { id: 1, title: 'Bebidas y Aguas', image: '/images/menu-1.png' },
];

const MenuPage: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', containScroll: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [menuData, setMenuData] = useState<Record<string, { name: string; description: string }>>(defaultData);
    const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
        instagramUrl: 'https://www.instagram.com/laras.__/',
        facebookUrl: 'https://www.facebook.com/larasaurez/?locale=es_LA',
    });

    const REFERENCE_WIDTH = 400;
    const [scale, setScale] = useState(1);
    const menuCardRef = useRef<HTMLDivElement>(null);

    // Fetch menu data from API
    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const items = await menuTemplateService.getActiveItems();
                const dataMap: Record<string, { name: string; description: string }> = { ...defaultData };

                items.forEach((item: MenuTemplateItem) => {
                    if (item.itemKey) {
                        dataMap[item.itemKey] = {
                            name: item.name || defaultData[item.itemKey]?.name || '',
                            description: item.description || defaultData[item.itemKey]?.description || ''
                        };
                    }
                });

                setMenuData(dataMap);
            } catch (error) {
                console.error('Error fetching menu data, using defaults:', error);
            }
        };
        fetchMenuData();

        // Fetch restaurant info for social links
        const fetchRestaurantInfo = async () => {
            try {
                const info = await restaurantInfoService.getInfo();
                if (info) {
                    setRestaurantInfo(prev => ({ ...prev, ...info }));
                }
            } catch (error) {
                console.log('Using default social links');
            }
        };
        fetchRestaurantInfo();
    }, []);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);

    useEffect(() => {
        let lastScale = 0;
        const updateScale = () => {
            if (menuCardRef.current) {
                const width = menuCardRef.current.offsetWidth;
                const newScale = width / REFERENCE_WIDTH;
                // Solo actualizar si el cambio es significativo (evita loops)
                if (Math.abs(newScale - lastScale) > 0.01) {
                    lastScale = newScale;
                    setScale(newScale);
                }
            }
        };
        updateScale();
        // Solo usar window resize, no ResizeObserver (evita actualizaciones constantes)
        window.addEventListener('resize', updateScale);
        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    // Render overlay - combines hardcoded layout with dynamic data
    const renderOverlay = (itemKey: string, layout: any, bgColor: string, defaultWidth: string = '20%', textColor: string = 'dark') => {
        const data = menuData[itemKey] || defaultData[itemKey] || { name: '', description: '' };

        return (
            <div
                key={itemKey}
                className={`absolute ${layout.noBg ? '' : bgColor} px-1 py-0.5`}
                style={{
                    top: layout.top,
                    left: layout.left,
                    width: layout.width || defaultWidth,
                    height: layout.height || 'auto',
                    overflow: 'hidden',
                }}
            >
                {layout.icon && (
                    <img
                        src={`/images/food-icons/${layout.icon}.png`}
                        alt={layout.icon}
                        className="absolute object-contain"
                        style={{
                            width: layout.iconSize || '26px',
                            height: layout.iconSize || '26px',
                            top: '1px',
                            right: '1px'
                        }}
                    />
                )}
                <h3
                    className={`font-black uppercase tracking-wide leading-tight ${layout.whiteText || textColor === 'white' ? 'text-white' : 'text-stone-900'}`}
                    style={{ fontSize: layout.fontSize || '9px', paddingRight: layout.icon ? '22px' : '0' }}
                >
                    {data.name.split('\n').map((line: string, i: number) => (
                        <span key={i}>
                            {line}
                            {i < data.name.split('\n').length - 1 && <br />}
                        </span>
                    ))}
                </h3>
                {data.description && (
                    <p
                        className={`leading-tight ${layout.whiteText || textColor === 'white' ? 'text-white/90' : 'text-stone-700'}`}
                        style={{ fontSize: layout.fontSize ? `calc(${layout.fontSize} * 0.78)` : '7px' }}
                    >
                        {data.description.split('\n').map((line: string, i: number) => (
                            <span key={i}>
                                {line}
                                {i < data.description.split('\n').length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                )}
            </div>
        );
    };

    const ScaledOverlayContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div
            className="absolute inset-0 origin-top-left"
            style={{
                width: `${REFERENCE_WIDTH}px`,
                height: `${REFERENCE_WIDTH * (11 / 8.5)}px`,
                transform: `scale(${scale})`,
            }}
        >
            {children}
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-900">
            <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-50">
                <div className="container mx-auto px-5 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center text-stone-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <Link to="/" className="flex items-center">
                        <img src="/images/logo-white.png" alt="LARAS" className="h-12 w-12 object-contain" />
                    </Link>
                    <div className="w-6" />
                </div>
            </header>

            <div className="bg-stone-900 text-white pt-8 pb-4 text-center">
                <h1 className="text-2xl font-black tracking-tight">Nuestro Menú</h1>
                <div className="flex justify-center gap-2 mt-4 flex-wrap px-4">
                    {menuPages.map((page, index) => (
                        <button
                            key={page.id}
                            onClick={() => scrollTo(index)}
                            className={`px-3 py-1.5 rounded-full font-medium text-xs transition-all ${selectedIndex === index
                                ? 'bg-amber-500 text-white'
                                : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white'
                            }`}
                        >
                            {page.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative bg-stone-900 pb-10">
                <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm">
                    <ChevronRight className="w-6 h-6" />
                </button>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {menuPages.map((page, index) => (
                            <div
                                key={page.id}
                                className={`flex-[0_0_95%] md:flex-[0_0_70%] lg:flex-[0_0_50%] min-w-0 px-2 md:px-4 transition-all duration-300 ${selectedIndex === index ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
                            >
                                <div
                                    ref={index === 0 ? menuCardRef : undefined}
                                    className={`relative bg-white shadow-2xl mx-auto transition-shadow duration-300 touch-manipulation ${selectedIndex === index ? 'shadow-2xl shadow-black/50' : 'shadow-lg'}`}
                                    style={{ aspectRatio: '8.5/11' }}
                                >
                                    <img src={page.image} alt={page.title} className="w-full h-full object-contain" />

                                    {page.id === 1 && (
                                        <ScaledOverlayContainer>
                                            {Object.keys(bebidasLayout).map(key => renderOverlay(key, bebidasLayout[key], 'bg-white', '22%'))}
                                        </ScaledOverlayContainer>
                                    )}

                                    {page.id === 2 && (
                                        <ScaledOverlayContainer>
                                            {Object.keys(snacksLayout).map(key => renderOverlay(key, snacksLayout[key], 'bg-white', '18%'))}
                                            {Object.keys(papasLayout).map(key => renderOverlay(key, papasLayout[key], 'bg-white', '18%'))}
                                            {Object.keys(tortasVegLayout).map(key => renderOverlay(key, tortasVegLayout[key], 'bg-[rgb(68,118,74)]', '20%', 'white'))}
                                        </ScaledOverlayContainer>
                                    )}

                                    {page.id === 3 && (
                                        <ScaledOverlayContainer>
                                            {Object.keys(hamburguesasLayout).map(key => renderOverlay(key, hamburguesasLayout[key], 'bg-white', '22%'))}
                                            {Object.keys(carnesLayout).map(key => renderOverlay(key, carnesLayout[key], 'bg-[rgb(192,111,54)]', '22%', 'white'))}
                                        </ScaledOverlayContainer>
                                    )}

                                    {page.id === 4 && (
                                        <ScaledOverlayContainer>
                                            {Object.keys(tacosLayout).map(key => renderOverlay(key, tacosLayout[key], 'bg-white', '22%'))}
                                            {Object.keys(tortasCarnitaLayout).map(key => renderOverlay(key, tortasCarnitaLayout[key], 'bg-white', '22%'))}
                                            {Object.keys(combosLayout).map(key => renderOverlay(key, combosLayout[key], 'bg-white', '22%'))}
                                            {Object.keys(salsasLayout).map(key => renderOverlay(key, salsasLayout[key], 'bg-white', '18%'))}
                                        </ScaledOverlayContainer>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {menuPages.map((page, index) => (
                        <button
                            key={page.id}
                            onClick={() => scrollTo(index)}
                            className={`w-3 h-3 rounded-full transition-all ${selectedIndex === index ? 'bg-amber-500 w-8' : 'bg-stone-600 hover:bg-stone-500'}`}
                        />
                    ))}
                </div>
            </div>

            <footer className="bg-stone-500 text-white">
                <div className="border-b border-white/20">
                    <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <img src="/images/hamburger-svg.png" alt="Hamburger" className="h-16 w-auto object-contain opacity-80" />
                            <img src="/images/taco-svg.png" alt="Taco" className="h-16 w-auto object-contain opacity-80" />
                            <img src="/images/torta-svg.png" alt="Torta" className="h-16 w-auto object-contain opacity-80" />
                            <img src="/images/smoothie-svg.png" alt="Smoothie" className="h-16 w-auto object-contain opacity-80" />
                        </div>
                        <div className="flex justify-start lg:justify-end gap-8 text-sm items-center">
                            <Link to="/" className="hover:opacity-70 transition-opacity">Inicio</Link>
                            <Link to="/menu" className="hover:opacity-70 transition-opacity">Menú</Link>
                            <Link to="/#ubicacion" className="hover:opacity-70 transition-opacity">Contacto</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row">
                    <div className="flex-1 flex items-center gap-6 px-8 py-10 lg:border-r border-white/20">
                        <img src="/images/3d-logo.png" alt="LARAS" className="h-20 w-20 object-contain" />
                        <div className="border-l border-white/30 pl-6">
                            <p className="text-base uppercase tracking-widest font-medium">Tortas, hamburguesas,</p>
                            <p className="text-base uppercase tracking-widest font-medium">cárnicas y vegetarianas</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 px-12 py-10 lg:border-r border-white/20">
                        <a
                            href={restaurantInfo.instagramUrl
                                ? (restaurantInfo.instagramUrl.startsWith('http') ? restaurantInfo.instagramUrl : `https://${restaurantInfo.instagramUrl}`)
                                : 'https://instagram.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                        >
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a
                            href={restaurantInfo.facebookUrl
                                ? (restaurantInfo.facebookUrl.startsWith('http') ? restaurantInfo.facebookUrl : `https://${restaurantInfo.facebookUrl}`)
                                : 'https://facebook.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                        >
                            <Facebook className="w-6 h-6" />
                        </a>
                    </div>
                    <div className="flex items-center px-8 py-10">
                        <p className="text-sm opacity-60">2024 Lara's Montemorelos. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MenuPage;
