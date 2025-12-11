import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import restaurantInfoService, { RestaurantInfo } from '../../services/restaurantInfoService';
import { Toast, useToast } from '../../components/ui/Toast';
import { Save, MapPin, Phone, Mail, Globe } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<'contact' | 'social'>('contact');
    const [formData, setFormData] = useState<RestaurantInfo>({});
    const { toast, showToast, hideToast } = useToast();

    const { data: info } = useQuery({
        queryKey: ['admin-info'],
        queryFn: restaurantInfoService.getAdminInfo,
    });

    useEffect(() => {
        if (info) setFormData(info);
    }, [info]);

    const saveMutation = useMutation({
        mutationFn: restaurantInfoService.saveInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-info'] });
            showToast('Información guardada correctamente', 'success');
        },
        onError: () => {
            showToast('Error al guardar la información', 'error');
        },
    });

    const handleChange = (field: keyof RestaurantInfo, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(formData);
    };

    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Configuración</h1>
                    <p className="text-muted-foreground">Información del restaurante</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saveMutation.isPending}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                    <Save className="h-4 w-4" />
                    {saveMutation.isPending ? 'Guardando...' : 'Guardar'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {[
                    { key: 'contact', label: 'Contacto' },
                    { key: 'social', label: 'Redes Sociales' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as 'contact' | 'social')}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6">
                {activeTab === 'contact' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                                <MapPin className="h-4 w-4" /> Dirección
                            </label>
                            <input
                                type="text"
                                value={formData.address || ''}
                                onChange={(e) => handleChange('address', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                placeholder="Ej: Simon Bolivar y Cabrera, 67510 Montemorelos, N.L."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                                    <Phone className="h-4 w-4" /> Teléfono
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone || ''}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                    placeholder="Ej: 826 267 3165"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">WhatsApp</label>
                                <input
                                    type="tel"
                                    value={formData.whatsapp || ''}
                                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                    placeholder="Ej: 528262673165"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                                <Mail className="h-4 w-4" /> Email
                            </label>
                            <input
                                type="email"
                                value={formData.email || ''}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                placeholder="Ej: contacto@laras.com"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'social' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                                <Globe className="h-4 w-4" /> Facebook
                            </label>
                            <input
                                type="url"
                                value={formData.facebookUrl || ''}
                                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Instagram</label>
                            <input
                                type="url"
                                value={formData.instagramUrl || ''}
                                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">TikTok</label>
                            <input
                                type="url"
                                value={formData.tiktokUrl || ''}
                                onChange={(e) => handleChange('tiktokUrl', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                placeholder="https://tiktok.com/@..."
                            />
                        </div>
                    </div>
                )}
            </form>

            {/* Toast notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </AdminLayout>
    );
};

export default SettingsPage;
