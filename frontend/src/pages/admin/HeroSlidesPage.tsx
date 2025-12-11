import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import heroSlideService, { HeroSlide, HeroSlideInput } from '../../services/heroSlideService';
import dishService from '../../services/dishService';
import { useAuth } from '../../context/AuthContext';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlidesPage: React.FC = () => {
    const queryClient = useQueryClient();
    const { isAuthenticated } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<HeroSlide | null>(null);
    const [previewIndex, setPreviewIndex] = useState(0);

    const { data: slides = [], isLoading } = useQuery({
        queryKey: ['admin-hero-slides'],
        queryFn: heroSlideService.getAllSlides,
        enabled: isAuthenticated,
    });

    const activeSlides = slides.filter(s => s.isActive);

    const createMutation = useMutation({
        mutationFn: heroSlideService.createSlide,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-hero-slides'] });
            setShowModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: HeroSlideInput }) =>
            heroSlideService.updateSlide(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-hero-slides'] });
            setShowModal(false);
            setEditing(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: heroSlideService.deleteSlide,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-hero-slides'] });
        },
    });

    const toggleMutation = useMutation({
        mutationFn: heroSlideService.toggleActive,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-hero-slides'] });
        },
    });

    const reorderMutation = useMutation({
        mutationFn: heroSlideService.reorderSlides,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-hero-slides'] });
        },
    });

    const handleDelete = (id: number) => {
        if (window.confirm('¿Eliminar este slide?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newOrder = [...slides];
        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        reorderMutation.mutate(newOrder.map(s => s.id));
    };

    const handleMoveDown = (index: number) => {
        if (index === slides.length - 1) return;
        const newOrder = [...slides];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        reorderMutation.mutate(newOrder.map(s => s.id));
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Carrusel Hero</h1>
                        <p className="text-muted-foreground">Gestiona las imágenes del carrusel en la página de inicio</p>
                    </div>
                    <button
                        onClick={() => { setEditing(null); setShowModal(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Agregar Slide
                    </button>
                </div>
            </div>

            {/* Preview Section */}
            {activeSlides.length > 0 && (
                <div className="mb-8 bg-card rounded-lg border border-border overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <h2 className="font-semibold">Vista previa del carrusel</h2>
                        <p className="text-sm text-muted-foreground">Así se verá en la página de inicio</p>
                    </div>
                    <div className="relative bg-stone-900 aspect-[16/9] max-h-[400px]">
                        <img
                            src={activeSlides[previewIndex]?.imageUrl}
                            alt={activeSlides[previewIndex]?.title || 'Slide'}
                            className="w-full h-full object-cover"
                        />
                        {activeSlides[previewIndex]?.title && (
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-2xl font-bold text-white">{activeSlides[previewIndex].title}</h3>
                                {activeSlides[previewIndex].subtitle && (
                                    <p className="text-white/80 mt-1">{activeSlides[previewIndex].subtitle}</p>
                                )}
                            </div>
                        )}
                        {activeSlides.length > 1 && (
                            <>
                                <button
                                    onClick={() => setPreviewIndex(i => (i - 1 + activeSlides.length) % activeSlides.length)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={() => setPreviewIndex(i => (i + 1) % activeSlides.length)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>
                            </>
                        )}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {activeSlides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPreviewIndex(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${i === previewIndex ? 'bg-white w-8' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Slides List */}
            <div className="bg-card rounded-lg border border-border">
                <div className="p-4 border-b border-border">
                    <h2 className="font-semibold">Todos los slides ({slides.length})</h2>
                </div>
                {isLoading ? (
                    <div className="p-8 text-center text-muted-foreground">Cargando...</div>
                ) : slides.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                        <p>No hay slides configurados</p>
                        <button
                            onClick={() => { setEditing(null); setShowModal(true); }}
                            className="mt-2 text-primary hover:underline"
                        >
                            Agregar primer slide
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {slides.map((slide, index) => (
                            <div key={slide.id} className="p-4 flex items-center gap-4">
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => handleMoveUp(index)}
                                        disabled={index === 0}
                                        className="p-1 hover:bg-muted rounded disabled:opacity-30"
                                    >
                                        <ChevronLeft className="h-4 w-4 rotate-90" />
                                    </button>
                                    <button
                                        onClick={() => handleMoveDown(index)}
                                        disabled={index === slides.length - 1}
                                        className="p-1 hover:bg-muted rounded disabled:opacity-30"
                                    >
                                        <ChevronRight className="h-4 w-4 rotate-90" />
                                    </button>
                                </div>
                                <div className="h-20 w-32 bg-muted rounded overflow-hidden flex-shrink-0">
                                    <img
                                        src={slide.imageUrl}
                                        alt={slide.title || 'Slide'}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-muted px-2 py-0.5 rounded">#{index + 1}</span>
                                        <h3 className="font-medium truncate">{slide.title || 'Sin título'}</h3>
                                        {!slide.isActive && (
                                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Inactivo</span>
                                        )}
                                    </div>
                                    {slide.subtitle && (
                                        <p className="text-sm text-muted-foreground truncate">{slide.subtitle}</p>
                                    )}
                                    {slide.linkUrl && (
                                        <p className="text-xs text-blue-500 truncate">{slide.linkUrl}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleMutation.mutate(slide.id)}
                                        className="p-2 hover:bg-muted rounded"
                                        title={slide.isActive ? 'Desactivar' : 'Activar'}
                                    >
                                        {slide.isActive ? (
                                            <Eye className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => { setEditing(slide); setShowModal(true); }}
                                        className="p-2 hover:bg-muted rounded"
                                        title="Editar"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(slide.id)}
                                        className="p-2 hover:bg-muted rounded text-destructive"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <SlideModal
                    slide={editing}
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

interface SlideModalProps {
    slide: HeroSlide | null;
    onClose: () => void;
    onSave: (data: HeroSlideInput) => void;
    isLoading: boolean;
}

const SlideModal: React.FC<SlideModalProps> = ({ slide, onClose, onSave, isLoading }) => {
    const [imageUrl, setImageUrl] = useState(slide?.imageUrl || '');
    const [title, setTitle] = useState(slide?.title || '');
    const [subtitle, setSubtitle] = useState(slide?.subtitle || '');
    const [linkUrl, setLinkUrl] = useState(slide?.linkUrl || '');
    const [isActive, setIsActive] = useState(slide?.isActive ?? true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setError(null);
        try {
            const url = await dishService.uploadImage(file);
            setImageUrl(url);
        } catch (err) {
            setError('Error al subir imagen. Intenta de nuevo.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!imageUrl) {
            setError('La imagen es requerida');
            return;
        }
        onSave({
            imageUrl,
            title: title || undefined,
            subtitle: subtitle || undefined,
            linkUrl: linkUrl || undefined,
            isActive,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">{slide ? 'Editar Slide' : 'Nuevo Slide'}</h3>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Imagen *</label>
                        {imageUrl && (
                            <div className="mb-3 aspect-video bg-muted rounded-lg overflow-hidden">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <label className="flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                            <Upload className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                {uploading ? 'Subiendo...' : imageUrl ? 'Cambiar imagen' : 'Subir imagen'}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                disabled={uploading}
                            />
                        </label>
                        <p className="text-xs text-muted-foreground mt-1">Recomendado: 1920x1080px o mayor</p>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Título (opcional)</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej: Arrachera Cheese Burger"
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                    </div>

                    {/* Subtitle */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Subtítulo (opcional)</label>
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            placeholder="Ej: Nuestra especialidad de la casa"
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                    </div>

                    {/* Link URL */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Enlace (opcional)</label>
                        <input
                            type="text"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="Ej: /menu"
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                        <p className="text-xs text-muted-foreground mt-1">A dónde lleva al hacer clic en el slide</p>
                    </div>

                    {/* Active */}
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="rounded"
                        />
                        <span className="text-sm">Activo (visible en la página)</span>
                    </label>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end pt-4 border-t border-border">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-input rounded-md hover:bg-muted"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !imageUrl}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                        >
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HeroSlidesPage;
