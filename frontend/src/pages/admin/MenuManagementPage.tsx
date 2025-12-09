import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import categoryService, { Category, CategoryInput } from '../../services/categoryService';
import dishService, { Dish, DishInput } from '../../services/dishService';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Eye, EyeOff, Upload } from 'lucide-react';

const MenuManagementPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showDishModal, setShowDishModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingDish, setEditingDish] = useState<Dish | null>(null);

    // Queries
    const { data: categories = [], isLoading: loadingCategories } = useQuery({
        queryKey: ['admin-categories'],
        queryFn: categoryService.getAllCategories,
    });

    const { data: dishes = [], isLoading: loadingDishes } = useQuery({
        queryKey: ['admin-dishes', selectedCategory],
        queryFn: () =>
            selectedCategory
                ? dishService.getDishesByCategory(selectedCategory)
                : dishService.getAllDishes(),
    });

    // Category mutations
    const createCategoryMutation = useMutation({
        mutationFn: categoryService.createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
            setShowCategoryModal(false);
        },
    });

    const updateCategoryMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: CategoryInput }) =>
            categoryService.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
            setShowCategoryModal(false);
            setEditingCategory(null);
        },
    });

    const deleteCategoryMutation = useMutation({
        mutationFn: categoryService.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
        },
    });

    // Dish mutations
    const createDishMutation = useMutation({
        mutationFn: dishService.createDish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-dishes'] });
            setShowDishModal(false);
        },
    });

    const updateDishMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: DishInput }) =>
            dishService.updateDish(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-dishes'] });
            setShowDishModal(false);
            setEditingDish(null);
        },
    });

    const deleteDishMutation = useMutation({
        mutationFn: dishService.deleteDish,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-dishes'] });
        },
    });

    const toggleAvailabilityMutation = useMutation({
        mutationFn: dishService.toggleAvailability,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-dishes'] });
        },
    });

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setShowCategoryModal(true);
    };

    const handleEditDish = (dish: Dish) => {
        setEditingDish(dish);
        setShowDishModal(true);
    };

    const handleDeleteCategory = (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            deleteCategoryMutation.mutate(id);
        }
    };

    const handleDeleteDish = (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar este platillo?')) {
            deleteDishMutation.mutate(id);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Gestión del Menú</h1>
                <p className="text-muted-foreground">Administra categorías y platillos</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Categories */}
                <div className="lg:col-span-1">
                    <div className="bg-card rounded-lg border border-border">
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h2 className="font-semibold">Categorías</h2>
                            <button
                                onClick={() => {
                                    setEditingCategory(null);
                                    setShowCategoryModal(true);
                                }}
                                className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="divide-y divide-border">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`w-full p-3 text-left hover:bg-muted transition-colors ${selectedCategory === null ? 'bg-muted' : ''
                                    }`}
                            >
                                <span className="font-medium">Todos los platillos</span>
                            </button>

                            {loadingCategories ? (
                                <div className="p-4 text-center text-muted-foreground">Cargando...</div>
                            ) : (
                                categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className={`p-3 flex items-center justify-between hover:bg-muted transition-colors cursor-pointer ${selectedCategory === category.id ? 'bg-muted' : ''
                                            }`}
                                        onClick={() => setSelectedCategory(category.id)}
                                    >
                                        <div>
                                            <span className="font-medium">{category.name}</span>
                                            <span className="text-xs text-muted-foreground ml-2">
                                                ({category.dishCount})
                                            </span>
                                            {!category.isActive && (
                                                <span className="text-xs bg-muted px-1.5 py-0.5 rounded ml-2">
                                                    Inactiva
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditCategory(category);
                                                }}
                                                className="p-1.5 hover:bg-background rounded"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteCategory(category.id);
                                                }}
                                                className="p-1.5 hover:bg-background rounded text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Dishes */}
                <div className="lg:col-span-2">
                    <div className="bg-card rounded-lg border border-border">
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h2 className="font-semibold">
                                Platillos
                                {selectedCategory && categories.find((c) => c.id === selectedCategory) && (
                                    <span className="text-muted-foreground font-normal ml-2">
                                        en {categories.find((c) => c.id === selectedCategory)?.name}
                                    </span>
                                )}
                            </h2>
                            <button
                                onClick={() => {
                                    setEditingDish(null);
                                    setShowDishModal(true);
                                }}
                                className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Agregar platillo</span>
                            </button>
                        </div>

                        {loadingDishes ? (
                            <div className="p-8 text-center text-muted-foreground">Cargando...</div>
                        ) : dishes.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                No hay platillos en esta categoría
                            </div>
                        ) : (
                            <div className="divide-y divide-border">
                                {dishes.map((dish) => (
                                    <div key={dish.id} className="p-4 flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                            {dish.imageUrl ? (
                                                <img
                                                    src={dish.imageUrl}
                                                    alt={dish.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-2xl">🍽️</span>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium truncate">{dish.name}</h3>
                                                {!dish.isAvailable && (
                                                    <span className="text-xs bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">
                                                        No disponible
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {dish.description || 'Sin descripción'}
                                            </p>
                                            <p className="text-sm font-medium text-primary">
                                                ${dish.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => toggleAvailabilityMutation.mutate(dish.id)}
                                                className={`p-2 rounded hover:bg-muted ${dish.isAvailable ? 'text-green-600' : 'text-muted-foreground'
                                                    }`}
                                                title={dish.isAvailable ? 'Marcar no disponible' : 'Marcar disponible'}
                                            >
                                                {dish.isAvailable ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                            </button>
                                            <button
                                                onClick={() => handleEditDish(dish)}
                                                className="p-2 hover:bg-muted rounded"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDish(dish.id)}
                                                className="p-2 hover:bg-muted rounded text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Category Modal */}
            {showCategoryModal && (
                <CategoryModal
                    category={editingCategory}
                    onClose={() => {
                        setShowCategoryModal(false);
                        setEditingCategory(null);
                    }}
                    onSave={(data) => {
                        if (editingCategory) {
                            updateCategoryMutation.mutate({ id: editingCategory.id, data });
                        } else {
                            createCategoryMutation.mutate(data);
                        }
                    }}
                    isLoading={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                />
            )}

            {/* Dish Modal */}
            {showDishModal && (
                <DishModal
                    dish={editingDish}
                    categories={categories}
                    defaultCategoryId={selectedCategory}
                    onClose={() => {
                        setShowDishModal(false);
                        setEditingDish(null);
                    }}
                    onSave={(data) => {
                        if (editingDish) {
                            updateDishMutation.mutate({ id: editingDish.id, data });
                        } else {
                            createDishMutation.mutate(data);
                        }
                    }}
                    isLoading={createDishMutation.isPending || updateDishMutation.isPending}
                />
            )}
        </AdminLayout>
    );
};

// Category Modal Component
interface CategoryModalProps {
    category: Category | null;
    onClose: () => void;
    onSave: (data: CategoryInput) => void;
    isLoading: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose, onSave, isLoading }) => {
    const [name, setName] = useState(category?.name || '');
    const [description, setDescription] = useState(category?.description || '');
    const [isActive, setIsActive] = useState(category?.isActive ?? true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, description, isActive });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
                <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">
                        {category ? 'Editar categoría' : 'Nueva categoría'}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            rows={3}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="rounded"
                        />
                        <label htmlFor="isActive" className="text-sm">Categoría activa</label>
                    </div>

                    <div className="flex gap-2 justify-end pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-input rounded-md hover:bg-muted"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
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

// Dish Modal Component
interface DishModalProps {
    dish: Dish | null;
    categories: Category[];
    defaultCategoryId: number | null;
    onClose: () => void;
    onSave: (data: DishInput) => void;
    isLoading: boolean;
}

const DishModal: React.FC<DishModalProps> = ({
    dish,
    categories,
    defaultCategoryId,
    onClose,
    onSave,
    isLoading,
}) => {
    const [name, setName] = useState(dish?.name || '');
    const [description, setDescription] = useState(dish?.description || '');
    const [price, setPrice] = useState(dish?.price?.toString() || '');
    const [categoryId, setCategoryId] = useState(dish?.categoryId || defaultCategoryId || '');
    const [imageUrl, setImageUrl] = useState(dish?.imageUrl || '');
    const [isAvailable, setIsAvailable] = useState(dish?.isAvailable ?? true);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await dishService.uploadImage(file);
            setImageUrl(url);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name,
            description,
            price: parseFloat(price),
            categoryId: Number(categoryId),
            imageUrl,
            isAvailable,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">
                        {dish ? 'Editar platillo' : 'Nuevo platillo'}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Precio ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Categoría</label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                required
                            >
                                <option value="">Seleccionar...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Imagen</label>
                        <div className="flex gap-4 items-start">
                            {imageUrl && (
                                <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted">
                                    <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            )}
                            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary transition-colors">
                                <Upload className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {uploading ? 'Subiendo...' : 'Subir imagen'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isAvailable"
                            checked={isAvailable}
                            onChange={(e) => setIsAvailable(e.target.checked)}
                            className="rounded"
                        />
                        <label htmlFor="isAvailable" className="text-sm">Disponible</label>
                    </div>

                    <div className="flex gap-2 justify-end pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-input rounded-md hover:bg-muted"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || uploading}
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

export default MenuManagementPage;
