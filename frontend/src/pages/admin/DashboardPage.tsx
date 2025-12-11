import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import {
    Clock,
    Image,
    FileImage,
    Settings,
    TrendingUp,
    Calendar,
    Sparkles,
    ArrowRight,
} from 'lucide-react';

interface RestaurantStatus {
    isOpen: boolean;
    statusMessage: string;
    nextStatusChange?: string;
}

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [status, setStatus] = useState<RestaurantStatus | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Fetch restaurant status
        fetch('http://localhost:8080/api/schedule/status')
            .then(res => res.json())
            .then(data => setStatus(data))
            .catch(() => setStatus(null));

        // Update time every minute
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const greeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return '¡Buenos días';
        if (hour < 18) return '¡Buenas tardes';
        return '¡Buenas noches';
    };

    const stats = [
        {
            label: 'Hero Slides',
            value: '3',
            description: 'Activos',
            icon: Image,
            color: 'from-blue-500 to-blue-600',
            bgLight: 'bg-blue-50',
            href: '/admin/hero-slides'
        },
        {
            label: 'Plantilla Menú',
            value: '52',
            description: 'Items configurados',
            icon: FileImage,
            color: 'from-purple-500 to-purple-600',
            bgLight: 'bg-purple-50',
            href: '/admin/menu-template'
        },
        {
            label: 'Horarios',
            value: '4',
            description: 'Configurados',
            icon: Clock,
            color: 'from-amber-500 to-orange-500',
            bgLight: 'bg-amber-50',
            href: '/admin/schedule'
        },
    ];

    const quickActions = [
        {
            label: 'Gestionar Carrusel',
            description: 'Edita las imágenes del hero',
            icon: Image,
            href: '/admin/hero-slides',
            color: 'bg-blue-500 hover:bg-blue-600'
        },
        {
            label: 'Editar Menú',
            description: 'Actualiza los items del menú',
            icon: FileImage,
            href: '/admin/menu-template',
            color: 'bg-purple-500 hover:bg-purple-600'
        },
        {
            label: 'Ver Horarios',
            description: 'Configura horarios de apertura',
            icon: Clock,
            href: '/admin/schedule',
            color: 'bg-amber-500 hover:bg-amber-600'
        },
        {
            label: 'Configuración',
            description: 'Ajustes del sistema',
            icon: Settings,
            href: '/admin/settings',
            color: 'bg-stone-500 hover:bg-stone-600'
        },
    ];

    return (
        <AdminLayout>
            {/* Welcome Header */}
            <div className="mb-8">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-stone-900 mb-1">
                            {greeting()}, {user?.username}!
                        </h1>
                        <p className="text-muted-foreground">
                            {currentTime.toLocaleDateString('es-MX', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    {status && (
                        <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${status.isOpen || status.statusMessage?.includes('Abierto')
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}>
                            <span className={`w-2 h-2 rounded-full animate-pulse ${status.isOpen || status.statusMessage?.includes('Abierto')
                                ? 'bg-green-500'
                                : 'bg-red-500'
                                }`}></span>
                            <span className="font-medium text-sm">{status.statusMessage}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        to={stat.href}
                        className="group bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <TrendingUp className="h-5 w-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-4xl font-black text-stone-900 mb-1">{stat.value}</p>
                        <p className="text-sm font-medium text-stone-700">{stat.label}</p>
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-border p-6 mb-8">
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <h3 className="text-lg font-bold">Acciones rápidas</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.label}
                            to={action.href}
                            className="group relative overflow-hidden rounded-xl border border-border p-5 hover:border-transparent hover:shadow-lg transition-all duration-300"
                        >
                            <div className={`absolute inset-0 ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className="relative z-10">
                                <action.icon className="h-8 w-8 text-primary group-hover:text-white mb-3 transition-colors" />
                                <p className="font-semibold text-stone-900 group-hover:text-white transition-colors">{action.label}</p>
                                <p className="text-xs text-muted-foreground group-hover:text-white/80 mt-1 transition-colors">{action.description}</p>
                                <ArrowRight className="h-4 w-4 text-primary group-hover:text-white absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                        <Calendar className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-stone-900 mb-1">Tip del día</h4>
                        <p className="text-sm text-stone-600">
                            Mantén tu menú actualizado con imágenes atractivas y descripciones claras.
                            Los clientes aprecian saber exactamente qué esperar antes de ordenar.
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
