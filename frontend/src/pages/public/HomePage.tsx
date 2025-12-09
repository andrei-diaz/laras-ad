import React from 'react';
import { Link } from 'react-router-dom';
import {
    MapPin,
    Phone,
    Clock,
    Instagram,
    Facebook,
    ChevronRight,
    Star,
    Utensils,
    Calendar
} from 'lucide-react';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        LARAS
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#inicio" className="text-foreground/80 hover:text-primary transition-colors">Inicio</a>
                        <a href="#menu" className="text-foreground/80 hover:text-primary transition-colors">Menú</a>
                        <a href="#promociones" className="text-foreground/80 hover:text-primary transition-colors">Promociones</a>
                        <a href="#nosotros" className="text-foreground/80 hover:text-primary transition-colors">Nosotros</a>
                        <a href="#contacto" className="text-foreground/80 hover:text-primary transition-colors">Contacto</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="text-green-500 font-medium">Abierto</span>
                        </div>
                        <a href="tel:+521234567890" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                            Ordenar
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-16">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="relative container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Bienvenidos a <span className="text-primary">LARAS</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                        Donde cada platillo cuenta una historia. Disfruta de la mejor comida casual en un ambiente único.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#menu" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
                            Ver Menú
                        </a>
                        <a href="#contacto" className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                            Contáctanos
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronRight className="h-8 w-8 rotate-90 text-primary" />
                </div>
            </section>

            {/* Status Banner */}
            <section className="bg-primary text-primary-foreground py-4">
                <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>Lun - Sáb: 9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>Calle Principal #123, Ciudad</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        <span>+52 (123) 456-7890</span>
                    </div>
                </div>
            </section>

            {/* Featured Dishes / Menu Preview */}
            <section id="menu" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Nuestro Menú</h2>
                        <p className="text-foreground/70 max-w-xl mx-auto">
                            Descubre nuestros platillos favoritos, preparados con ingredientes frescos y mucho amor.
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex justify-center gap-4 mb-8 flex-wrap">
                        {['Todos', 'Entradas', 'Platos Fuertes', 'Postres', 'Bebidas'].map((cat) => (
                            <button
                                key={cat}
                                className="px-6 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Dishes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                                <div className="h-48 bg-muted relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <Utensils className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-muted-foreground" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-semibold mb-2">Platillo Especial {i}</h3>
                                    <p className="text-foreground/60 text-sm mb-3">Deliciosa descripción del platillo con ingredientes frescos.</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-primary">$99.00</span>
                                        <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                                            Ordenar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                            Ver menú completo <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Promotions */}
            <section id="promociones" className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Promociones</h2>
                        <p className="text-foreground/70 max-w-xl mx-auto">
                            No te pierdas nuestras ofertas especiales y descuentos exclusivos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-6 text-primary-foreground overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <Calendar className="h-10 w-10 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Promoción Especial {i}</h3>
                                <p className="text-primary-foreground/80 mb-4">
                                    Descripción de la promoción con todos los detalles importantes.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Válido hasta 31/12</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section id="nosotros" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Sobre Nosotros</h2>
                            <p className="text-foreground/70 text-lg mb-6">
                                En LARAS, nos dedicamos a ofrecer una experiencia gastronómica única.
                                Desde nuestros inicios, hemos mantenido el compromiso de servir platillos
                                de calidad en un ambiente acogedor y familiar.
                            </p>
                            <p className="text-foreground/70 text-lg mb-8">
                                Cada ingrediente es seleccionado cuidadosamente para garantizar
                                el mejor sabor en cada bocado. Te invitamos a ser parte de nuestra historia.
                            </p>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">10+</div>
                                    <div className="text-sm text-foreground/60">Años de experiencia</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">50+</div>
                                    <div className="text-sm text-foreground/60">Platillos únicos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">1000+</div>
                                    <div className="text-sm text-foreground/60">Clientes felices</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-primary/20 rounded-2xl h-80 flex items-center justify-center">
                                <span className="text-6xl">🍽️</span>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 fill-current" />
                                    <span className="text-2xl font-bold">4.9</span>
                                </div>
                                <div className="text-sm">+500 reseñas</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Lo Que Dicen Nuestros Clientes</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'María García', text: 'La mejor comida de la ciudad. El ambiente es increíble y el servicio es excelente.' },
                            { name: 'Juan López', text: 'Siempre vuelvo por sus platillos especiales. ¡Los recomiendo totalmente!' },
                            { name: 'Ana Martínez', text: 'Un lugar perfecto para disfrutar en familia. Los precios son muy accesibles.' },
                        ].map((review, i) => (
                            <div key={i} className="bg-card p-6 rounded-xl border border-border">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className="h-5 w-5 text-yellow-500 fill-current" />
                                    ))}
                                </div>
                                <p className="text-foreground/70 mb-4 italic">"{review.text}"</p>
                                <div className="font-semibold">{review.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / Location */}
            <section id="contacto" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Contáctanos</h2>
                            <p className="text-foreground/70 mb-8">
                                ¿Tienes alguna pregunta o comentario? Nos encantaría escucharte.
                            </p>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Teléfono (opcional)"
                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <textarea
                                    placeholder="Tu mensaje..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                        <div>
                            <div className="bg-card rounded-xl p-6 border border-border h-full">
                                <h3 className="text-xl font-semibold mb-6">Encuéntranos</h3>
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-primary mt-1" />
                                        <div>
                                            <div className="font-medium">Dirección</div>
                                            <div className="text-foreground/60">Calle Principal #123, Colonia Centro, Ciudad, CP 12345</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-primary mt-1" />
                                        <div>
                                            <div className="font-medium">Teléfono</div>
                                            <div className="text-foreground/60">+52 (123) 456-7890</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-primary mt-1" />
                                        <div>
                                            <div className="font-medium">Horario</div>
                                            <div className="text-foreground/60">Lun - Sáb: 9:00 AM - 9:00 PM</div>
                                            <div className="text-foreground/60">Dom: 10:00 AM - 6:00 PM</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Map placeholder */}
                                <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                                    <MapPin className="h-12 w-12 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-foreground text-background py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold text-primary mb-4">LARAS</div>
                            <p className="text-background/60">
                                Tu lugar favorito para disfrutar de la mejor comida casual.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Enlaces</h4>
                            <div className="space-y-2 text-background/60">
                                <a href="#inicio" className="block hover:text-primary">Inicio</a>
                                <a href="#menu" className="block hover:text-primary">Menú</a>
                                <a href="#promociones" className="block hover:text-primary">Promociones</a>
                                <a href="#nosotros" className="block hover:text-primary">Nosotros</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contacto</h4>
                            <div className="space-y-2 text-background/60">
                                <div>+52 (123) 456-7890</div>
                                <div>info@laras.com</div>
                                <div>Calle Principal #123</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Síguenos</h4>
                            <div className="flex gap-4">
                                <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-primary transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-primary transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-background/20 pt-8 text-center text-background/60">
                        <p>© 2024 LARAS Restaurant. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
