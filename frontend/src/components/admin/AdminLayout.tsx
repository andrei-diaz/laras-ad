import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    FileImage,
    Tag,
    Clock,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FileImage, label: 'Plantilla Menú', href: '/admin/menu-template' },
    { icon: Tag, label: 'Promociones', href: '/admin/promotions' },
    { icon: Clock, label: 'Horarios', href: '/admin/schedule' },
    { icon: MessageSquare, label: 'Mensajes', href: '/admin/messages' },
    { icon: Settings, label: 'Configuración', href: '/admin/settings' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h1 className="text-xl font-bold">LARAS Admin</h1>
                    <button
                        className="lg:hidden p-1 hover:bg-muted rounded"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.href ||
                            (item.href !== '/admin/dashboard' && location.pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.label}
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors ${isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-medium">
                                {user?.username?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{user?.username}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-full px-2 py-1"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm">Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Mobile header */}
                <header className="lg:hidden sticky top-0 z-30 bg-card border-b border-border p-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 hover:bg-muted rounded-md"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </header>

                {/* Page content */}
                <main className="p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
