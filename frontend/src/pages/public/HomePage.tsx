import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    MapPin,
    Instagram,
    Facebook,
    Star,
} from 'lucide-react';
import { scheduleService, Schedule } from '../../services/scheduleService';

// Helper to format time from "HH:mm" to "H:mm AM/PM"
const formatTime = (time?: string): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const HomePage: React.FC = () => {
    // Fetch schedules from API
    const { data: schedules = [] } = useQuery({
        queryKey: ['schedules', 'public'],
        queryFn: scheduleService.getPublicSchedule,
    });

    // Format schedules for display
    const formatScheduleDisplay = (schedule: Schedule): string => {
        if (schedule.isClosed) return 'Cerrado';
        return `${formatTime(schedule.openTime)} - ${formatTime(schedule.closeTime)}`;
    };

    return (
        <div className="font-sans antialiased text-stone-800">
            {/* ===== HERO SECTION ===== */}
            <section className="min-h-screen bg-white">
                <div className="grid lg:grid-cols-2 min-h-screen">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center p-8 lg:p-20 relative order-2 lg:order-1">
                        {/* Header in Hero */}
                        <header className="absolute top-0 left-0 w-full p-6 lg:p-10 flex items-center justify-between z-10">
                            <Link to="/" className="flex items-center">
                                <img src="/images/logo-black.png" alt="LARAS" className="h-[120px] w-[120px] object-contain" />
                            </Link>
                            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
                                <Link to="/" className="text-stone-900 border-b-2 border-amber-500">Inicio</Link>
                                <Link to="/menu" className="hover:text-amber-500 transition-colors">Menú</Link>
                                <Link to="/nosotros" className="hover:text-amber-500 transition-colors">Nosotros</Link>
                                <Link to="/contacto" className="hover:text-amber-500 transition-colors">Contacto</Link>
                            </nav>
                        </header>

                        <div className="max-w-lg mx-auto lg:mx-0 mt-28 lg:mt-28">
                            <span className="inline-block text-amber-500 font-bold tracking-widest text-[11px] uppercase mb-2">Comida Casual Mexicana</span>
                            <h1 className="text-3xl lg:text-5xl font-black text-stone-900 leading-[0.9] mb-5 tracking-tight">
                                Sabor que<br />
                                se siente en<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">cada bocado.</span>
                            </h1>
                            <p className="text-sm text-stone-500 mb-6 leading-relaxed max-w-sm">
                                Tacos, hamburguesas y especialidades preparadas con ingredientes frescos y el toque casero que nos distingue desde 2014.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link to="/menu" className="px-6 py-3 bg-stone-900 text-white rounded-full font-bold text-xs tracking-wide hover:bg-amber-500 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-stone-900/20">
                                    VER MENÚ
                                </Link>
                                <Link to="/contacto" className="px-6 py-3 bg-white border-2 border-stone-200 text-stone-900 rounded-full font-bold text-xs tracking-wide hover:border-stone-900 hover:bg-stone-50 transition-all">
                                    ORDENAR AHORA
                                </Link>
                            </div>

                            <div className="mt-12 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-200 overflow-hidden">
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold">+1k</div>
                                </div>
                                <div>
                                    <div className="flex gap-0.5 text-amber-500 mb-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <p className="text-[10px] font-bold text-stone-900">Clientes felices</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-[50vh] lg:h-screen w-full order-1 lg:order-2 bg-stone-900 flex items-center justify-center overflow-hidden">
                        <img
                            src="/images/food/hero.png"
                            alt="Hero Food"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS (Marquee) ===== */}
            <section className="py-24 bg-amber-50 overflow-hidden">
                <div className="container mx-auto px-5 mb-16 text-center">
                    <h2 className="text-3xl font-black text-stone-900 mb-4">Lo que dicen de nosotros</h2>
                </div>

                <div className="relative w-full">
                    <div className="flex animate-scroll hover:[animation-play-state:paused] whitespace-nowrap gap-8 w-max pl-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-[350px] lg:w-[450px] bg-white p-8 rounded-none border-l-4 border-amber-500 shadow-sm flex-shrink-0 whitespace-normal">
                                <div className="flex gap-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                                </div>
                                <p className="text-lg font-medium text-stone-800 mb-4 text-pretty leading-relaxed">
                                    "{i % 2 === 0 ? "¡Increíble sabor! Las hamburguesas son enormes y la carne tiene un sazón único. Definitivamente volveré." : "El mejor lugar para cenar con amigos. El servicio es rápido y la comida siempre está caliente y deliciosa."}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-stone-200 rounded-full overflow-hidden"></div>
                                    <div>
                                        <div className="font-bold text-stone-900 text-sm">Cliente Feliz {i + 1}</div>
                                        <div className="text-stone-400 text-xs">Hace 2 días</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== MAP & INFO SECTION ===== */}
            <section className="h-[500px] w-full relative grid lg:grid-cols-3">
                <div className="bg-stone-900 text-white p-12 flex flex-col justify-center order-2 lg:order-1 col-span-1">
                    <MapPin className="h-10 w-10 text-amber-500 mb-6" />
                    <h2 className="text-3xl font-black mb-6">Visítanos</h2>
                    <div className="space-y-6 text-stone-300">
                        <div>
                            <h3 className="text-white font-bold mb-1 block">Dirección</h3>
                            <p>Simón Bolívar y Cabrera</p>
                            <p>67510 Montemorelos, N.L.</p>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1 block">Horario</h3>
                            {schedules.length > 0 ? (
                                schedules.map((schedule) => (
                                    <p key={schedule.id}>
                                        {schedule.displayDays}: {formatScheduleDisplay(schedule)}
                                    </p>
                                ))
                            ) : (
                                <p>Cargando horarios...</p>
                            )}
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1 block">Contacto</h3>
                            <p>+52 (123) 456-7890</p>
                            <p>hola@laras.mx</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-2 relative order-1 lg:order-2 bg-stone-200">
                    <iframe
                        src="https://maps.google.com/maps?q=Sim%C3%B3n+Bol%C3%ADvar+y+Cabrera,+67510+Montemorelos,+N.L.,+Mexico&t=&z=17&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación LARAS - Montemorelos"
                        className="filter grayscale hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="bg-amber-50 text-stone-800 pt-36 pb-12">
                <div className="container mx-auto px-5">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        {/* Logo & Description */}
                        <div className="md:col-span-1">
                            <img src="/images/logo-black.png" alt="LARAS" className="h-16 w-16 object-contain mb-4" />
                            <p className="text-stone-600 text-sm leading-relaxed">
                                Comida casual mexicana preparada con ingredientes frescos y el toque casero que nos distingue desde 2014.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold text-stone-800 mb-4 uppercase tracking-wider text-sm">Navegación</h4>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-stone-600 hover:text-amber-600 transition-colors text-sm">Inicio</Link></li>
                                <li><Link to="/menu" className="text-stone-600 hover:text-amber-600 transition-colors text-sm">Menú</Link></li>
                                <li><Link to="/nosotros" className="text-stone-600 hover:text-amber-600 transition-colors text-sm">Nosotros</Link></li>
                                <li><Link to="/contacto" className="text-stone-600 hover:text-amber-600 transition-colors text-sm">Contacto</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-bold text-stone-800 mb-4 uppercase tracking-wider text-sm">Contacto</h4>
                            <ul className="space-y-2 text-stone-600 text-sm">
                                <li className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-amber-600" />
                                    <span>Simón Bolívar y Cabrera, Montemorelos</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-amber-600">📞</span>
                                    <span>+52 (123) 456-7890</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-amber-600">✉️</span>
                                    <span>hola@laras.mx</span>
                                </li>
                            </ul>
                        </div>

                        {/* Hours & Social */}
                        <div>
                            <h4 className="font-bold text-stone-800 mb-4 uppercase tracking-wider text-sm">Horarios</h4>
                            <ul className="space-y-1 text-stone-600 text-sm mb-6">
                                {schedules.map((schedule) => (
                                    <li key={schedule.id}>
                                        {schedule.displayDays}: {formatScheduleDisplay(schedule)}
                                    </li>
                                ))}
                            </ul>
                            <h4 className="font-bold text-stone-800 mb-3 uppercase tracking-wider text-sm">Síguenos</h4>
                            <div className="flex gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-amber-500 hover:text-white transition-all">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-amber-500 hover:text-white transition-all">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-amber-200 pt-8">
                        <p className="text-stone-500 text-sm text-center">
                            © 2024 LARAS Restaurant. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
