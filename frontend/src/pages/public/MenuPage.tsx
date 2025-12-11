import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Instagram, Facebook } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

// ===== MENU-1: BEBIDAS Y AGUAS (Cyan overlays) =====
const bebidasItems = [
    { id: 'licuados', name: 'LICUADOS', description: 'Fresa, mango, guanábana o mix berrie, plátanos, melón, papaya, chocomilk.\n1/2 litro $50    1 litro $70', top: '14%', left: '5%', width: '22%', height: 'auto', fontSize: '9px' },
    { id: 'smoothies', name: 'SMOOTHIES', description: 'Mango, piña con mango y chamoy, plátano, fresa, mix berrie o piña natural.\n1/2 litro $55    1 litro $75', top: '23%', left: '5%', width: '22%', height: 'auto', fontSize: '9px' },
    { id: 'sodas', name: 'SODAS', description: 'Coca Cola, Coca Cola Light, Fanta, Manzana, Sangría, Sprite y Ponche. $27', top: '31.8%', left: '5%', width: '22%', height: 'auto', fontSize: '9px' },
    { id: 'agua-frutas', name: 'AGUA DE FRUTAS', description: 'Piña, melón, mango, fresa, papaya, pepino con limón, limonada o guanábana.\n1/2 litro $45    1 litro $58', top: '40%', left: '5%', width: '22%', height: 'auto', fontSize: '9px' },
    { id: 'chocolate', name: 'CHOCOLATE', description: 'Chocolate caliente con bombones.\n1/2 litro $45', top: '49.9%', left: '5%', width: '22%', height: 'auto', fontSize: '9px' },
    { id: 'frappe', name: 'FRAPPÉ', description: 'Capuchino Moka $50', top: '57%', left: '5%', width: '22%', height: '30px', fontSize: '9px' },
    { id: 'mangonada-frappe', name: 'MANGONADA FRAPPÉ', description: 'Mango, chamoy, chile en polvo y varita de tamarindo\n1/2 litro $55    1 litro $75', top: '63.6%', left: '5%', width: '22%', height: '55px', fontSize: '9px' },
    { id: 'cafe', name: 'CAFÉ', description: 'Estilo americano. $25', top: '73%', left: '5%', width: '22%', height: 'auto', fontSize: '9px' },
];

