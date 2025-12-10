import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

// ===== MENU-1: BEBIDAS Y AGUAS (Cyan overlays) =====
const bebidasItems = [
    { id: 'licuados', name: 'LICUADOS', description: 'Fresa, mango, guanábana o mix berrie, plátanos, melón, papaya, chocomilk.', priceHalf: 50, priceFull: 70, top: '14%', left: '5%', minHeight: '9%' },
    { id: 'smoothies', name: 'SMOOTHIES', description: 'Mango, piña con mango y chamoy, plátano, fresa, mix berrie o piña natural.', priceHalf: 55, priceFull: 75, top: '23%', left: '5%' },
    { id: 'sodas', name: 'SODAS', description: 'Coca Cola, Coca Cola Light, Fanta, Manzana, Sangría, Sprite y Ponche.', price: 27, top: '31.8%', left: '5%' },
    { id: 'agua-frutas', name: 'AGUA DE FRUTAS', description: 'Piña, melón, mango, fresa, papaya, pepino con limón, limonada o guanábana.', priceHalf: 45, priceFull: 58, top: '40%', left: '5%' },
    { id: 'chocolate', name: 'CHOCOLATE', description: 'Chocolate caliente con bombones.', priceHalf: 45, top: '49.9%', left: '5%', minHeight: '6%' },
    { id: 'frappe', name: 'FRAPPÉ', description: 'Capuchino Moka', price: 50, top: '57%', left: '5%' },
    { id: 'mangonada-frappe', name: 'MANGONADA FRAPPÉ', description: 'Mango, chamoy, chile en polvo y varita de tamarindo', priceHalf: 55, priceFull: 75, top: '63.4%', left: '5%' },
    { id: 'cafe', name: 'CAFÉ', description: 'Estilo americano.', price: 25, top: '70.9%', left: '5%' },
];

// ===== MENU-2: SNACKS (Pink overlays) =====
const snacksItems = [
    { id: 'sandwich-turkey', name: 'SÁNDWICH TURKEY', description: 'Mayonesa, aguacate, tomate, lechuga, jamón de pavo, quesos.', price: 48, top: '6%', left: '2%' },
    { id: 'sandwich-veggie', name: 'SÁNDWICH VEGGIE', description: 'Mayonesa, aguacate, tomate, lechuga, bologna, quesos.', price: 55, top: '14%', left: '2%' },
    { id: 'sandwich-pollo', name: 'SÁNDWICH DE POLLO', description: 'Mayonesa, aguacate, tomate, lechuga, pechuga de pollo marinado especial, quesos.', price: 60, top: '22%', left: '2%' },
    { id: 'sincronizada-res', name: 'SINCRONIZADA DE RES/POLLO', description: 'Carne de res salteada con morrón y cebolla, quesos, tortilla de harina.', price: 98, top: '30%', left: '2%' },
    { id: 'sincronizada-veg', name: 'SINCRONIZADA VEGETARIANA', description: 'Fajita de gluten al jengibre salteada con morrón, cebolla, quesos, tortilla de harina.', price: 115, top: '40%', left: '2%' },
    { id: 'tenders', name: 'TENDERS', description: 'Pechuga de pollo, quesos, papas a la francesa incluye refresco.', price: 160, top: '50%', left: '2%' },
    { id: 'boneless-snack', name: 'BONELESS', description: 'Papas a la francesa, aderezo Ranch, zanahoria y Apio.', price: 125, top: '60%', left: '2%' },
];

// ===== MENU-2: PAPAS (Blue overlays) =====
const papasItems = [
    { id: 'papas', name: 'PAPAS', description: 'A la francesa naturales $49. Con queso y aderezo Laras $60.', price: 49, top: '18%', left: '20%' },
    { id: 'beef-bowl', name: 'BEEF BOWL', description: 'Papas a la francesa con queso, aderezo Laras con carne.', price: 115, top: '28%', left: '20%' },
    { id: 'salchipapas', name: 'SALCHIPAPAS', description: 'Papas a la francesa con queso, aderezo Laras con salchicha veggie.', price: 120, top: '38%', left: '20%' },
    { id: 'boneless-bowl', name: 'BONELESS BOWL', description: 'Papas a la francesa con queso, aderezo Laras, boneless bañados en salsa búfalo.', price: 140, top: '48%', left: '20%' },
    { id: 'chicken-bowl', name: 'CHICKEN BOWL', description: 'Papas a la francesa con queso, aderezo Laras con pollo.', price: 115, top: '58%', left: '20%' },
];

