import React from 'react';
import { Link } from 'react-router-dom';
import {
    MapPin,
    Instagram,
    Facebook,
    Star,
} from 'lucide-react';
import { TestimonialsSection } from '../../components/ui/testimonials-with-marquee';

const testimonials = [
    {
        author: {
            name: "María García",
            handle: "@mariagarcia",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
        },
        text: "¡Increíble sabor! Las hamburguesas son enormes y la carne tiene un sazón único. Definitivamente volveré."
    },
    {
        author: {
            name: "Carlos Mendoza",
            handle: "@carlosmendoza",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        text: "El mejor lugar para cenar con amigos. El servicio es rápido y la comida siempre está caliente y deliciosa."
    },
    {
        author: {
            name: "Ana Rodríguez",
            handle: "@anarodriguez",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
        },
        text: "Los tacos vegetarianos son una delicia. Por fin un lugar que entiende la comida sin carne. ¡Muy recomendado!"
    },
    {
        author: {
            name: "Roberto Sánchez",
            handle: "@robertosanchez",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        },
        text: "Vengo cada semana por mis boneless favoritos. El aderezo Lara's es adictivo. ¡5 estrellas siempre!"
    },
    {
        author: {
            name: "Laura Martínez",
            handle: "@lauramartinez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        text: "Las sincronizadas son perfectas para compartir. Ambiente familiar y precios justos. Mi lugar favorito."
    }
];

const HomePage: React.FC = () => {
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
                                <a href="#ubicacion" className="px-6 py-3 bg-white border-2 border-stone-200 text-stone-900 rounded-full font-bold text-xs tracking-wide hover:border-stone-900 hover:bg-stone-50 transition-all">
                                    UBICACIÓN
                                </a>
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
            <TestimonialsSection
                title="Lo que dicen de nosotros"
                description="Cientos de clientes satisfechos nos respaldan con sus experiencias"
                testimonials={testimonials}
                className="bg-amber-50"
            />

            {/* ===== MAP & INFO SECTION ===== */}
            <section id="ubicacion" className="h-[500px] w-full relative grid lg:grid-cols-3">
                <div className="bg-stone-900 text-white p-12 flex flex-col justify-center order-2 lg:order-1 col-span-1">
                    <MapPin className="h-10 w-10 text-amber-500 mb-6" />
                    <h2 className="text-3xl font-black mb-6">Visítanos</h2>
                    <div className="space-y-6 text-stone-300">
                        <div>
                            <h3 className="text-white font-bold mb-1 block">Dirección</h3>
                            <p>Calle Principal #123</p>
                            <p>Colonia Centro, Ciudad</p>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1 block">Horario</h3>
                            <p>Lunes - Domingo</p>
                            <p>9:00 AM - 11:00 PM</p>
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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14318.663558667634!2d-100.9942766!3d26.2072124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzI2LjAiTiAxMDDCsDU5JzM5LjQiVw!5e0!3m2!1sen!2smx!4v1635780000000!5m2!1sen!2smx"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        title="Ubicación LARAS"
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

                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-bold text-stone-800 mb-4 uppercase tracking-wider text-sm">Contacto</h4>
                            <ul className="space-y-2 text-stone-600 text-sm">
                                <li className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-amber-600" />
                                    <span>Calle Principal #123, Centro</span>
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
                                <li>Lunes - Viernes: 9:00 AM - 11:00 PM</li>
                                <li>Sábado - Domingo: 10:00 AM - 12:00 AM</li>
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
