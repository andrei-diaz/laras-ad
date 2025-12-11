import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    MapPin,
    Instagram,
    Facebook,
    Star,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { TestimonialsSection } from '../../components/ui/testimonials-with-marquee';
import heroSlideService, { HeroSlide } from '../../services/heroSlideService';

// Fallback testimonials in case Google API fails
const fallbackTestimonials = [
    {
        author: {
            name: "María García",
            handle: "@google",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
        },
        text: "¡Increíble sabor! Las hamburguesas son enormes y la carne tiene un sazón único. Definitivamente volveré.",
        rating: 5
    },
    {
        author: {
            name: "Carlos Mendoza",
            handle: "@google",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        text: "El mejor lugar para cenar con amigos. El servicio es rápido y la comida siempre está caliente y deliciosa.",
        rating: 5
    },
    {
        author: {
            name: "Ana Rodríguez",
            handle: "@google",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
        },
        text: "Los tacos vegetarianos son una delicia. Por fin un lugar que entiende la comida sin carne. ¡Muy recomendado!",
        rating: 4
    },
    {
        author: {
            name: "Roberto Sánchez",
            handle: "@google",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        },
        text: "Vengo cada semana por mis boneless favoritos. El aderezo Lara's es adictivo. ¡5 estrellas siempre!",
        rating: 5
    },
    {
        author: {
            name: "Laura Martínez",
            handle: "@google",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        text: "Las sincronizadas son perfectas para compartir. Ambiente familiar y precios justos. Mi lugar favorito.",
        rating: 5
    }
];

interface GoogleReview {
    authorName: string;
    authorPhotoUrl: string;
    rating: number;
    text: string;
    relativeTimeDescription: string;
}

interface GooglePlaceInfo {
    rating: number;
    totalReviews: number;
    reviews: GoogleReview[];
}

const HomePage: React.FC = () => {
    const [testimonials, setTestimonials] = useState(fallbackTestimonials);
    const [placeInfo, setPlaceInfo] = useState({ rating: 4.5, totalReviews: 100 });
    const [schedules, setSchedules] = useState<{ label: string; openTime: string; closeTime: string }[]>([]);
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchGooglePlaceInfo = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/google-place-info');
                if (!response.ok) throw new Error('Failed to fetch');

                const info: GooglePlaceInfo = await response.json();

                // Set rating and total reviews
                if (info.rating && info.totalReviews) {
                    setPlaceInfo({ rating: info.rating, totalReviews: info.totalReviews });
                }

                if (info.reviews && info.reviews.length > 0) {
                    const mappedReviews = info.reviews
                        .filter((review) => review.rating >= 4) // Only show 4+ star reviews
                        .map((review) => ({
                            author: {
                                name: review.authorName || 'Cliente',
                                handle: review.relativeTimeDescription || '@google',
                                avatar: review.authorPhotoUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
                            },
                            text: review.text || '',
                            rating: review.rating || 5
                        }));

                    if (mappedReviews.length > 0) {
                        setTestimonials(mappedReviews);
                    }
                }
            } catch (error) {
                console.log('Using fallback testimonials');
            }
        };

        const fetchSchedule = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/schedule');
                if (!response.ok) throw new Error('Failed to fetch schedule');
                const data = await response.json();
                if (data && data.length > 0) {
                    const formattedSchedules = data.map((s: { displayDays: string; openTime: string; closeTime: string }) => ({
                        label: s.displayDays,
                        openTime: s.openTime.substring(0, 5), // Remove seconds
                        closeTime: s.closeTime.substring(0, 5) // Remove seconds
                    }));
                    setSchedules(formattedSchedules);
                }
            } catch (error) {
                console.log('Using default schedule');
            }
        };

        fetchGooglePlaceInfo();
        fetchSchedule();

        // Fetch hero slides
        const fetchHeroSlides = async () => {
            try {
                const slides = await heroSlideService.getActiveSlides();
                if (slides && slides.length > 0) {
                    setHeroSlides(slides);
                }
            } catch (error) {
                console.log('Using default hero image');
            }
        };
        fetchHeroSlides();
    }, []);

    // Auto-rotate carousel
    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        }, 10000); // Change every 4 seconds
        return () => clearInterval(interval);
    }, [heroSlides.length]);

    const goToPrevSlide = useCallback(() => {
        setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
    }, [heroSlides.length]);

    const goToNextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, [heroSlides.length]);

    return (
        <div className="font-sans antialiased text-stone-800">
            {/* ===== HERO SECTION ===== */}
            <section className="min-h-screen bg-white">
                <div className="grid lg:grid-cols-2 min-h-screen">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center p-8 lg:p-20 relative order-2 lg:order-1">
                        {/* Logo and Navigation */}
                        <header className="absolute top-0 left-0 right-0 p-6 lg:p-10 z-10 flex items-center justify-between">
                            <Link to="/" className="flex items-center">
                                <img src="/images/logo-black.png" alt="LARAS" className="h-[100px] w-[100px] object-contain" />
                            </Link>
                            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-900">
                                <Link to="/" className="border-b-2 border-amber-500 hover:text-amber-500 transition-colors">Inicio</Link>
                                <Link to="/menu" className="hover:text-amber-500 transition-colors">Menú</Link>
                                <a href="#ubicacion" className="hover:text-amber-500 transition-colors">Contacto</a>
                            </nav>
                        </header>

                        <div className="max-w-lg mx-auto lg:mx-0 mt-28 lg:mt-28">
                            <span className="inline-block text-amber-500 font-bold tracking-widest text-xs uppercase mb-3">Tortas, hamburguesas, cárnicas y vegetarianas</span>
                            <h1 className="text-4xl lg:text-6xl font-black text-stone-900 leading-[0.95] mb-6 tracking-tight">
                                Sabor que<br />
                                se siente en<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">cada bocado.</span>
                            </h1>
                            <p className="text-base text-stone-500 mb-8 leading-relaxed max-w-md">
                                Tortas, hamburguesas, tacos y especialidades preparadas con ingredientes frescos y el toque casero que nos distingue desde 2014.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link to="/menu" className="inline-flex items-center justify-center px-8 py-3.5 bg-stone-900 text-white rounded-full font-bold text-sm tracking-wide hover:bg-amber-500 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-stone-900/20">
                                    VER MENÚ
                                </Link>
                                <a href="#ubicacion" className="inline-flex items-center justify-center px-8 py-3.5 bg-white border-2 border-stone-200 text-stone-900 rounded-full font-bold text-sm tracking-wide hover:border-stone-900 hover:bg-stone-50 transition-all">
                                    ORDENAR
                                </a>
                            </div>

                            <div className="mt-12 flex items-center gap-8">
                                <div className="flex -space-x-3">
                                    {testimonials.slice(0, 4).map((testimonial, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-amber-500 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                                            {testimonial.author.avatar ? (
                                                <img
                                                    src={testimonial.author.avatar}
                                                    alt={testimonial.author.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                            ) : null}
                                            <span className={testimonial.author.avatar ? 'hidden' : ''}>
                                                {testimonial.author.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                                        +{placeInfo.totalReviews}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-1 text-amber-500 mb-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i <= Math.round(placeInfo.rating) ? 'fill-current' : 'fill-gray-200 text-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm font-bold text-stone-900">
                                        {placeInfo.rating.toFixed(1)} · {placeInfo.totalReviews} reseñas
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image - Carousel */}
                    <div className="relative h-[50vh] lg:h-screen w-full order-1 lg:order-2 bg-stone-900 overflow-hidden">


                        {/* Carousel Images */}
                        {heroSlides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                            >
                                {slide.linkUrl ? (
                                    <Link to={slide.linkUrl} className="block h-full w-full">
                                        <img
                                            src={slide.imageUrl}
                                            alt={slide.title || 'Hero'}
                                            className="h-full w-full object-contain"
                                        />
                                    </Link>
                                ) : (
                                    <img
                                        src={slide.imageUrl}
                                        alt={slide.title || 'Hero'}
                                        className="h-full w-full object-contain"
                                    />
                                )}
                                {/* Overlay text if title exists */}
                                {slide.title && (
                                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                                        <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tight">{slide.title}</h2>
                                        {slide.subtitle && (
                                            <p className="text-xl text-white/80 italic">{slide.subtitle}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Carousel Controls */}
                        {heroSlides.length > 1 && (
                            <>
                                <button
                                    onClick={goToPrevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/30 rounded-full text-white transition-all backdrop-blur-sm"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={goToNextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/30 rounded-full text-white transition-all backdrop-blur-sm"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>

                                {/* Dots */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                    {heroSlides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
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
            <section id="ubicacion" className="min-h-[500px] w-full relative grid lg:grid-cols-3">
                <div className="bg-stone-900 text-white p-12 flex flex-col justify-center order-2 lg:order-1 col-span-1">
                    <MapPin className="h-10 w-10 text-amber-500 mb-6" />
                    <h2 className="text-3xl font-black mb-6">Visítanos</h2>
                    <div className="space-y-6 text-stone-300">
                        <div>
                            <h3 className="text-white font-bold mb-1 block">Dirección</h3>
                            <p>Simon Bolivar y Cabrera</p>
                            <p>67510 Montemorelos, N.L.</p>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1 block">Horario</h3>
                            {schedules.length > 0 ? (
                                schedules.map((schedule, index) => (
                                    <p key={index}>{schedule.label}: {schedule.openTime} - {schedule.closeTime}</p>
                                ))
                            ) : (
                                <>
                                    <p>Lunes - Domingo</p>
                                    <p>9:00 AM - 11:00 PM</p>
                                </>
                            )}
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1 block">Contacto</h3>
                            <p>826 267 3165</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-2 relative order-1 lg:order-2 bg-stone-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.8!2d-99.8267!3d25.1892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x867cd6e27f5c25d7%3A0xbf6db32585a66d6b!2sLara&#39;s%20Montemorelos!5e0!3m2!1sen!2smx!4v1702248600000!5m2!1sen!2smx"
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
                            <a href="#ubicacion" className="hover:opacity-70 transition-opacity">Contacto</a>
                        </div>
                    </div>
                </div >

                {/* Bottom Section with full-height dividers */}
                < div className="flex flex-col lg:flex-row" >
                    {/* Logo + Tagline */}
                    < div className="flex-1 flex items-center gap-6 px-8 py-10 lg:border-r border-white/20" >
                        <img src="/images/3d-logo.png" alt="LARAS" className="h-20 w-20 object-contain" />
                        <div className="border-l border-white/30 pl-6">
                            <p className="text-base uppercase tracking-widest font-medium">Tortas, hamburguesas,</p>
                            <p className="text-base uppercase tracking-widest font-medium">cárnicas y vegetarianas</p>
                        </div>
                    </div >

                    {/* Social Links */}
                    < div className="flex items-center gap-6 px-12 py-10 lg:border-r border-white/20" >
                        <a href="https://www.instagram.com/laras.__/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="https://www.facebook.com/larasaurez/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Facebook className="w-6 h-6" />
                        </a>
                    </div >

                    {/* Copyright */}
                    < div className="flex items-center px-8 py-10" >
                        <p className="text-sm opacity-60">
                            2025 Lara's Montemorelos. Todos los derechos reservados.
                        </p>
                    </div >
                </div >
            </footer >
        </div >
    );
};

export default HomePage;
