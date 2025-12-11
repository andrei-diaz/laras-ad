import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Tag,
    Clock,
    MessageSquare,
    Settings,
    LogOut
} from 'lucide-react';

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
        { icon: Tag, label: 'Promociones', href: '/admin/promotions' },
        { icon: Clock, label: 'Horarios', href: '/admin/schedule' },
        { icon: MessageSquare, label: 'Mensajes', href: '/admin/messages' },
        { icon: Settings, label: 'Configuración', href: '/admin/settings' },
    ];

    const stats = [
        { label: 'Promociones', value: '0', description: 'Activas' },
        { label: 'Mensajes', value: '0', description: 'Sin leer' },
        { label: 'Horarios', value: '4', description: 'Configurados' },
    ];

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
                <div className="p-6 border-b border-border">
                    <h1 className="text-xl font-bold">LARAS Admin</h1>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${item.active
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-medium">
                                {user?.username?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium text-sm">{user?.username}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-full px-2 py-1"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm">Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <p className="text-muted-foreground">Bienvenido al panel de administración</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-card rounded-lg border border-border p-6">
                            <p className="text-muted-foreground text-sm">{stat.label}</p>
                            <p className="text-3xl font-bold mt-1">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-card rounded-lg border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">Acciones rápidas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Link
                            to="/admin/promotions"
                            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
                        >
                            <Tag className="h-8 w-8 text-primary" />
                            <span className="text-sm">Nueva promoción</span>
                        </Link>
                        <Link
                            to="/admin/schedule"
                            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
                        >
                            <Clock className="h-8 w-8 text-primary" />
                            <span className="text-sm">Editar horarios</span>
                        </Link>
                        <Link
                            to="/admin/messages"
                            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
                        >
                            <MessageSquare className="h-8 w-8 text-primary" />
                            <span className="text-sm">Ver mensajes</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
