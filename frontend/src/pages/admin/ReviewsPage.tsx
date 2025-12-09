import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import testimonialService, { Testimonial, TestimonialInput } from '../../services/testimonialService';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from 'lucide-react';

const ReviewsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Testimonial | null>(null);

    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['admin-testimonials'],
        queryFn: testimonialService.getAllTestimonials,
    });

    const createMutation = useMutation({
        mutationFn: testimonialService.createTestimonial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
            setShowModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: TestimonialInput }) =>
            testimonialService.updateTestimonial(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
            setShowModal(false);
            setEditing(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: testimonialService.deleteTestimonial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
        },
    });

    const handleDelete = (id: number) => {
        if (window.confirm('¿Eliminar este testimonio?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Reseñas / Testimonios</h1>
                    <p className="text-muted-foreground">Gestiona testimonios de clientes</p>
                </div>
                <button
                    onClick={() => { setEditing(null); setShowModal(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Nuevo Testimonio
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Cargando...</div>
            ) : testimonials.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No hay testimonios</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-card rounded-lg border border-border p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < t.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                                    ))}
                                </div>
                                {t.isVisible ? (
                                    <Eye className="h-4 w-4 text-green-500" />
                                ) : (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                )}
                            </div>
                            <p className="text-sm italic mb-3">"{t.text}"</p>
                            <p className="text-sm font-medium">— {t.customerName}</p>
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => { setEditing(t); setShowModal(true); }}
                                    className="flex-1 py-1.5 text-sm border border-input rounded hover:bg-muted"
                                >
                                    <Pencil className="h-3 w-3 inline mr-1" /> Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="px-3 py-1.5 text-sm border border-input rounded hover:bg-muted text-destructive"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <TestimonialModal
                    testimonial={editing}
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

interface TestimonialModalProps {
    testimonial: Testimonial | null;
    onClose: () => void;
    onSave: (data: TestimonialInput) => void;
    isLoading: boolean;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({ testimonial, onClose, onSave, isLoading }) => {
    const [customerName, setCustomerName] = useState(testimonial?.customerName || '');
    const [text, setText] = useState(testimonial?.text || '');
    const [rating, setRating] = useState(testimonial?.rating ?? 5);
    const [isVisible, setIsVisible] = useState(testimonial?.isVisible ?? true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ customerName, text, rating, isVisible });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
                <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">{testimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}</h3>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre del cliente</label>
                        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Testimonio</label>
                        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background" rows={4} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Calificación</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRating(r)}
                                    className={`p-1 ${r <= rating ? 'text-yellow-500' : 'text-muted-foreground'}`}
                                >
                                    <Star className={`h-6 w-6 ${r <= rating ? 'fill-current' : ''}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} className="rounded" />
                        <span className="text-sm">Visible en el sitio</span>
                    </label>
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

export default ReviewsPage;