// ===== MENU-2: TORTAS VEGETARIANAS (Green overlays) =====
const tortasVegItems = [
    { id: 'milanesa-enchilado', name: 'MILANESA DE GLUTEN ENCHILADO', description: 'Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.', price: 115, top: '50%', left: '55%' },
    { id: 'milanesa-empanizado', name: 'MILANESA DE GLUTEN EMPANIZADO', description: 'Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.', price: 115, top: '50%', left: '78%' },
    { id: 'fajita-gluten', name: 'FAJITA DE GLUTEN AL JENGIBRE', description: 'Mayonesa, tomate, morrón, cebolla, aguacate, quesos, lechuga y aderezo Laras.', price: 115, top: '65%', left: '55%' },
    { id: 'gluten-pastor', name: 'GLUTEN AL PASTOR', description: 'Trocitos de piña, mayonesa, tomate, aguacate, queso, aderezo Laras y cebolla.', price: 115, top: '80%', left: '55%' },
];

// ===== MENU-3: TACOS (Orange overlays) =====
const tacosItems = [
    { id: 'tacos-res', name: 'TACOS DE CARNE DE RES', description: 'Con morrón y cebolla, cilantro y tortilla de maíz.', price: 20, top: '12%', left: '2%' },
    { id: 'tacos-veg-enchilados', name: 'TACOS VEGETARIANOS ENCHILADOS', description: 'Gluten enchilado salteado con morrón y cebolla.', price: 25, top: '12%', left: '25%' },
    { id: 'tacos-vegetarianos', name: 'TACOS VEGETARIANOS', description: 'Gluten al jengibre salteado con morrón y cebolla.', price: 25, top: '26%', left: '2%' },
    { id: 'tacos-pastor-veggie', name: 'TACOS AL PASTOR VEGGIE', description: 'Salteados con trocitos de piña y cebolla y tortilla de maíz.', price: 25, top: '26%', left: '25%' },
];

// ===== MENU-3: TORTAS CON CARNITA (Red overlays) =====
const tortasCarnitaItems = [
    { id: 'fajita-beef', name: 'FAJITA BEEF', description: 'Carne de res marinado especial, morrón, cebolla, mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.', price: 98, top: '48%', left: '2%' },
    { id: 'chicken-fajita', name: 'CHICKEN FAJITA', description: 'Pechuga de pollo marinado especial, morrón, cebolla, mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.', price: 98, top: '48%', left: '25%' },
    { id: 'arrachera-cheese', name: 'ARRACHERA CHEESE STEAK', description: 'Arrachera americana, morrón, cebolla, mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.', price: 135, top: '70%', left: '2%' },
];

// ===== MENU-4: COMBOS (Purple overlays) =====
const combosItems = [
    { id: 'combo-1', name: 'COMBO #1', description: 'Fajita Beef o Chicken Fajita, más agua del día y papas.', price: 115, top: '22%', left: '52%' },
    { id: 'combo-2', name: 'COMBO #2', description: 'Torta de Arrachera Cheese Steak, más agua del día y papas.', price: 150, top: '32%', left: '52%' },
    { id: 'combo-3', name: 'COMBO #3', description: 'Torta vegetariana, más agua del día y papas.', price: 135, top: '42%', left: '52%' },
    { id: 'combo-4', name: 'COMBO #4', description: 'Sándwich con jamón vegetariano + Chocomilk.', price: 75, top: '52%', left: '52%' },
    { id: 'combo-5', name: 'COMBO #5', description: 'Sincronizada vegetariana, más agua del día y papas.', price: 135, top: '22%', left: '77%' },
    { id: 'combo-6', name: 'COMBO #6', description: 'Sincronizada de Res o Pollo, más agua del día y papas.', price: 115, top: '32%', left: '77%' },
    { id: 'combo-7', name: 'COMBO #7', description: 'Arma tu combo: Elige tu hamburguesa + $15 y llévate una soda.', price: 15, top: '42%', left: '77%' },
    { id: 'combo-8', name: 'COMBO #8', description: 'Sándwich de jamón de pavo + Chocomilk.', price: 70, top: '55%', left: '77%' },
    { id: 'combo-9', name: 'COMBO #9', description: 'Sándwich de pollo + Chocomilk.', price: 90, top: '65%', left: '77%' },
];

