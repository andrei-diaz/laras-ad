import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// ===== MENU DATA FOR BEBIDAS Y AGUAS (Menu-1) =====
const bebidasItems = [
    {
        id: 'licuados',
        name: 'LICUADOS',
        description: 'Fresa, mango, guanábana o mix berrie, plátanos, melón, papaya, chocomilk.',
        priceHalf: 50,
        priceFull: 70,
        top: '14%',
        left: '5%',
        minHeight: '9%',
    },
    {
        id: 'smoothies',
        name: 'SMOOTHIES',
        description: 'Mango, piña con mango y chamoy, plátano, fresa, mix berrie o piña natural.',
        priceHalf: 55,
        priceFull: 75,
        top: '23%',
        left: '5%',
    },
    {
        id: 'sodas',
        name: 'SODAS',
        description: 'Coca Cola, Coca Cola Light, Fanta, Manzana, Sangría, Sprite y Ponche.',
        price: 27,
        top: '32%',
        left: '5%',
    },
    {
        id: 'agua-frutas',
        name: 'AGUA DE FRUTAS',
        description: 'Piña, melón, mango, fresa, papaya, pepino con limón, limonada o guanábana.',
        priceHalf: 45,
        priceFull: 58,
        top: '40%',
        left: '5%',
    },
    {
        id: 'chocolate',
        name: 'CHOCOLATE',
        description: 'Chocolate caliente con bombones.',
        priceHalf: 45,
        top: '49.9%',
        left: '5%',
        minHeight: '6%',
    },
    {
        id: 'frappe',
        name: 'FRAPPÉ',
        description: 'Capuchino Moka',
        price: 50,
        top: '57%',
        left: '5%',
    },
    {
        id: 'mangonada-frappe',
        name: 'MANGONADA FRAPPÉ',
        description: 'Mango, chamoy, chile en polvo y varita de tamarindo',
        priceHalf: 55,
        priceFull: 75,
        top: '63.4%',
        left: '5%',
    },
    {
        id: 'cafe',
        name: 'CAFÉ',
        description: 'Estilo americano.',
        price: 25,
        top: '70.9%',
        left: '5%',
    },
];

// ===== MENU DATA FOR SNACKS & PAPAS (Menu-2) =====
const snacksItems = [
    {
        id: 'sandwich-turkey',
        name: 'SÁNDWICH TURKEY',
        description: 'Mayonesa, aguacate, tomate, lechuga, jamón de pavo, quesos.',
        price: 48,
        top: '5%',
        left: '2%',
    },
    {
        id: 'sandwich-veggie',
        name: 'SÁNDWICH VEGGIE',
        description: 'Mayonesa, aguacate, tomate, lechuga, bologna, quesos.',
        price: 55,
        top: '14%',
        left: '2%',
    },
    {
        id: 'sandwich-pollo',
        name: 'SÁNDWICH DE POLLO',
        description: 'Mayonesa, aguacate, tomate, lechuga, pechuga de pollo marinado especial, quesos.',
        price: 60,
        top: '23%',
        left: '2%',
    },
    {
        id: 'sincronizada-res',
        name: 'SINCRONIZADA DE RES/POLLO',
        description: 'Carne de res salteada con morrón y cebolla, quesos, tortilla de harina.',
        price: 99,
        top: '34%',
        left: '2%',
    },
    {
        id: 'sincronizada-veg',
        name: 'SINCRONIZADA VEGETARIANA',
        description: 'Fajita de gluten al jengibre salteada con morrón, cebolla, quesos, tortilla de harina.',
        price: 115,
        top: '45%',
        left: '2%',
    },
    {
        id: 'tenders',
        name: 'TENDERS',
        description: 'Pechuga de pollo, quesos, papas a la francesa incluye refresco.',
        price: 160,
        top: '56%',
        left: '2%',
    },
    {
        id: 'boneless-snack',
        name: 'BONELESS',
        description: 'Papas a la francesa, aderezo Ranch, zanahoria y Apio.',
        price: 125,
        top: '70%',
        left: '2%',
    },
];

