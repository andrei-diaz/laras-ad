import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import menuTemplateService, { MenuTemplateItem, MenuTemplateItemInput } from '../../services/menuTemplateService';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const SECTIONS = [
    { value: 'combos', label: 'Combos', menuNumber: 4 },
    { value: 'tacos', label: 'Tacos y Hamburguesas', menuNumber: 3 },
    { value: 'snacks', label: 'Snacks y Papas', menuNumber: 2 },
    { value: 'bebidas', label: 'Bebidas y Aguas', menuNumber: 1 },
];

const MenuTemplatePage: React.FC = () => {
    const queryClient = useQueryClient();
    const [selectedSection, setSelectedSection] = useState<string>('bebidas');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<MenuTemplateItem | null>(null);
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['menu-template-items'],
        queryFn: menuTemplateService.getAllItems,
    });

    const createMutation = useMutation({
        mutationFn: menuTemplateService.createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menu-template-items'] });
            setShowModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: MenuTemplateItemInput }) =>
            menuTemplateService.updateItem(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menu-template-items'] });
            setShowModal(false);
            setEditing(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: menuTemplateService.deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menu-template-items'] });
        },
    });



    const filteredItems = items.filter(item => item.menuSection === selectedSection);

    const handleDelete = (id: number) => {
        if (window.confirm('¿Eliminar este item del menú?')) {
            deleteMutation.mutate(id);
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Plantilla del Menú</h1>
                        <p className="text-muted-foreground">Edita los textos y precios del menú visual</p>
                    </div>
                    <button
                        onClick={() => { setEditing(null); setShowModal(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Agregar Item
                    </button>
                </div>

                {/* Section Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {SECTIONS.map((section) => (
                        <button
                            key={section.value}
                            onClick={() => setSelectedSection(section.value)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedSection === section.value
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80'
                                }`}
                        >
                            {section.label}
                            <span className="ml-2 text-xs opacity-70">
                                ({items.filter(i => i.menuSection === section.value).length})
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Items List */}
            <div className="bg-card rounded-lg border border-border">
                {isLoading ? (
                    <div className="p-8 text-center text-muted-foreground">Cargando...</div>
                ) : filteredItems.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                        <p>No hay items en esta sección</p>
                        <button
                            onClick={() => { setEditing(null); setShowModal(true); }}
                            className="mt-2 text-primary hover:underline"
                        >
                            Agregar primer item
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">{item.name}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {item.description}
                                        </p>
                                        <div className="text-sm font-medium mt-1">
                                            {item.price && <span>${item.price}</span>}
                                            {item.priceHalf && item.priceFull && (
                                                <span>1/2: ${item.priceHalf} | 1L: ${item.priceFull}</span>
                                            )}
                                            {item.priceLabel1 && item.price1 && (
                                                <span>{item.priceLabel1}: ${item.price1}</span>
                                            )}
                                            {item.priceLabel2 && item.price2 && (
                                                <span className="ml-2">{item.priceLabel2}: ${item.price2}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleExpand(item.id)}
                                            className="p-2 hover:bg-muted rounded"
                                            title="Ver detalles"
                                        >
                                            {expandedItems.has(item.id) ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => { setEditing(item); setShowModal(true); }}
                                            className="p-2 hover:bg-muted rounded"
                                            title="Editar"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 hover:bg-muted rounded text-destructive"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedItems.has(item.id) && (
                                    <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            <div>
                                                <span className="text-muted-foreground">Posición Top:</span>
                                                <span className="ml-2 font-mono">{item.positionTop || '-'}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Posición Left:</span>
                                                <span className="ml-2 font-mono">{item.positionLeft || '-'}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Ancho:</span>
                                                <span className="ml-2 font-mono">{item.positionWidth || '-'}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Orden:</span>
                                                <span className="ml-2">{item.displayOrder}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <MenuItemModal
                    item={editing}
                    defaultSection={selectedSection}
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

interface MenuItemModalProps {
    item: MenuTemplateItem | null;
    defaultSection: string;
    onClose: () => void;
    onSave: (data: MenuTemplateItemInput) => void;
    isLoading: boolean;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, defaultSection, onClose, onSave, isLoading }) => {
    const [menuSection, setMenuSection] = useState(item?.menuSection || defaultSection);
    const [name, setName] = useState(item?.name || '');
    const [description, setDescription] = useState(item?.description || '');
    const [priceType, setPriceType] = useState<'single' | 'half-full' | 'custom'>(
        item?.priceHalf ? 'half-full' : item?.priceLabel1 ? 'custom' : 'single'
    );
    const [price, setPrice] = useState(item?.price?.toString() || '');
    const [priceHalf, setPriceHalf] = useState(item?.priceHalf?.toString() || '');
    const [priceFull, setPriceFull] = useState(item?.priceFull?.toString() || '');
    const [priceLabel1, setPriceLabel1] = useState(item?.priceLabel1 || '');
    const [price1, setPrice1] = useState(item?.price1?.toString() || '');
    const [priceLabel2, setPriceLabel2] = useState(item?.priceLabel2 || '');
    const [price2, setPrice2] = useState(item?.price2?.toString() || '');
    const [positionTop, setPositionTop] = useState(item?.positionTop || '');
    const [positionLeft, setPositionLeft] = useState(item?.positionLeft || '');
    const [positionWidth, setPositionWidth] = useState(item?.positionWidth || '22%');
    const [displayOrder, setDisplayOrder] = useState(item?.displayOrder?.toString() || '0');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const sectionConfig = SECTIONS.find(s => s.value === menuSection);

        const data: MenuTemplateItemInput = {
            menuSection,
            menuNumber: sectionConfig?.menuNumber || 1,
            name,
            description: description || undefined,
            positionTop: positionTop || undefined,
            positionLeft: positionLeft || undefined,
            positionWidth: positionWidth || undefined,
            displayOrder: parseInt(displayOrder) || 0,
        };

        if (priceType === 'single') {
            data.price = parseFloat(price) || undefined;
        } else if (priceType === 'half-full') {
            data.priceHalf = parseFloat(priceHalf) || undefined;
            data.priceFull = parseFloat(priceFull) || undefined;
        } else {
            data.priceLabel1 = priceLabel1 || undefined;
            data.price1 = parseFloat(price1) || undefined;
            data.priceLabel2 = priceLabel2 || undefined;
            data.price2 = parseFloat(price2) || undefined;
        }

        onSave(data);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-border sticky top-0 bg-card">
                    <h3 className="text-lg font-semibold">
                        {item ? 'Editar Item' : 'Nuevo Item'}
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Section */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Sección</label>
                        <select
                            value={menuSection}
                            onChange={(e) => setMenuSection(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        >
                            {SECTIONS.map((s) => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                    </div>

                    {/* Price Type */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Tipo de Precio</label>
                        <div className="flex gap-2">
                            {[
                                { value: 'single', label: 'Único' },
                                { value: 'half-full', label: '1/2L y 1L' },
                                { value: 'custom', label: 'Personalizado' },
                            ].map((type) => (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => setPriceType(type.value as any)}
                                    className={`px-3 py-1.5 rounded-md text-sm ${priceType === type.value
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted hover:bg-muted/80'
                                        }`}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Fields */}
                    {priceType === 'single' && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Precio</label>
                            <input
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            />
                        </div>
                    )}

                    {priceType === 'half-full' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Precio 1/2 Litro</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={priceHalf}
                                    onChange={(e) => setPriceHalf(e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Precio 1 Litro</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={priceFull}
                                    onChange={(e) => setPriceFull(e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                        </div>
                    )}

                    {priceType === 'custom' && (
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Etiqueta 1</label>
                                    <input
                                        type="text"
                                        value={priceLabel1}
                                        onChange={(e) => setPriceLabel1(e.target.value)}
                                        placeholder="Ej: Naturales"
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Precio 1</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={price1}
                                        onChange={(e) => setPrice1(e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Etiqueta 2</label>
                                    <input
                                        type="text"
                                        value={priceLabel2}
                                        onChange={(e) => setPriceLabel2(e.target.value)}
                                        placeholder="Ej: Con queso"
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Precio 2</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={price2}
                                        onChange={(e) => setPrice2(e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Position (collapsible) */}
                    <details className="bg-muted/30 rounded-lg">
                        <summary className="p-3 cursor-pointer text-sm font-medium">
                            Posición en la imagen (avanzado)
                        </summary>
                        <div className="p-3 pt-0 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Top (%)</label>
                                <input
                                    type="text"
                                    value={positionTop}
                                    onChange={(e) => setPositionTop(e.target.value)}
                                    placeholder="Ej: 14%"
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Left (%)</label>
                                <input
                                    type="text"
                                    value={positionLeft}
                                    onChange={(e) => setPositionLeft(e.target.value)}
                                    placeholder="Ej: 5%"
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Ancho (%)</label>
                                <input
                                    type="text"
                                    value={positionWidth}
                                    onChange={(e) => setPositionWidth(e.target.value)}
                                    placeholder="Ej: 22%"
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Orden</label>
                                <input
                                    type="number"
                                    value={displayOrder}
                                    onChange={(e) => setDisplayOrder(e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                />
                            </div>
                        </div>
                    </details>

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
                            disabled={isLoading || !name}
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

export default MenuTemplatePage;
