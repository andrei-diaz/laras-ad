import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Instagram, Facebook } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

// Container height at 400px width = ~518px. Each 1% = ~5.2px
// Pattern: 7% gaps (~36px), heights 28-32px, fonts 7px, icons 20px

// ===== MENU-1: BEBIDAS Y AGUAS =====
// Left column: 13%, 21%, 29%, 37%, 45%, 53%, 61%, 69% (8% gaps = ~41px)
const bebidasItems = [
    { id: 'licuados', name: 'LICUADOS', description: 'Fresa, mango, guanábana, mix berrie, plátanos, melón, papaya. 1/2L $50 | 1L $70', top: '13%', left: '4%', width: '23%', height: '38px', fontSize: '7px' },
    { id: 'smoothies', name: 'SMOOTHIES', description: 'Mango, piña con chamoy, plátano, fresa, mix berrie. 1/2L $55 | 1L $75', top: '21%', left: '4%', width: '23%', height: '38px', fontSize: '7px' },
    { id: 'sodas', name: 'SODAS', description: 'Coca Cola, Fanta, Manzana, Sangría, Sprite, Ponche. $27', top: '29%', left: '4%', width: '23%', height: '32px', fontSize: '7px' },
    { id: 'agua-frutas', name: 'AGUA DE FRUTAS', description: 'Piña, melón, mango, fresa, papaya, pepino, limonada. 1/2L $45 | 1L $58', top: '37%', left: '4%', width: '23%', height: '38px', fontSize: '7px' },
    { id: 'chocolate', name: 'CHOCOLATE', description: 'Chocolate caliente con bombones. 1/2L $45', top: '45%', left: '4%', width: '23%', height: '28px', fontSize: '7px' },
    { id: 'frappe', name: 'FRAPPÉ', description: 'Capuchino Moka $50', top: '53%', left: '4%', width: '23%', height: '24px', fontSize: '7px' },
    { id: 'mangonada-frappe', name: 'MANGONADA FRAPPÉ', description: 'Mango, chamoy, chile en polvo y tamarindo. 1/2L $55 | 1L $75', top: '60%', left: '4%', width: '23%', height: '40px', fontSize: '7px' },
    { id: 'cafe', name: 'CAFÉ', description: 'Estilo americano. $25', top: '69%', left: '4%', width: '23%', height: '24px', fontSize: '7px' },
];

