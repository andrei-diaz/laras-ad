import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import restaurantInfoService, { RestaurantInfo } from '../../services/restaurantInfoService';
import dishService from '../../services/dishService';
import { Save, Upload, MapPin, Phone, Mail, Globe } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'social' | 'media'>('about');
    const [formData, setFormData] = useState<RestaurantInfo>({});
    const [uploading, setUploading] = useState(false);

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
            alert('Información guardada');
        },
    });

    const handleChange = (field: keyof RestaurantInfo, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'bannerImageUrl' | 'logoUrl') => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await dishService.uploadImage(file);
            setFormData((prev) => ({ ...prev, [field]: url }));
        } catch (error) {
            alert('Error al subir imagen');
        } finally {
            setUploading(false);
        }
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
                    { key: 'about', label: 'Nosotros' },
                    { key: 'contact', label: 'Contacto' },
                    { key: 'social', label: 'Redes Sociales' },
                    { key: 'media', label: 'Imágenes' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6">
                {activeTab === 'about' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Sobre Nosotros</label>
                            <textarea
                                value={formData.aboutUs || ''}
                                onChange={(e) => handleChange('aboutUs', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[150px]"
                                placeholder="Historia y descripción del restaurante..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Misión</label>
                            <textarea
                                value={formData.mission || ''}
                                onChange={(e) => handleChange('mission', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Valores</label>
                            <textarea
                                value={formData.values || ''}
                                onChange={(e) => handleChange('values', e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                rows={3}
                            />
                        </div>
                    </div>
                )}

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
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Latitud</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.latitude || ''}
                                    onChange={(e) => handleChange('latitude', parseFloat(e.target.value))}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Longitud</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.longitude || ''}
                                    onChange={(e) => handleChange('longitude', parseFloat(e.target.value))}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
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
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">WhatsApp</label>
                                <input
                                    type="tel"
                                    value={formData.whatsapp || ''}
                                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
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

                {activeTab === 'media' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Logo</label>
                            <div className="flex items-center gap-4">
                                {formData.logoUrl && (
                                    <img src={formData.logoUrl} alt="Logo" className="h-20 w-20 object-contain rounded border" />
                                )}
                                <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary">
                                    <Upload className="h-5 w-5" />
                                    <span className="text-sm">{uploading ? 'Subiendo...' : 'Subir logo'}</span>
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logoUrl')} className="hidden" disabled={uploading} />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Banner Principal</label>
                            <div className="space-y-2">
                                {formData.bannerImageUrl && (
                                    <img src={formData.bannerImageUrl} alt="Banner" className="w-full h-40 object-cover rounded border" />
                                )}
                                <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary">
                                    <Upload className="h-5 w-5" />
                                    <span className="text-sm">{uploading ? 'Subiendo...' : 'Subir banner'}</span>
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'bannerImageUrl')} className="hidden" disabled={uploading} />
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </AdminLayout>
    );
};

export default SettingsPage;
