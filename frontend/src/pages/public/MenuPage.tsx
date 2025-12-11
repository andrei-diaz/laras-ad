import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Instagram, Facebook } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import menuTemplateService, { MenuTemplateItem } from '../../services/menuTemplateService';

// Menu pages configuration (reversed order: 4, 3, 2, 1)
const menuPages = [
    { id: 4, title: 'Combos', image: '/images/menu-4.png' },
    { id: 3, title: 'Tacos y Hamburguesas', image: '/images/menu-3.png' },
    { id: 2, title: 'Snacks y Papas', image: '/images/menu-2.png' },
    { id: 1, title: 'Bebidas y Aguas', image: '/images/menu-1.png' },
];

// Section configuration for styling
const sectionStyles: Record<string, { bgColor: string; textColor: string; defaultWidth: string }> = {
    'bebidas': { bgColor: 'bg-white', textColor: 'dark', defaultWidth: '22%' },
    'snacks': { bgColor: 'bg-white', textColor: 'dark', defaultWidth: '18%' },
    'papas': { bgColor: 'bg-white', textColor: 'dark', defaultWidth: '18%' },
    'tortas-veg': { bgColor: 'bg-[rgb(68,118,74)]', textColor: 'white', defaultWidth: '20%' },
    'hamburguesas': { bgColor: 'bg-white', textColor: 'dark', defaultWidth: '22%' },
    'carnes': { bgColor: 'bg-[rgb(192,111,54)]', textColor: 'white', defaultWidth: '22%' },
    'tacos': { bgColor: 'bg-white', textColor: 'dark', defaultWidth: '22%' },
    'tortas-carnita': { bgColor: 'bg-white', textColor: 'dark', defaultWidth: '22%' },
    'combos': { bgColor: 'bg-white', textColor: 'dark', defaultWidth: '22%' },
    'salsas': { bgColor: 'bg-white', textColor: 'dark', defaultWidth: '18%' },
};

const MenuPage: React.FC = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', containScroll: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [menuItems, setMenuItems] = useState<MenuTemplateItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch menu items from API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await menuTemplateService.getActiveItems();
                setMenuItems(items);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, []);

    // Group items by menuNumber and menuSection
    const getItemsByMenuAndSection = (menuNumber: number, section: string) => {
        return menuItems.filter(item => item.menuNumber === menuNumber && item.menuSection === section);
    };

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

    // Render overlay helper - uses MenuTemplateItem from API
    const renderOverlay = (item: MenuTemplateItem, sectionStyle: { bgColor: string; textColor: string; defaultWidth: string }) => {
        const bgColor = item.bgColor || sectionStyle.bgColor;
        const textColor = item.textColor || sectionStyle.textColor;
        const defaultWidth = sectionStyle.defaultWidth;

        return (
            <div
                key={item.id}
                className={`absolute ${bgColor} px-1 py-0.5`}
                style={{
                    top: item.positionTop || '0%',
                    left: item.positionLeft || '0%',
                    width: item.positionWidth || defaultWidth,
                    height: item.positionHeight || 'auto',
                    minHeight: item.minHeight || 'auto'
                }}
            >
                {/* Food icon - customize with iconSize */}
                {item.icon && (
                    <img
                        src={`/images/food-icons/${item.icon}.png`}
                        alt={item.icon}
                        className="absolute object-contain"
                        style={{
                            width: item.iconSize || '26px',
                            height: item.iconSize || '26px',
                            top: '1px',
                            right: '1px'
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
                        {item.description.split('\n').map((line: string, i: number, arr: string[]) => (
                            <span key={i}>
                                {line}
                                {i < arr.length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                )}
            </div>
        );
    };

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
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                )}
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

                                    {/* MENU 1: Bebidas */}
                                    {page.id === 1 && (
                                        <div className="absolute inset-0">
                                            {getItemsByMenuAndSection(1, 'bebidas').map(item =>
                                                renderOverlay(item, sectionStyles['bebidas'])
                                            )}
                                        </div>
                                    )}

                                    {/* MENU 2: Snacks, Papas, Tortas Veg */}
                                    {page.id === 2 && (
                                        <div className="absolute inset-0">
                                            {getItemsByMenuAndSection(2, 'snacks').map(item =>
                                                renderOverlay(item, sectionStyles['snacks'])
                                            )}
                                            {getItemsByMenuAndSection(2, 'papas').map(item =>
                                                renderOverlay(item, sectionStyles['papas'])
                                            )}
                                            {getItemsByMenuAndSection(2, 'tortas-veg').map(item =>
                                                renderOverlay(item, sectionStyles['tortas-veg'])
                                            )}
                                        </div>
                                    )}

                                    {/* MENU 3: Hamburguesas, Carnes */}
                                    {page.id === 3 && (
                                        <div className="absolute inset-0">
                                            {getItemsByMenuAndSection(3, 'hamburguesas').map(item =>
                                                renderOverlay(item, sectionStyles['hamburguesas'])
                                            )}
                                            {getItemsByMenuAndSection(3, 'carnes').map(item =>
                                                renderOverlay(item, sectionStyles['carnes'])
                                            )}
                                        </div>
                                    )}

                                    {/* MENU 4: Tacos, Tortas, Combos, Salsas */}
                                    {page.id === 4 && (
                                        <div className="absolute inset-0">
                                            {getItemsByMenuAndSection(4, 'tacos').map(item =>
                                                renderOverlay(item, sectionStyles['tacos'])
                                            )}
                                            {getItemsByMenuAndSection(4, 'tortas-carnita').map(item =>
                                                renderOverlay(item, sectionStyles['tortas-carnita'])
                                            )}
                                            {getItemsByMenuAndSection(4, 'combos').map(item =>
                                                renderOverlay(item, sectionStyles['combos'])
                                            )}
                                            {getItemsByMenuAndSection(4, 'salsas').map(item =>
                                                renderOverlay(item, sectionStyles['salsas'])
                                            )}
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
