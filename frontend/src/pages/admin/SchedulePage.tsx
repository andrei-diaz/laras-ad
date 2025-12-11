import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import scheduleService, { Schedule, ScheduleInput, DayOfWeek } from '../../services/scheduleService';
import { Plus, Pencil, Trash2, Clock, Calendar, AlertCircle, Eye, ChevronUp, ChevronDown } from 'lucide-react';

// Helper to format time from "HH:mm" to "H:mm AM/PM"
const formatTimeDisplay = (time?: string): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const DAYS: { value: DayOfWeek; label: string; short: string }[] = [
    { value: 'MONDAY', label: 'Lunes', short: 'Lun' },
    { value: 'TUESDAY', label: 'Martes', short: 'Mar' },
    { value: 'WEDNESDAY', label: 'Miércoles', short: 'Mié' },
    { value: 'THURSDAY', label: 'Jueves', short: 'Jue' },
    { value: 'FRIDAY', label: 'Viernes', short: 'Vie' },
    { value: 'SATURDAY', label: 'Sábado', short: 'Sáb' },
    { value: 'SUNDAY', label: 'Domingo', short: 'Dom' },
];

const SchedulePage: React.FC = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<'regular' | 'special' | 'overrides'>('regular');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Schedule | null>(null);

    const { data: status } = useQuery({
        queryKey: ['restaurant-status'],
        queryFn: scheduleService.getStatus,
        refetchInterval: 60000,
    });

    const { data: regularSchedules = [] } = useQuery({
        queryKey: ['regular-schedules'],
        queryFn: scheduleService.getRegularSchedules,
    });

    const { data: specialSchedules = [] } = useQuery({
        queryKey: ['special-schedules'],
        queryFn: scheduleService.getSpecialSchedules,
    });

    const { data: overrides = [] } = useQuery({
        queryKey: ['overrides'],
        queryFn: scheduleService.getOverrides,
    });

    const invalidateAll = () => {
        queryClient.invalidateQueries({ queryKey: ['regular-schedules'] });
        queryClient.invalidateQueries({ queryKey: ['special-schedules'] });
        queryClient.invalidateQueries({ queryKey: ['overrides'] });
        queryClient.invalidateQueries({ queryKey: ['restaurant-status'] });
    };

    const createMutation = useMutation({
        mutationFn: scheduleService.createSchedule,
        onSuccess: () => {
            invalidateAll();
            setShowModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: ScheduleInput }) =>
            scheduleService.updateSchedule(id, data),
        onSuccess: () => {
            invalidateAll();
            setShowModal(false);
            setEditing(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: scheduleService.deleteSchedule,
        onSuccess: invalidateAll,
    });

    const handleDelete = (id: number) => {
        if (window.confirm('¿Eliminar este horario?')) {
            deleteMutation.mutate(id);
        }
    };

    const [isReordering, setIsReordering] = useState(false);

    const updateScheduleOrder = async (s: Schedule, newOrder: number) => {
        const payload = {
            scheduleType: s.scheduleType,
            daysOfWeek: s.daysOfWeek || [],
            openTime: s.openTime || undefined,
            closeTime: s.closeTime || undefined,
            isClosed: s.isClosed,
            description: s.description || undefined,
            displayOrder: newOrder
        };
        console.log('Updating schedule', s.id, 'with order', newOrder, payload);
        return scheduleService.updateSchedule(s.id, payload);
    };

    const handleReorder = async (schedule: Schedule, direction: 'up' | 'down') => {
        if (isReordering) return;
        setIsReordering(true);
        console.log('handleReorder called', schedule.id, direction);

        try {
            const sorted = [...regularSchedules].sort((a, b) => {
                const orderA = a.displayOrder ?? 0;
                const orderB = b.displayOrder ?? 0;
                if (orderA !== orderB) return orderA - orderB;
                return a.id - b.id;
            });
            console.log('Sorted schedules:', sorted.map(s => ({ id: s.id, order: s.displayOrder })));

            const currentIndex = sorted.findIndex(s => s.id === schedule.id);
            console.log('Current index:', currentIndex);

            let targetIndex = -1;
            if (direction === 'up' && currentIndex > 0) {
                targetIndex = currentIndex - 1;
            } else if (direction === 'down' && currentIndex < sorted.length - 1) {
                targetIndex = currentIndex + 1;
            }

            if (targetIndex >= 0) {
                const current = sorted[currentIndex];
                const target = sorted[targetIndex];

                // Simple swap: current gets target's position, target gets current's position
                console.log('Swapping', current.id, 'with', target.id);

                await updateScheduleOrder(current, targetIndex);
                await updateScheduleOrder(target, currentIndex);

                console.log('Swap complete, invalidating...');
                invalidateAll();
            }
        } catch (error) {
            console.error('Error reordering:', error);
            alert('Error al reordenar: ' + (error as Error).message);
        } finally {
            setIsReordering(false);
        }
    };

    const initializeOrders = async () => {
        if (isReordering) return;
        setIsReordering(true);
        console.log('initializeOrders called');

        try {
            const sorted = [...regularSchedules].sort((a, b) => a.id - b.id);
            console.log('Initializing orders for', sorted.length, 'schedules');

            for (let i = 0; i < sorted.length; i++) {
                await updateScheduleOrder(sorted[i], i);
            }

            console.log('Initialization complete, invalidating...');
            invalidateAll();
        } catch (error) {
            console.error('Error initializing orders:', error);
            alert('Error al asignar órdenes: ' + (error as Error).message);
        } finally {
            setIsReordering(false);
        }
    };

    const currentSchedules = activeTab === 'regular'
        ? [...regularSchedules].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        : activeTab === 'special' ? specialSchedules : overrides;

    const getTabType = (): 'REGULAR' | 'SPECIAL' | 'OVERRIDE' => {
        if (activeTab === 'regular') return 'REGULAR';
        if (activeTab === 'special') return 'SPECIAL';
        return 'OVERRIDE';
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Horarios</h1>
                        <p className="text-muted-foreground">Configura horarios de apertura</p>
                    </div>
                    <button
                        onClick={() => { setEditing(null); setShowModal(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Agregar
                    </button>
                </div>

                {/* Status Banner */}
                {status && (
                    <div className={`p-4 rounded-lg mb-6 ${status.isOpen || status.statusMessage?.includes('Abierto') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <span className="font-semibold">{status.statusMessage}</span>
                            {status.nextStatusChange && <span className="text-sm">• {status.nextStatusChange}</span>}
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                    {[
                        { key: 'regular', label: 'Horario Regular', icon: Clock },
                        { key: 'special', label: 'Fechas Especiales', icon: Calendar },
                        { key: 'overrides', label: 'Excepciones', icon: AlertCircle },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.key
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted hover:bg-muted/80'
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Description */}
                <div className="text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
                    {activeTab === 'regular' && (
                        <div className="flex items-center justify-between">
                            <p>Define los horarios semanales regulares. Usa las flechas ↑↓ para cambiar el orden de visualización.</p>
                            {regularSchedules.length > 1 && regularSchedules.every(s => (s.displayOrder || 0) === 0) && (
                                <button
                                    onClick={initializeOrders}
                                    disabled={isReordering}
                                    className="ml-4 px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {isReordering ? 'Guardando...' : 'Asignar órdenes'}
                                </button>
                            )}
                        </div>
                    )}
                    {activeTab === 'special' && (
                        <p>Configura horarios para fechas especiales como días festivos, eventos o vacaciones. Puedes definir rangos de fechas.</p>
                    )}
                    {activeTab === 'overrides' && (
                        <p>Excepciones temporales que anulan los horarios regulares y especiales. Puedes definir una fecha de expiración.</p>
                    )}
                </div>
            </div>

            {/* Schedule List */}
            <div className="bg-card rounded-lg border border-border">
                {currentSchedules.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                        <p>No hay horarios configurados</p>
                        <button
                            onClick={() => { setEditing(null); setShowModal(true); }}
                            className="mt-2 text-primary hover:underline"
                        >
                            Agregar primer horario
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {currentSchedules.map((schedule) => (
                            <div key={schedule.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    {activeTab === 'regular' ? (
                                        <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                            {schedule.displayOrder || 0}
                                        </div>
                                    ) : activeTab === 'special' ? (
                                        <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                    ) : (
                                        <div className="h-10 w-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium">
                                            {activeTab === 'regular' && schedule.displayDays}
                                            {activeTab === 'special' && (schedule.displayDateRange || schedule.description)}
                                            {activeTab === 'overrides' && (schedule.description || 'Excepción')}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            {schedule.isClosed ? (
                                                <span className="text-red-500 font-medium">Cerrado</span>
                                            ) : (
                                                <span>{schedule.openTime} - {schedule.closeTime}</span>
                                            )}
                                            {activeTab === 'special' && schedule.description && schedule.displayDateRange && (
                                                <span>• {schedule.description}</span>
                                            )}
                                            {activeTab === 'overrides' && schedule.expiresAt && (
                                                <span className="text-yellow-600">• Expira: {new Date(schedule.expiresAt).toLocaleDateString('es-MX')}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {activeTab === 'regular' && (
                                        <>
                                            <button
                                                onClick={() => handleReorder(schedule, 'up')}
                                                disabled={isReordering}
                                                className="p-2 hover:bg-muted rounded transition-colors disabled:opacity-50"
                                                title="Subir"
                                            >
                                                <ChevronUp className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleReorder(schedule, 'down')}
                                                disabled={isReordering}
                                                className="p-2 hover:bg-muted rounded transition-colors disabled:opacity-50"
                                                title="Bajar"
                                            >
                                                <ChevronDown className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => { setEditing(schedule); setShowModal(true); }}
                                        className="p-2 hover:bg-muted rounded transition-colors"
                                        title="Editar"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(schedule.id)}
                                        className="p-2 hover:bg-muted rounded text-destructive transition-colors"
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

            {/* Preview Section */}
            {activeTab === 'regular' && currentSchedules.length > 0 && (
                <div className="mt-6 bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Eye className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">Vista Previa (como se verá en la página)</h3>
                    </div>
                    <div className="bg-stone-900 text-white p-6 rounded-lg max-w-sm">
                        <h4 className="font-bold mb-3">Horario</h4>
                        <div className="space-y-1 text-stone-300 text-sm">
                            {currentSchedules.map((schedule) => (
                                <p key={schedule.id}>
                                    {schedule.displayDays}: {schedule.isClosed ? 'Cerrado' : `${formatTimeDisplay(schedule.openTime)} - ${formatTimeDisplay(schedule.closeTime)}`}
                                </p>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                        El número indica el orden de visualización. Puedes cambiarlo editando cada horario.
                    </p>
                </div>
            )}

            {showModal && (
                <ScheduleModal
                    schedule={editing}
                    defaultType={getTabType()}
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

interface ScheduleModalProps {
    schedule: Schedule | null;
    defaultType: 'REGULAR' | 'SPECIAL' | 'OVERRIDE';
    onClose: () => void;
    onSave: (data: ScheduleInput) => void;
    isLoading: boolean;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ schedule, defaultType, onClose, onSave, isLoading }) => {
    const [scheduleType] = useState(schedule?.scheduleType || defaultType);
    const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(schedule?.daysOfWeek || []);
    const [startDate, setStartDate] = useState(schedule?.startDate || '');
    const [endDate, setEndDate] = useState(schedule?.endDate || '');
    const [isDateRange, setIsDateRange] = useState(!!schedule?.endDate);
    const [openTime, setOpenTime] = useState(schedule?.openTime || '09:00');
    const [closeTime, setCloseTime] = useState(schedule?.closeTime || '21:00');
    const [isClosed, setIsClosed] = useState(schedule?.isClosed ?? false);
    const [description, setDescription] = useState(schedule?.description || '');
    const [displayOrder, setDisplayOrder] = useState(schedule?.displayOrder ?? 0);
    const [expiresAt, setExpiresAt] = useState(schedule?.expiresAt || '');
    const [hasExpiration, setHasExpiration] = useState(!!schedule?.expiresAt);

    const toggleDay = (day: DayOfWeek) => {
        setSelectedDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const selectWeekdays = () => {
        setSelectedDays(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']);
    };

    const selectWeekend = () => {
        setSelectedDays(['SATURDAY', 'SUNDAY']);
    };

    const selectAllDays = () => {
        setSelectedDays(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data: ScheduleInput = {
            scheduleType,
            isClosed,
            description: description || undefined,
        };

        if (scheduleType === 'REGULAR') {
            data.daysOfWeek = selectedDays;
            data.displayOrder = displayOrder;
        }

        if (scheduleType === 'SPECIAL') {
            data.startDate = startDate;
            data.endDate = isDateRange ? endDate : undefined;
        }

        if (scheduleType === 'OVERRIDE') {
            data.expiresAt = hasExpiration ? expiresAt : undefined;
        }

        if (!isClosed) {
            data.openTime = openTime;
            data.closeTime = closeTime;
        }

        onSave(data);
    };

    const getTitle = () => {
        const action = schedule ? 'Editar' : 'Nuevo';
        if (scheduleType === 'REGULAR') return `${action} Horario Regular`;
        if (scheduleType === 'SPECIAL') return `${action} Fecha Especial`;
        return `${action} Excepción`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-border sticky top-0 bg-card">
                    <h3 className="text-lg font-semibold">{getTitle()}</h3>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* REGULAR: Day selection */}
                    {scheduleType === 'REGULAR' && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Días de la semana</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {DAYS.map((day) => (
                                    <button
                                        key={day.value}
                                        type="button"
                                        onClick={() => toggleDay(day.value)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedDays.includes(day.value)
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted hover:bg-muted/80'
                                            }`}
                                    >
                                        {day.short}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-2 text-xs">
                                <button type="button" onClick={selectWeekdays} className="text-primary hover:underline">
                                    Lun-Vie
                                </button>
                                <span className="text-muted-foreground">•</span>
                                <button type="button" onClick={selectWeekend} className="text-primary hover:underline">
                                    Sáb-Dom
                                </button>
                                <span className="text-muted-foreground">•</span>
                                <button type="button" onClick={selectAllDays} className="text-primary hover:underline">
                                    Todos
                                </button>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-1">Orden de visualización</label>
                                <input
                                    type="number"
                                    value={displayOrder}
                                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                                    min="0"
                                    className="w-24 px-3 py-2 border border-input rounded-md bg-background"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Número menor aparece primero en la página
                                </p>
                            </div>
                        </div>
                    )}

                    {/* SPECIAL: Date selection */}
                    {scheduleType === 'SPECIAL' && (
                        <div className="space-y-3">
                            <div>
                                <label className="flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={isDateRange}
                                        onChange={(e) => setIsDateRange(e.target.checked)}
                                        className="rounded"
                                    />
                                    <span className="text-sm font-medium">Rango de fechas</span>
                                </label>
                            </div>
                            <div className={`grid gap-4 ${isDateRange ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        {isDateRange ? 'Fecha inicio' : 'Fecha'}
                                    </label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                        required
                                    />
                                </div>
                                {isDateRange && (
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Fecha fin</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            min={startDate}
                                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* OVERRIDE: Expiration */}
                    {scheduleType === 'OVERRIDE' && (
                        <div className="space-y-3">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={hasExpiration}
                                    onChange={(e) => setHasExpiration(e.target.checked)}
                                    className="rounded"
                                />
                                <span className="text-sm font-medium">Tiene fecha de expiración</span>
                            </label>
                            {hasExpiration && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Expira el</label>
                                    <input
                                        type="date"
                                        value={expiresAt}
                                        onChange={(e) => setExpiresAt(e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                        required
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Descripción {scheduleType !== 'REGULAR' && <span className="text-muted-foreground">(recomendado)</span>}
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={
                                scheduleType === 'REGULAR' ? 'Ej: Horario entre semana' :
                                    scheduleType === 'SPECIAL' ? 'Ej: Navidad, Vacaciones de verano' :
                                        'Ej: Cerrado por remodelación'
                            }
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                    </div>

                    {/* Closed toggle */}
                    <div className="p-3 bg-muted/50 rounded-lg">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isClosed}
                                onChange={(e) => setIsClosed(e.target.checked)}
                                className="rounded"
                            />
                            <span className="text-sm font-medium">Cerrado {scheduleType === 'REGULAR' ? 'estos días' : ''}</span>
                        </label>
                    </div>

                    {/* Time inputs */}
                    {!isClosed && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Hora apertura</label>
                                <input
                                    type="time"
                                    value={openTime}
                                    onChange={(e) => setOpenTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Hora cierre</label>
                                <input
                                    type="time"
                                    value={closeTime}
                                    onChange={(e) => setCloseTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Validation message */}
                    {scheduleType === 'REGULAR' && selectedDays.length === 0 && (
                        <p className="text-sm text-destructive">Selecciona al menos un día</p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 justify-end pt-4 border-t border-border">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || (scheduleType === 'REGULAR' && selectedDays.length === 0)}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SchedulePage;