const papasItems = [
    {
        id: 'papas',
        name: 'PAPAS',
        description: 'A la francesa naturales. A la francesa con queso y aderezo Laras.',
        priceNatural: 49,
        priceQueso: 60,
        top: '20%',
        left: '20%',
    },
    {
        id: 'beef-bowl',
        name: 'BEEF BOWL',
        description: 'Papas a la francesa con queso, aderezo Laras con carne.',
        price: 115,
        top: '30%',
        left: '20%',
    },
    {
        id: 'salchipapas',
        name: 'SALCHIPAPAS',
        description: 'Papas a la francesa con queso, aderezo Laras con salchicha veggie.',
        price: 120,
        top: '40%',
        left: '20%',
    },
    {
        id: 'boneless-bowl',
        name: 'BONELESS BOWL',
        description: 'Papas a la francesa con queso, aderezo Laras, boneless bañados en salsa búfalo.',
        price: 140,
        top: '50%',
        left: '20%',
    },
    {
        id: 'chicken-bowl',
        name: 'CHICKEN BOWL',
        description: 'Papas a la francesa con queso, aderezo Laras con pollo.',
        price: 115,
        top: '60%',
        left: '20%',
    },
];

const tortasItems = [
    {
        id: 'milanesa-enchilado',
        name: 'MILANESA DE GLUTEN ENCHILADO',
        description: 'Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.',
        price: 115,
        top: '42%',
        left: '55%',
    },
    {
        id: 'milanesa-empanizado',
        name: 'MILANESA DE GLUTEN EMPANIZADO',
        description: 'Mayonesa, tomate, aguacate, quesos, lechuga y aderezo Laras.',
        price: 115,
        top: '42%',
        left: '75%',
    },
    {
        id: 'fajita-gluten',
        name: 'FAJITA DE GLUTEN AL JENGIBRE',
        description: 'Mayonesa, tomate, morrón, cebolla, aguacate, quesos, lechuga y aderezo Laras.',
        price: 115,
        top: '60%',
        left: '55%',
    },
    {
        id: 'gluten-pastor',
        name: 'GLUTEN AL PASTOR',
        description: 'Trocitos de piña, mayonesa, tomate, aguacate, queso, aderezo Laras y cebolla.',
        price: 115,
        top: '75%',
        left: '55%',
    },
];

const MenuPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-stone-100">
            {/* Header */}
            <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
                <div className="container mx-auto px-5 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Volver</span>
                    </Link>
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/images/logo-black.png" alt="LARAS" className="h-8 w-8 object-contain" />
                        <span className="text-xl font-bold tracking-tight">LARAS</span>
                    </Link>
                    <div className="w-20" />
                </div>
            </header>

            {/* Menu Title */}
            <div className="bg-stone-900 text-white py-8 text-center">
                <h1 className="text-4xl font-black tracking-tight">Nuestro Menú</h1>
                <p className="text-stone-400 mt-2">Bebidas y Aguas</p>
            </div>

            {/* Menu Container */}
            <div className="container mx-auto px-5 py-10">
                {/* Menu-1: Bebidas y Aguas */}
                <div
                    className="relative w-full max-w-4xl mx-auto bg-white shadow-2xl"
                    style={{ aspectRatio: '8.5/11' }}
                >
                    <img
                        src="/images/menu-1.png"
                        alt="Menú Bebidas y Aguas"
                        className="w-full h-full object-contain"
                    />

                    {/* Dynamic Text Overlays */}
                    <div className="absolute inset-0">
                        {bebidasItems.map((item) => (
                            <div
                                key={item.id}
                                className="absolute bg-white px-1.5 py-0.5"
                                style={{
                                    top: item.top,
                                    left: item.left,
                                    width: '22%',
                                    minHeight: (item as any).minHeight || 'auto',
                                }}
                            >
                                <h3 className="font-black text-sm text-stone-900 uppercase tracking-wide">
                                    {item.name}
                                </h3>
                                <p className="text-[10px] text-stone-600 leading-tight mt-0.5">
                                    {item.description}
                                </p>
                                <div className="text-[10px] text-stone-800 mt-1 font-medium">
                                    {item.priceHalf && item.priceFull ? (
                                        <>1/2 litro ${item.priceHalf} &nbsp;&nbsp; 1 litro ${item.priceFull}</>
                                    ) : item.priceHalf ? (
                                        <>1/2 litro ${item.priceHalf}</>
                                    ) : (
                                        <>${item.price}</>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu-2: Snacks, Papas, Tortas Vegetarianas */}
                <h3 className="text-2xl font-bold text-center mt-16 mb-4">Snacks, Papas & Tortas</h3>
                <div
                    className="relative w-full max-w-4xl mx-auto bg-white shadow-2xl"
                    style={{ aspectRatio: '8.5/11' }}
                >
                    <img
                        src="/images/menu-2.png"
                        alt="Menú Snacks y Papas"
                        className="w-full h-full object-contain"
                    />

                    {/* Snacks Overlays - Pink */}
                    <div className="absolute inset-0">
                        {snacksItems.map((item) => (
                            <div
                                key={item.id}
                                className="absolute bg-pink-200/90 border border-pink-400 px-1.5 py-0.5"
                                style={{
                                    top: item.top,
                                    left: item.left,
                                    width: '18%',
                                }}
                            >
                                <h3 className="font-black text-[10px] text-stone-900 uppercase tracking-wide">
                                    {item.name}
                                </h3>
                                <p className="text-[8px] text-stone-600 leading-tight mt-0.5">
                                    {item.description}
                                </p>
                                <div className="text-[8px] text-stone-800 mt-0.5 font-medium">
                                    ${item.price}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Papas Overlays - Blue */}
                    <div className="absolute inset-0">
                        {papasItems.map((item) => (
                            <div
                                key={item.id}
                                className="absolute bg-blue-200/90 border border-blue-400 px-1.5 py-0.5"
                                style={{
                                    top: item.top,
                                    left: item.left,
                                    width: '18%',
                                }}
                            >
                                <h3 className="font-black text-[10px] text-stone-900 uppercase tracking-wide">
                                    {item.name}
                                </h3>
                                <p className="text-[8px] text-stone-600 leading-tight mt-0.5">
                                    {item.description}
                                </p>
                                <div className="text-[8px] text-stone-800 mt-0.5 font-medium">
                                    {(item as any).priceNatural ? (
                                        <>Naturales ${(item as any).priceNatural} &nbsp; Queso ${(item as any).priceQueso}</>
                                    ) : (
                                        <>${item.price}</>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tortas Overlays - Green */}
                    <div className="absolute inset-0">
                        {tortasItems.map((item) => (
                            <div
                                key={item.id}
                                className="absolute bg-green-200/90 border border-green-400 px-1.5 py-0.5"
                                style={{
                                    top: item.top,
                                    left: item.left,
                                    width: '18%',
                                }}
                            >
                                <h3 className="font-black text-[8px] text-stone-900 uppercase tracking-wide">
                                    {item.name}
                                </h3>
                                <p className="text-[7px] text-stone-600 leading-tight mt-0.5">
                                    {item.description}
                                </p>
                                <div className="text-[8px] text-stone-800 mt-0.5 font-medium">
                                    ${item.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center gap-4 mt-10">
                    <button className="px-6 py-3 bg-stone-900 text-white rounded-full font-bold text-sm">
                        Bebidas
                    </button>
                    <button className="px-6 py-3 bg-stone-200 text-stone-700 rounded-full font-medium text-sm hover:bg-stone-300 transition-colors">
                        Tacos
                    </button>
                    <button className="px-6 py-3 bg-stone-200 text-stone-700 rounded-full font-medium text-sm hover:bg-stone-300 transition-colors">
                        Hamburguesas
                    </button>
                    <button className="px-6 py-3 bg-stone-200 text-stone-700 rounded-full font-medium text-sm hover:bg-stone-300 transition-colors">
                        Hot Dogs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
