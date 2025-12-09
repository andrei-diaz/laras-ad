import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import promotionService, { Promotion, PromotionInput } from '../../services/promotionService';
import dishService from '../../services/dishService';
import { Plus, Pencil, Trash2, Star, Calendar, Eye, EyeOff, Upload } from 'lucide-react';

const PromotionsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Promotion | null>(null);

    const { data: promotions = [], isLoading } = useQuery({
        queryKey: ['admin-promotions'],
        queryFn: promotionService.getAllPromotions,
    });

    const createMutation = useMutation({
        mutationFn: promotionService.createPromotion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
            setShowModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: PromotionInput }) =>
            promotionService.updatePromotion(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
            setShowModal(false);
            setEditing(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: promotionService.deletePromotion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
        },
    });

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar esta promoción?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Promociones</h1>
                    <p className="text-muted-foreground">Gestiona ofertas y promociones</p>
                </div>
                <button
                    onClick={() => { setEditing(null); setShowModal(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Nueva Promoción
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Cargando...</div>
            ) : promotions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No hay promociones</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {promotions.map((promo) => (
                        <div key={promo.id} className="bg-card rounded-lg border border-border overflow-hidden">
                            <div className="h-40 bg-muted flex items-center justify-center">
                                {promo.imageUrl ? (
                                    <img src={promo.imageUrl} alt={promo.title} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-4xl">🎉</span>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="font-semibold">{promo.title}</h3>
                                    <div className="flex gap-1">
                                        {promo.isFeatured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                        {promo.isActive ? (
                                            <Eye className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{promo.description}</p>
                                {(promo.startDate || promo.endDate) && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                                        <Calendar className="h-3 w-3" />
                                        {promo.startDate} - {promo.endDate}
                                    </div>
                                )}
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => { setEditing(promo); setShowModal(true); }}
                                        className="flex-1 py-1.5 text-sm border border-input rounded hover:bg-muted"
                                    >
                                        <Pencil className="h-3 w-3 inline mr-1" /> Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(promo.id)}
                                        className="px-3 py-1.5 text-sm border border-input rounded hover:bg-muted text-destructive"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <PromotionModal
                    promotion={editing}
                    onClose={() => { setShowModal(false); setEditing(null); }}
                    onSave={(data) => {
                        if (editing) {
                            updateMutation.mutate({ id: editing.id, data });
                        } else {
                            createMutation.mutate(data);
                        }
                    }}
                    isLoading={createMutation.isPending || updateMutation.isPending}
                />
            )}
        </AdminLayout>
    );
};

interface PromotionModalProps {
    promotion: Promotion | null;
    onClose: () => void;
    onSave: (data: PromotionInput) => void;
    isLoading: boolean;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ promotion, onClose, onSave, isLoading }) => {
    const [title, setTitle] = useState(promotion?.title || '');
    const [description, setDescription] = useState(promotion?.description || '');
    const [imageUrl, setImageUrl] = useState(promotion?.imageUrl || '');
    const [startDate, setStartDate] = useState(promotion?.startDate || '');
    const [endDate, setEndDate] = useState(promotion?.endDate || '');
    const [isFeatured, setIsFeatured] = useState(promotion?.isFeatured ?? false);
    const [isActive, setIsActive] = useState(promotion?.isActive ?? true);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await dishService.uploadImage(file);
            setImageUrl(url);
        } catch (error) {
            alert('Error al subir imagen');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ title, description, imageUrl, startDate: startDate || undefined, endDate: endDate || undefined, isFeatured, isActive });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">{promotion ? 'Editar Promoción' : 'Nueva Promoción'}</h3>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Título</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Descripción</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background" rows={3} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Imagen</label>
                        <div className="flex gap-4 items-center">
                            {imageUrl && <img src={imageUrl} alt="Preview" className="h-16 w-16 object-cover rounded" />}
                            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary">
                                <Upload className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{uploading ? 'Subiendo...' : 'Subir imagen'}</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Fecha inicio</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Fecha fin</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded" />
                            <span className="text-sm">Destacada</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" />
                            <span className="text-sm">Activa</span>
                        </label>
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-input rounded-md hover:bg-muted">Cancelar</button>
                        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50">
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PromotionsPage;