// ===== MENU-2: SNACKS =====
// Left column: 12%, 20%, 28%, 36%, 44%, 52%, 60% (8% gaps)
const snacksItems = [
    { id: 'sandwich-turkey', name: 'SÁNDWICH TURKEY', description: 'Mayonesa, aguacate, tomate, lechuga, jamón pavo, quesos. $48', top: '12%', left: '2%', width: '23%', height: '40px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    { id: 'sandwich-veggie', name: 'SÁNDWICH VEGGIE', description: 'Mayonesa, aguacate, tomate, lechuga, bologna, quesos. $55', top: '20%', left: '2%', width: '23%', height: '40px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'sandwich-pollo', name: 'SÁNDWICH POLLO', description: 'Mayonesa, aguacate, tomate, lechuga, pechuga pollo, quesos. $60', top: '28%', left: '2%', width: '23%', height: '46px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    { id: 'sincronizada-res', name: 'SINCRONIZADA RES', description: 'Carne de res con morrón, cebolla, quesos, tortilla. $98', top: '35.8%', left: '2%', width: '23%', height: '40px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'sincronizada-veg', name: 'SINCRONIZADA VEG', description: 'Fajita de gluten al jengibre con morrón, cebolla, quesos. $115', top: '42.3%', left: '2%', width: '23%', height: '40px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'tenders', name: 'TENDERS', description: 'Pechuga, quesos, papas, refresco. Aderezo a elegir. $160', top: '49.8%', left: '2%', width: '23%', height: '32px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    { id: 'boneless-snack', name: 'BONELESS', description: 'Papas a la francesa, \naderezo Ranch, zanahoria y Apio. $125', top: '57%', left: '2%', width: '23%', height: '32px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
];

// ===== MENU-2: PAPAS =====
// Second column: 26%, 34%, 42%, 50%, 58% (8% gaps)
const papasItems = [
    { id: 'papas', name: 'PAPAS', description: 'Naturales $49 | \nCon queso y aderezo \n$60', top: '27.7%', left: '26%', width: '22%', height: '32px', fontSize: '7px', icon: 'fries', iconSize: '18px' },
    { id: 'beef-bowl', name: 'BEEF BOWL', description: 'Papas con queso, \naderezo Laras, carne. \n$115', top: '35%', left: '26%', width: '22%', height: '35px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'salchipapas', name: 'SALCHIPAPAS', description: 'Papas con queso, \naderezo, salchicha veggie. $120', top: '42%', left: '26%', width: '22%', height: '42px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'boneless-bowl', name: 'BONELESS BOWL', description: 'Papas con queso, aderezo, boneless búfalo. $140', top: '49.5%', left: '26%', width: '22%', height: '36px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    { id: 'chicken-bowl', name: 'CHICKEN BOWL', description: 'Papas con queso, aderezo Laras, pollo. $115', top: '56.8%', left: '26%', width: '22%', height: '34px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
];

// ===== MENU-2: TORTAS VEGETARIANAS (Green) =====
// Right side: 50%, 60%, 70%, 80% (10% gaps for larger cards)
const tortasVegItems = [
    { id: 'milanesa-enchilado', name: 'MILANESA GLUTEN ENCHILADO', description: 'Mayonesa, tomate, aguacate, quesos, lechuga. \n$115', top: '50%', left: '52%', width: '23.93%', height: '55px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'milanesa-empanizado', name: 'MILANESA GLUTEN EMPANIZADO', description: 'Mayonesa, tomate, aguacate, quesos, lechuga. \n$115', top: '50%', left: '76%', width: '22%', height: '55px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'fajita-gluten', name: 'FAJITA GLUTEN JENGIBRE', description: 'Mayonesa, tomate, morrón, cebolla, aguacate, quesos. \n$115', top: '62%', left: '50%', width: '29.5%', height: '63px', fontSize: '8px', icon: 'veggie', iconSize: '20px' },
    { id: 'gluten-pastor', name: 'GLUTEN AL PASTOR', description: 'Trocitos de piña, mayonesa, \ntomate, aguacate, queso. \n$115', top: '75.3%', left: '50%', width: '29.5%', height: '56px', fontSize: '8px', icon: 'veggie', iconSize: '20px' },
];

// ===== MENU-3: HAMBURGUESAS =====
// Two columns: 14%, 24%, 34%, 44% and 54%, 64% (10% gaps for content)
const hamburguesasItems = [
    { id: 'classic-beef', name: 'CLASSIC BEEF', description: 'Carne res 1/4 libra, \nmostaza, mayo, aguacate, quesos, tomate. $98', top: '18%', left: '2%', width: '22%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'classic-veggie', name: 'CLASSIC VEGGIE', description: 'Carne vegetal 1/4 libra, mostaza, mayo, quesos, tomate. $115', top: '18%', left: '25%', width: '22%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'hamburguesa-doble', name: 'HAMBURGUESA DOBLE', description: 'Doble carne res, mostaza, mayo, aguacate, quesos. $125', top: '29%', left: '2%', width: '22%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'hamburguesa-doble-veggie', name: 'HAMBURGUESA DOBLE VEG', description: 'Doble carne vegetal, mostaza, mayo, quesos. $135', top: '29%', left: '25%', width: '22%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'salchi-burguer', name: 'SALCHI-BURGUER', description: 'Carne res 180g, salchichas, mostaza, mayo, quesos. $130', top: '40%', left: '2%', width: '22%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'salchi-burguer-veggie', name: 'SALCHI-BURGUER VEG', description: 'Carne vegetal, salchicha vegetal, quesos. $140', top: '40%', left: '25%', width: '22%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'hamburguesa-jalapeno', name: 'HAMBURGUESA JALAPEÑO', description: 'Carne res 180g, jalapeños, mayo, quesos. $115', top: '52%', left: '2%', width: '22%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'hamburguesa-jalapeno-veggie', name: 'HAMBURGUESA JALAPEÑO VEG', description: 'Carne vegetal 180g, jalapeños, quesos. $120', top: '52%', left: '25%', width: '22%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
];

// ===== MENU-3: CARNES (Right side - Orange) =====
// Right column: 38%, 50%, 62%, 74% (12% gaps)
const carnesItems = [
    { id: 'chicken-tender', name: 'CHICKEN TENDER BURGER', description: 'Tenders con salsa búfalo, queso, lechuga, tomate. $138', top: '38%', left: '52%', width: '24%', height: '45px', fontSize: '7px', icon: 'chicken', iconSize: '20px', noBg: true },
    { id: 'hamburguesa-bbq', name: 'HAMBURGUESA BBQ', description: 'Carne res 180g, salsa BBQ, cebolla, quesos. $128', top: '50%', left: '52%', width: '24%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px', noBg: true },
    { id: 'hamburguesa-bbq-veggie', name: 'HAMBURGUESA BBQ VEG', description: 'Carne vegetal 180g, salsa BBQ, quesos. $130', top: '62%', left: '52%', width: '24%', height: '45px', fontSize: '7px', icon: 'veggie', iconSize: '20px', noBg: true },
    { id: 'hamburguesa-hawaiana', name: 'HAMBURGUESA HAWAIANA', description: 'Carne res 180g, piña asada, salsa de piña, quesos. $130', top: '74%', left: '52%', width: '24%', height: '45px', fontSize: '7px', icon: 'cow', iconSize: '20px', noBg: true },
];

// ===== MENU-4: TACOS =====
// Two columns: 21%, 31% (10% gaps)
const tacosItems = [
    { id: 'tacos-res', name: 'TACOS DE RES', description: 'Con morrón, cebolla, \ncilantro, tortilla maíz. \n$20 c/u', top: '21%', left: '2%', width: '23%', height: '42px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'tacos-veg-enchilados', name: 'TACOS VEG ENCHILADOS', description: 'Gluten enchilado con morrón y cebolla. $25 c/u', top: '21%', left: '25%', width: '22%', height: '38px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'tacos-vegetarianos', name: 'TACOS VEGETARIANOS', description: 'Gluten al jengibre con morrón y cebolla. $25 c/u', top: '31%', left: '2%', width: '22%', height: '38px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'tacos-pastor-veggie', name: 'TACOS AL PASTOR VEG', description: 'Con trocitos de piña, cebolla, tortilla maíz. \n$25 c/u', top: '31%', left: '25%', width: '22%', height: '41px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
];

// ===== MENU-4: TORTAS CON CARNITA =====
// Left side: 50%, 60%, 70% (10% gaps)
const tortasCarnitaItems = [
    { id: 'fajita-beef', name: 'FAJITA BEEF', description: 'Carne res marinada, \nmorrón, cebolla, quesos. $98', top: '54%', left: '3.2%', width: '21.4%', height: '40px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'chicken-fajita', name: 'CHICKEN FAJITA', description: 'Pechuga pollo marinado, morrón, cebolla, quesos. $98', top: '54%', left: '26%', width: '20%', height: '40px', fontSize: '7px', icon: 'chicken', iconSize: '20px' },
    { id: 'arrachera-cheese', name: 'ARRACHERA CHEESE STEAK', description: 'Arrachera americana, morrón, cebolla, quesos. $135', top: '66%', left: '2%', width: '24%', height: '38px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
];

// ===== MENU-4: COMBOS =====
const combosItems = [
    // Left column: 35%, 42%, 49%, 56% (7% gaps = ~36px each)
    { id: 'combo-1', name: 'COMBO #1', description: 'Fajita Beef o Chicken + \nagua + papas. $115', top: '35%', left: '52%', width: '22%', height: '32px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'combo-2', name: 'COMBO #2', description: 'Arrachera Cheese \nSteak + agua + papas. \n$150', top: '42%', left: '52%', width: '22%', height: '32px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'combo-3', name: 'COMBO #3', description: 'Torta vegetariana + \nagua + papas. $135', top: '49%', left: '52%', width: '22%', height: '32px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'combo-4', name: 'COMBO #4', description: 'Sándwich vegetariano \n+ Chocomilk. $75', top: '56%', left: '52%', width: '22%', height: '32px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    // Right column: 35%, 42%, 49%, 56%, 63% (7% gaps = ~36px each)
    { id: 'combo-5', name: 'COMBO #5', description: 'Sincronizada vegetariana + \nagua + papas. $135', top: '35%', left: '75%', width: '23%', height: '32px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'combo-6', name: 'COMBO #6', description: 'Sincronizada Res/Pollo + \nagua + papas. $115', top: '42%', left: '75%', width: '23%', height: '32px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
    { id: 'combo-7', name: 'COMBO #7', description: 'Tu hamburguesa + $15 = soda.', top: '49%', left: '75%', width: '23%', height: '32px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'combo-8', name: 'COMBO #8', description: 'Sándwich pavo + \nChocomilk. $70', top: '56%', left: '75%', width: '23%', height: '28px', fontSize: '7px', icon: 'veggie', iconSize: '20px' },
    { id: 'combo-9', name: 'COMBO #9', description: 'Sándwich pollo + \nChocomilk. $90', top: '62%', left: '75%', width: '23%', height: '28px', fontSize: '7px', icon: 'cow', iconSize: '20px' },
];

// ===== MENU-4: SALSAS =====
const salsasItems = [
    { id: 'salsa', name: '', description: 'Salsa extra $10', top: '93.05%', left: '68%', width: '12%', height: '8px', fontSize: '6px', noBg: true, whiteText: true },
];

// Menu pages configuration (reversed order: 4, 3, 2, 1)
const menuPages = [
    { id: 4, title: 'Combos', image: '/images/menu-4.png' },
    { id: 3, title: 'Tacos y Hamburguesas', image: '/images/menu-3.png' },
    { id: 2, title: 'Snacks y Papas', image: '/images/menu-2.png' },
    { id: 1, title: 'Bebidas y Aguas', image: '/images/menu-1.png' },
];

const MenuPage: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', containScroll: false });
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // Reference width at which overlays were designed (adjust if needed)
    const REFERENCE_WIDTH = 400;
    const [scale, setScale] = useState(1);
    const menuCardRef = useRef<HTMLDivElement>(null);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);

    // Calculate scale factor based on container width
    useEffect(() => {
        const updateScale = () => {
            if (menuCardRef.current) {
                const width = menuCardRef.current.offsetWidth;
                setScale(width / REFERENCE_WIDTH);
            }
        };

        updateScale();

        const resizeObserver = new ResizeObserver(updateScale);
        if (menuCardRef.current) {
            resizeObserver.observe(menuCardRef.current);
        }

        window.addEventListener('resize', updateScale);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    // Simple overlay renderer - no scaling needed here, parent uses CSS transform
    const renderOverlay = (item: any, bgColor: string, defaultWidth: string = '20%', textColor: string = 'dark') => (
        <div
            key={item.id}
            className={`absolute ${item.noBg ? '' : bgColor} px-1 py-0.5`}
            style={{
                top: item.top,
                left: item.left,
                width: item.width || defaultWidth,
                height: item.height || 'auto',
                overflow: 'hidden', // Prevent text overflow beyond fixed heights
            }}
        >
            {item.icon && (
                <img
                    src={`/images/food-icons/${item.icon}.png`}
                    alt={item.icon}
                    className="absolute object-contain"
                    style={{
                        width: item.iconSize || '26px',
                        height: item.iconSize || '26px',
                        top: item.iconTop || '1px',
                        right: item.iconRight || '1px'
                    }}
                />
            )}
            <h3
                className={`font-black uppercase tracking-wide leading-tight ${item.whiteText || textColor === 'white' ? 'text-white' : 'text-stone-900'}`}
                style={{ fontSize: item.fontSize || '9px', paddingRight: item.icon ? '22px' : '0' }}
            >
                {item.name.split('\n').map((line: string, i: number) => (
                    <span key={i}>
                        {line}
                        {i < item.name.split('\n').length - 1 && <br />}
                    </span>
                ))}
            </h3>
            {item.description && (
                <p
                    className={`leading-tight ${item.whiteText || textColor === 'white' ? 'text-white/90' : 'text-stone-700'}`}
                    style={{ fontSize: item.fontSize ? `calc(${item.fontSize} * 0.78)` : '7px' }}
                >
                    {item.description.split('\n').map((line: string, i: number) => (
                        <span key={i}>
                            {line}
                            {i < item.description.split('\n').length - 1 && <br />}
                        </span>
                    ))}
                </p>
            )}
        </div>
    );

    // Wrapper component that applies CSS transform scale to all overlays
    const ScaledOverlayContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div
            className="absolute inset-0 origin-top-left"
            style={{
                width: `${REFERENCE_WIDTH}px`,
                height: `${REFERENCE_WIDTH * (11 / 8.5)}px`, // Match aspect ratio 8.5/11
                transform: `scale(${scale})`,
            }}
        >
            {children}
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-900">
            {/* Header */}
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

            {/* Menu Title */}
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

            {/* Carousel Container */}
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
                                className={`flex-[0_0_95%] md:flex-[0_0_70%] lg:flex-[0_0_50%] min-w-0 px-2 md:px-4 transition-all duration-300 ${selectedIndex === index ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                                    }`}
                            >
                                <div
                                    ref={index === 0 ? menuCardRef : undefined}
                                    className={`relative bg-white shadow-2xl mx-auto transition-shadow duration-300 touch-manipulation ${selectedIndex === index ? 'shadow-2xl shadow-black/50' : 'shadow-lg'
                                        }`}
                                    style={{ aspectRatio: '8.5/11' }}
                                >
                                    <img src={page.image} alt={page.title} className="w-full h-full object-contain" />

                                    {/* MENU 1: Bebidas - White */}
                                    {page.id === 1 && (
                                        <ScaledOverlayContainer>
                                            {bebidasItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                        </ScaledOverlayContainer>
                                    )}

                                    {/* MENU 2: Snacks, Papas, Tortas Veg */}
                                    {page.id === 2 && (
                                        <ScaledOverlayContainer>
                                            {snacksItems.map(item => renderOverlay(item, 'bg-white', '18%'))}
                                            {papasItems.map(item => renderOverlay(item, 'bg-white', '18%'))}
                                            {tortasVegItems.map(item => renderOverlay(item, 'bg-[rgb(68,118,74)]', '20%', 'white'))}
                                        </ScaledOverlayContainer>
                                    )}

                                    {/* MENU 3: Hamburguesas, Carnes */}
                                    {page.id === 3 && (
                                        <ScaledOverlayContainer>
                                            {hamburguesasItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                            {carnesItems.map(item => renderOverlay(item, 'bg-[rgb(192,111,54)]', '22%', 'white'))}
                                        </ScaledOverlayContainer>
                                    )}

                                    {/* MENU 4: Tacos, Tortas, Combos, Salsas */}
                                    {page.id === 4 && (
                                        <ScaledOverlayContainer>
                                            {tacosItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                            {tortasCarnitaItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                            {combosItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                            {salsasItems.map(item => renderOverlay(item, 'bg-white', '18%'))}
                                        </ScaledOverlayContainer>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots */}
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

            {/* ===== FOOTER ===== */}
            <footer className="bg-stone-500 text-white">
                {/* Top Section */}
                <div className="border-b border-white/20">
                    <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row justify-between gap-8">
                        {/* Left - Food icons */}
                        <div className="flex items-center gap-4">
                            <img src="/images/hamburger-svg.png" alt="Hamburger" className="h-16 w-auto object-contain opacity-80" />
                            <img src="/images/taco-svg.png" alt="Taco" className="h-16 w-auto object-contain opacity-80" />
                            <img src="/images/torta-svg.png" alt="Torta" className="h-16 w-auto object-contain opacity-80" />
                            <img src="/images/smoothie-svg.png" alt="Smoothie" className="h-16 w-auto object-contain opacity-80" />
                        </div>

                        {/* Right - Navigation */}
                        <div className="flex justify-start lg:justify-end gap-8 text-sm items-center">
                            <Link to="/" className="hover:opacity-70 transition-opacity">Inicio</Link>
                            <Link to="/menu" className="hover:opacity-70 transition-opacity">Menú</Link>
                            <Link to="/#ubicacion" className="hover:opacity-70 transition-opacity">Contacto</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section with full-height dividers */}
                <div className="flex flex-col lg:flex-row">
                    {/* Logo + Tagline */}
                    <div className="flex-1 flex items-center gap-6 px-8 py-10 lg:border-r border-white/20">
                        <img src="/images/3d-logo.png" alt="LARAS" className="h-20 w-20 object-contain" />
                        <div className="border-l border-white/30 pl-6">
                            <p className="text-base uppercase tracking-widest font-medium">Tortas, hamburguesas,</p>
                            <p className="text-base uppercase tracking-widest font-medium">cárnicas y vegetarianas</p>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6 px-12 py-10 lg:border-r border-white/20">
                        <a href="https://www.instagram.com/laras.__/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="https://www.facebook.com/larasaurez/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Facebook className="w-6 h-6" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="flex items-center px-8 py-10">
                        <p className="text-sm opacity-60">
                            2024 Lara's Montemorelos. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MenuPage;