// ===== MENU-4: SALSAS (Yellow overlays) =====
const salsasItems = [
    { id: 'ranch', name: 'RANCH', description: '', price: 0, top: '78%', left: '55%' },
    { id: 'bbq', name: 'BBQ', description: '', price: 0, top: '78%', left: '78%' },
    { id: 'bufalo', name: 'BUFALO', description: '', price: 0, top: '88%', left: '78%' },
    { id: 'bbq-chipotle', name: 'BBQ CHIPOTLE', description: '', price: 0, top: '95%', left: '52%' },
];

// Menu pages configuration
const menuPages = [
    { id: 1, title: 'Bebidas y Aguas', image: '/images/menu-1.png' },
    { id: 2, title: 'Snacks y Papas', image: '/images/menu-2.png' },
    { id: 3, title: 'Tacos y Hamburguesas', image: '/images/menu-3.png' },
    { id: 4, title: 'Combos', image: '/images/menu-4.png' },
];

const MenuPage: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', containScroll: false });
    const [selectedIndex, setSelectedIndex] = React.useState(0);

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

    // Render overlay helper
    const renderOverlay = (item: any, bgColor: string, width: string = '20%') => (
        <div
            key={item.id}
            className={`absolute ${bgColor} border border-black/20 px-1 py-0.5`}
            style={{ top: item.top, left: item.left, width, minHeight: item.minHeight || 'auto' }}
        >
            <h3 className="font-black text-[9px] text-stone-900 uppercase tracking-wide leading-tight">{item.name}</h3>
            {item.description && <p className="text-[7px] text-stone-700 leading-tight">{item.description}</p>}
            {item.price > 0 && <div className="text-[8px] text-stone-800 font-bold">${item.price}</div>}
            {item.priceHalf && <div className="text-[7px] text-stone-800">1/2L ${item.priceHalf} {item.priceFull && `| 1L $${item.priceFull}`}</div>}
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
                                className={`flex-[0_0_90%] md:flex-[0_0_70%] lg:flex-[0_0_50%] min-w-0 px-4 transition-all duration-300 ${selectedIndex === index ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                                    }`}
                            >
                                <div
                                    className={`relative bg-white shadow-2xl mx-auto transition-shadow duration-300 ${selectedIndex === index ? 'shadow-2xl shadow-black/50' : 'shadow-lg'
                                        }`}
                                    style={{ aspectRatio: '8.5/11' }}
                                >
                                    <img src={page.image} alt={page.title} className="w-full h-full object-contain" />

                                    {/* MENU 1: Bebidas - Cyan */}
                                    {index === 0 && (
                                        <div className="absolute inset-0">
                                            {bebidasItems.map(item => renderOverlay(item, 'bg-cyan-200/90', '22%'))}
                                        </div>
                                    )}

                                    {/* MENU 2: Snacks, Papas, Tortas Veg */}
                                    {index === 1 && (
                                        <div className="absolute inset-0">
                                            {snacksItems.map(item => renderOverlay(item, 'bg-pink-200/90', '18%'))}
                                            {papasItems.map(item => renderOverlay(item, 'bg-blue-200/90', '18%'))}
                                            {tortasVegItems.map(item => renderOverlay(item, 'bg-green-200/90', '20%'))}
                                        </div>
                                    )}

                                    {/* MENU 3: Tacos, Tortas Carnita */}
                                    {index === 2 && (
                                        <div className="absolute inset-0">
                                            {tacosItems.map(item => renderOverlay(item, 'bg-orange-200/90', '22%'))}
                                            {tortasCarnitaItems.map(item => renderOverlay(item, 'bg-red-200/90', '22%'))}
                                        </div>
                                    )}

                                    {/* MENU 4: Combos, Salsas */}
                                    {index === 3 && (
                                        <div className="absolute inset-0">
                                            {combosItems.map(item => renderOverlay(item, 'bg-purple-200/90', '22%'))}
                                            {salsasItems.map(item => renderOverlay(item, 'bg-yellow-200/90', '18%'))}
                                        </div>
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
        </div>
    );
};

export default MenuPage;
