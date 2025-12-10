import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { menuTemplateService, MenuTemplateItem } from '../../services/menuTemplateService';

// Style variants for different sections
const sectionStyles: Record<string, { bg: string; border: string }> = {
    bebidas: { bg: 'bg-white', border: '' },
    snacks: { bg: 'bg-pink-200/90', border: 'border border-pink-400' },
    papas: { bg: 'bg-blue-200/90', border: 'border border-blue-400' },
    tortas: { bg: 'bg-green-200/90', border: 'border border-green-400' },
};

const MenuItemOverlay: React.FC<{ item: MenuTemplateItem; variant?: string }> = ({ item, variant = 'default' }) => {
    const style = sectionStyles[item.menuSection] || sectionStyles.bebidas;
    const isSmall = ['snacks', 'papas', 'tortas'].includes(item.menuSection);

    return (
        <div
            className={`absolute ${style.bg} ${style.border} px-1.5 py-0.5`}
            style={{
                top: item.positionTop || '0%',
                left: item.positionLeft || '0%',
                width: item.positionWidth || (isSmall ? '18%' : '22%'),
                minHeight: item.minHeight || 'auto',
            }}
        >
            <h3 className={`font-black ${isSmall ? 'text-[10px]' : 'text-sm'} text-stone-900 uppercase tracking-wide`}>
                {item.name}
            </h3>
            {item.description && (
                <p className={`${isSmall ? 'text-[8px]' : 'text-[10px]'} text-stone-600 leading-tight mt-0.5`}>
                    {item.description}
                </p>
            )}
            <div className={`${isSmall ? 'text-[8px]' : 'text-[10px]'} text-stone-800 mt-0.5 font-medium`}>
                {renderPrice(item)}
            </div>
        </div>
    );
};

const renderPrice = (item: MenuTemplateItem) => {
    // Custom label prices (priceLabel1/price1, priceLabel2/price2)
    if (item.priceLabel1 && item.price1) {
        return (
            <>
                {item.priceLabel1} ${item.price1}
                {item.priceLabel2 && item.price2 && (
                    <>&nbsp;&nbsp;{item.priceLabel2} ${item.price2}</>
                )}
            </>
        );
    }

    // Half/Full liter prices
    if (item.priceHalf && item.priceFull) {
        return <>1/2 litro ${item.priceHalf} &nbsp;&nbsp; 1 litro ${item.priceFull}</>;
    }

    // Only half price
    if (item.priceHalf) {
        return <>1/2 litro ${item.priceHalf}</>;
    }

    // Single price
    if (item.price) {
        return <>${item.price}</>;
    }

    return null;
};

const MenuPage: React.FC = () => {
    // Fetch all active menu items
    const { data: menuItems = [], isLoading, error } = useQuery({
        queryKey: ['menuTemplate', 'public'],
        queryFn: menuTemplateService.getActiveItems,
    });

    // Group items by menu number
    const menu1Items = menuItems.filter(item => item.menuNumber === 1);
    const menu2Items = menuItems.filter(item => item.menuNumber === 2);

    // Further group menu 2 by section
    const snacksItems = menu2Items.filter(item => item.menuSection === 'snacks');
    const papasItems = menu2Items.filter(item => item.menuSection === 'papas');
    const tortasItems = menu2Items.filter(item => item.menuSection === 'tortas');

    if (isLoading) {
        return (
            <div className="min-h-screen bg-stone-100 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-stone-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-stone-100 flex items-center justify-center">
                <p className="text-red-600">Error al cargar el menú</p>
            </div>
        );
    }

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
                        {menu1Items.map((item) => (
                            <MenuItemOverlay key={item.id} item={item} />
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
                            <MenuItemOverlay key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Papas Overlays - Blue */}
                    <div className="absolute inset-0">
                        {papasItems.map((item) => (
                            <MenuItemOverlay key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Tortas Overlays - Green */}
                    <div className="absolute inset-0">
                        {tortasItems.map((item) => (
                            <MenuItemOverlay key={item.id} item={item} />
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