// ===== MENU-2: SNACKS (Pink overlays) =====
const snacksItems = [
    { id: 'sandwich-turkey', name: 'SÁNDWICH \nTURKEY', description: 'Mayonesa, aguacate, tomate, lechuga, jamón de pavo, quesos. $48', top: '12%', left: '2%', width: '23%', height: '43px', fontSize: '8.2px', icon: 'chicken', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'sandwich-veggie', name: 'SÁNDWICH \nVEGGIE', description: 'Mayonesa, aguacate, tomate, lechuga, bologna, quesos. $55', top: '19.6%', left: '2%', width: '23%', height: '43px', fontSize: '8.5px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'sandwich-pollo', name: 'SÁNDWICH \nDE POLLO', description: 'Mayonesa, aguacate, tomate, lechuga, pechuga de pollo marinado especial, quesos. $60', top: '27.3%', left: '2%', width: '23%', height: 'auto', fontSize: '8.5px', icon: 'chicken', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'sincronizada-res', name: 'SINCRONIZADA \nDE RES/POLLO', description: 'Carne de res salteada con morrón y cebolla, quesos, tortilla de harina. $98', top: '35.5%', left: '2%', width: '23%', height: 'auto', fontSize: '8.5px', icon: 'cow', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'sincronizada-veg', name: 'SINCRONIZADA \nVEGETARIANA', description: 'Fajita de gluten al jengibre salteada con morrón, cebolla, quesos, tortilla de harina. $115', top: '43.58%', left: '2%', width: '23%', height: 'auto', fontSize: '8.3px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'tenders', name: 'TENDERS', description: 'Pechuga de pollo, quesos, papas a la francesa incluye refresco. Elige tu aderezo: Ranch, Búfalo, Laras, Salsa habanera y/o limón. $160', top: '52%', left: '2%', width: '23%', height: '45px', fontSize: '8.5px', icon: 'chicken', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'boneless-snack', name: 'BONELESS', description: 'Papas a la francesa, \naderezo Ranch, zanahoria y Apio. $125', top: '59.6%', left: '2%', width: '23%', height: 'auto', fontSize: '8.5px', icon: 'chicken', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
];

// ===== MENU-2: PAPAS (Blue overlays) =====
const papasItems = [
    { id: 'papas', name: 'PAPAS', description: 'A la francesa naturales. $49\nA la francesa con queso y aderezo Laras. $60', top: '28%', left: '26.5%', width: '22%', height: 'auto', fontSize: '8.6px' },
    { id: 'beef-bowl', name: 'BEEF BOWL', description: 'Papas a la francesa con queso, aderezo Laras con carne. $115', top: '35.5%', left: '26.5%', width: '22%', height: '40px', fontSize: '8.7px', icon: 'cow', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'salchipapas', name: 'SALCHIPAPAS', description: 'Papas a la francesa con \nqueso, aderezo Laras con salchicha veggie. $120', top: '43%', left: '26.5%', width: '22%', height: 'auto', fontSize: '8.5px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'boneless-bowl', name: 'BONELESS \nBOWL', description: 'Papas a la francesa con queso, aderezo Laras, boneless bañados en salsa búfalo. $140', top: '51%', left: '26.5%', width: '22%', height: '59px', fontSize: '8px', icon: 'chicken', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'chicken-bowl', name: 'CHICKEN BOWL', description: 'Papas a la francesa con \nqueso, aderezo Laras con \npollo. $115', top: '60.2%', left: '26.5%', width: '22%', height: 'auto', fontSize: '8px', icon: 'chicken', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
];

// ===== MENU-2: TORTAS VEGETARIANAS (Green overlays) =====
const tortasVegItems = [
    { id: 'milanesa-enchilado', name: 'MILANESA \nDE GLUTEN \nENCHILADO', description: 'Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.\n$115', top: '50%', left: '52.6%', width: '21%', height: '66px', fontSize: '8.3px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'milanesa-empanizado', name: 'MILANESA \nDE GLUTEN \nEMPANIZADO', description: 'Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.\n$115', top: '50%', left: '76.3%', width: '20%', height: '63.4px', fontSize: '7.69px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'fajita-gluten', name: 'FAJITA \nDE GLUTEN \nAL JENGIBRE', description: 'Mayonesa, tomate, morrón, cebolla, aguacate, quesos, lechuga y aderezo Laras.\n$115', top: '62%', left: '50.052%', width: '29%', height: '74.3px', fontSize: '9px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'gluten-pastor', name: 'GLUTEN \nAL PASTOR', description: 'Trocitos de piña, mayonesa, tomate, aguacate, queso, aderezo Laras y cebolla.\n$115', top: '75.4%', left: '50.052%', width: '29%', height: '63px', fontSize: '9px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
];

// ===== MENU-3: HAMBURGUESAS LEFT SIDE (Gray overlays) =====
const hamburguesasItems = [
    { id: 'classic-beef', name: 'CLASSIC BEEF', description: 'Carne de res preparación especial 1/4 de libra, \nmostaza, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $98', top: '15%', left: '2%', width: '22%', height: '70px', fontSize: '7.8px', icon: 'cow', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'classic-veggie', name: 'CLASSIC VEGGIE', description: 'Carne vegetal preparación especial 1/4 de libra, \nmostaza, mayonesa, jamón vegetariano, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $115', top: '15%', left: '25%', width: '22.3%', height: '70px', fontSize: '7.8px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'hamburguesa-doble', name: 'HAMBURGUESA \nDOBLE', description: 'Doble carne de res \npreparación especial 1/4 de libra, mostaza, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $125', top: '27%', left: '2%', width: '22.3%', height: '79px', fontSize: '7.8px', icon: 'cow' },
    { id: 'hamburguesa-doble-veggie', name: 'HAMBURGUESA \nDOBLE VEGGIE', description: 'Doble carne vegetal \npreparación especial 1/4 de libra, mostaza, mayonesa, aguacate, jamón vegetariano, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $135', top: '27%', left: '25%', width: '22.3%', height: '79px', fontSize: '7.8px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'salchi-burguer', name: 'SALCHI-BURGUER', description: 'Carne de res preparación \nespecial 180 gr., mostaza, mayonesa, aguacate, jamón de pavo, salchichas, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $130', top: '41.6%', left: '2%', width: '22.3%', height: '76px', fontSize: '7.8px', icon: 'cow' },
    { id: 'salchi-burguer-veggie', name: 'SALCHI-BURGUER \nVEGGIE', description: 'Carne vegetariana preparado \nespecial, salchicha vegetal, mayonesa, mostaza pepinillos, tomate, lechuga, bologna, mezcla de 3 quesos y aderezo Laras. $140', top: '41.6%', left: '25%', width: '22.3%', height: '76px', fontSize: '7.8px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'hamburguesa-jalapeno', name: 'HAMBURGUESA \nJALAPEÑO', description: 'Carne de res preparación especial 180 gr., mostaza, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $115', top: '55%', left: '2%', width: '22.3%', height: '82px', fontSize: '8px', icon: 'cow' },
    { id: 'hamburguesa-jalapeno-veggie', name: 'HAMBURGUESA \nJALAPEÑO VEGGIE', description: 'Carne vegetal preparación especial 180 gr., mostaza, mayonesa, aguacate, jamón vegetariano, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $120', top: '55%', left: '25%', width: '22.3%', height: '82px', fontSize: '8px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
];

// ===== MENU-3: PARA LOS AMANTES DE LAS CARNES - RIGHT SIDE (Orange overlays) =====
const carnesItems = [
    { id: 'chicken-tender', name: 'CHICKEN TENDER \nBURGER', description: 'Tenders empanizados con \nsalsa búfalo, queso, lechuga, tomate y aderezo Laras. $138', top: '38%', left: '52%', width: '24%', height: '57px', fontSize: '8px', icon: 'chicken' },
    { id: 'hamburguesa-bbq', name: 'HAMBURGUESA \nBBQ', description: 'Carne de res preparación \nespecial 180 gr., aderezada con salsa BBQ especial, mostaza, cebolla a la plancha, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga, pepinillos y aderezo Laras. $128', top: '47.128667%', left: '52%', width: '24%', height: '100px', fontSize: '8.5px', icon: 'cow' },
    { id: 'hamburguesa-bbq-veggie', name: 'HAMBURGUESA \nBBQ VEGGIE', description: 'Carne vegetal preparación \nespecial 180 gr., aderezada con salsa BBQ especial, mostaza, mayonesa, aguacate, jamón vegetariano, mezcla de quesos, cebolla a la plancha, tomate, lechuga, pepinillos y aderezo Laras. $130', top: '63.28%', left: '52%', width: '24%', height: '98px', fontSize: '8px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'hamburguesa-hawaiana', name: 'HAMBURGUESA \nHAWAIANA', description: 'Carne de res preparación \nespecial 180 gr., rebanada de piña asada, salsa especial de piña, mostaza, mayonesa, aguacate, jamón de pavo, mezcla de quesos, tomate, lechuga y aderezo Laras. $130', top: '79.02%', left: '52%', width: '24%', height: '76px', fontSize: '8px', icon: 'cow' },
];

// ===== MENU-4: TACOS LEFT SIDE (Dark overlays) =====
const tacosItems = [
    { id: 'tacos-res', name: 'TACOS DE \nCARNE DE RES', description: 'Con morrón y cebolla, \ncilantro y tortilla de maíz. $20 c/u', top: '21.8%', left: '2%', width: '23%', height: '55px', fontSize: '8px', icon: 'cow' },
    { id: 'tacos-veg-enchilados', name: 'TACOS \nVEGETARIANOS \nENCHILADOS', description: 'Gluten enchilado salteado con morrón y cebolla. $25 c/u', top: '21.8%', left: '25%', width: '22%', height: '55px', fontSize: '8px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'tacos-vegetarianos', name: 'TACOS \nVEGETARIANOS', description: 'Gluten al jengibre salteado \ncon morrón y cebolla. $25 c/u', top: '32%', left: '2%', width: '22%', height: '55px', fontSize: '8px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
    { id: 'tacos-pastor-veggie', name: 'TACOS AL \nPASTOR VEGGIE', description: 'Salteados con trocitos \nde piña y cebolla y tortilla de maíz. $25 c/u', top: '32%', left: '25%', width: '22%', height: '55px', fontSize: '8px', icon: 'veggie', iconSize: '26px', iconTop: '1px', iconRight: '1px' },
];

// ===== MENU-4: TORTAS CON CARNITA (Red overlays) =====
const tortasCarnitaItems = [
    { id: 'fajita-beef', name: 'FAJITA BEEF', description: 'Carne de res marinado \nespecial, morrón, cebolla, mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras. $98', top: '53%', left: '2%', width: '22%', height: '65px', fontSize: '8px', icon: 'cow' },
    { id: 'chicken-fajita', name: 'CHICKEN FAJITA', description: 'Pechuga de pollo \nmarinado especial, \nmorrón, cebolla, mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras. $98', top: '53%', left: '25%', width: '22%', height: '65px', fontSize: '8px', icon: 'chicken' },
    { id: 'arrachera-cheese', name: 'ARRACHERA \nCHEESE STEAK', description: 'Arrachera americana, \nmorrón, cebolla, mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras. $135', top: '65.4%', left: '0%', width: '26.37%', height: '67px', fontSize: '8px', icon: 'cow' },
];

// ===== MENU-4: COMBOS (Purple overlays) =====
const combosItems = [
    { id: 'combo-1', name: 'COMBO #1', description: 'Fajita Beef o Chicken \nFajita, más agua del \ndía y papas. $115', top: '36%', left: '52%', width: '22%', height: 'auto', fontSize: '8.5px', icon: 'cow' },
    { id: 'combo-2', name: 'COMBO #2', description: 'Torta de Arrachera \nCheese Steak, más \nagua del día y papas. $150', top: '43%', left: '52%', width: '22%', height: '45px', fontSize: '8.5px', icon: 'cow' },
    { id: 'combo-3', name: 'COMBO #3', description: 'Torta vegetariana, más \nagua del día y papas. $135', top: '50.6%', left: '52%', width: '22%', height: '37.7px', fontSize: '8.5px', icon: 'veggie' },
    { id: 'combo-4', name: 'COMBO #4', description: 'Sándwich con jamón vegetariano + \nChocomilk. $75', top: '56.7%', left: '52%', width: '22%', height: '43px', fontSize: '8.5px', icon: 'veggie' },
    { id: 'combo-5', name: 'COMBO #5', description: 'Sincronizada \nvegetariana, más agua \ndel día y papas. $135', top: '36%', left: '74.5%', width: '22%', height: '43.4px', fontSize: '8.5px', icon: 'veggie' },
    { id: 'combo-6', name: 'COMBO #6', description: 'Sincronizada de Res o \nPollo, más agua del día y papas. $115', top: '42.8%', left: '74.5%', width: '22%', height: '45.5px', fontSize: '8.5px', icon: 'cow' },
    { id: 'combo-7', name: 'COMBO #7', description: 'Arma tu combo: Elige \ntu hamburguesa (el precio \nmarcado en el menú) + $15 y llévate una soda.', top: '50.3%', left: '74.5%', width: '22%', height: '49px', fontSize: '8.5px', icon: 'veggie' },
    { id: 'combo-8', name: 'COMBO #8', description: 'Sándwich de jamón de \npavo + Chocomilk. $70', top: '58%', left: '74.5%', width: '22%', height: 'auto', fontSize: '8.5px', icon: 'veggie' },
    { id: 'combo-9', name: 'COMBO #9', description: 'Sándwich de pollo + Chocomilk. $90', top: '62.9%', left: '74.5%', width: '22%', height: 'auto', fontSize: '8.5px', icon: 'cow' },
];

// ===== MENU-4: SALSAS (Yellow overlays) =====
const salsasItems = [
    { id: 'salsa', name: '', description: 'Salsa extra $10', top: '93.06%', left: '68.5%', width: '18%', height: 'auto', fontSize: '6px' },
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

    // Render overlay helper - each item can have: width, height, fontSize, icon
    // Put price in the description string for full control
    // icon: name of icon file in /images/food-icons/ (without extension)
    // textColor: 'white' for light text on dark backgrounds
    const renderOverlay = (item: any, bgColor: string, defaultWidth: string = '20%', textColor: string = 'dark') => (
        <div
            key={item.id}
            className={`absolute ${bgColor} px-1 py-0.5`}
            style={{
                top: item.top,
                left: item.left,
                width: item.width || defaultWidth,
                height: item.height || 'auto',
                minHeight: item.minHeight || 'auto'
            }}
        >
            {/* Food icon - customize with iconSize, iconTop, iconRight */}
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
                className={`font-black uppercase tracking-wide leading-tight ${textColor === 'white' ? 'text-white' : 'text-stone-900'}`}
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
                    className={`leading-tight ${textColor === 'white' ? 'text-white/90' : 'text-stone-700'}`}
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
                                className={`flex-[0_0_80%] md:flex-[0_0_55%] lg:flex-[0_0_40%] min-w-0 px-4 transition-all duration-300 ${selectedIndex === index ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                                    }`}
                            >
                                <div
                                    className={`relative bg-white shadow-2xl mx-auto transition-shadow duration-300 ${selectedIndex === index ? 'shadow-2xl shadow-black/50' : 'shadow-lg'
                                        }`}
                                    style={{ aspectRatio: '8.5/11' }}
                                >
                                    <img src={page.image} alt={page.title} className="w-full h-full object-contain" />

                                    {/* MENU 1: Bebidas - White */}
                                    {page.id === 1 && (
                                        <div className="absolute inset-0">
                                            {bebidasItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                        </div>
                                    )}

                                    {/* MENU 2: Snacks, Papas, Tortas Veg */}
                                    {page.id === 2 && (
                                        <div className="absolute inset-0">
                                            {snacksItems.map(item => renderOverlay(item, 'bg-white', '18%'))}
                                            {papasItems.map(item => renderOverlay(item, 'bg-white', '18%'))}
                                            {tortasVegItems.map(item => renderOverlay(item, 'bg-[rgb(68,118,74)]', '20%', 'white'))}
                                        </div>
                                    )}

                                    {/* MENU 3: Hamburguesas, Carnes */}
                                    {page.id === 3 && (
                                        <div className="absolute inset-0">
                                            {hamburguesasItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                            {carnesItems.map(item => renderOverlay(item, 'bg-[rgb(192,111,54)]', '22%', 'white'))}
                                        </div>
                                    )}

                                    {/* MENU 4: Tacos, Tortas, Combos, Salsas */}
                                    {page.id === 4 && (
                                        <div className="absolute inset-0">
                                            {tacosItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                            {tortasCarnitaItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                            {combosItems.map(item => renderOverlay(item, 'bg-white', '22%'))}
                                            {salsasItems.map(item => renderOverlay(item, 'bg-white', '18%'))}
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
