import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import scheduleService, { Schedule, ScheduleInput, DayOfWeek } from '../../services/scheduleService';
import { Plus, Pencil, Trash2, Clock, Calendar, AlertCircle } from 'lucide-react';

const DAYS: { value: DayOfWeek; label: string }[] = [
    { value: 'MONDAY', label: 'Lunes' },
    { value: 'TUESDAY', label: 'Martes' },
    { value: 'WEDNESDAY', label: 'Miércoles' },
    { value: 'THURSDAY', label: 'Jueves' },
    { value: 'FRIDAY', label: 'Viernes' },
    { value: 'SATURDAY', label: 'Sábado' },
    { value: 'SUNDAY', label: 'Domingo' },
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

    const createMutation = useMutation({
        mutationFn: scheduleService.createSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['regular-schedules'] });
            queryClient.invalidateQueries({ queryKey: ['special-schedules'] });
            queryClient.invalidateQueries({ queryKey: ['overrides'] });
            setShowModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: ScheduleInput }) =>
            scheduleService.updateSchedule(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['regular-schedules'] });
            queryClient.invalidateQueries({ queryKey: ['special-schedules'] });
            queryClient.invalidateQueries({ queryKey: ['overrides'] });
            setShowModal(false);
            setEditing(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: scheduleService.deleteSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['regular-schedules'] });
            queryClient.invalidateQueries({ queryKey: ['special-schedules'] });
            queryClient.invalidateQueries({ queryKey: ['overrides'] });
        },
    });

    const handleDelete = (id: number) => {
        if (window.confirm('¿Eliminar este horario?')) {
            deleteMutation.mutate(id);
        }
    };

    const currentSchedules = activeTab === 'regular' ? regularSchedules : activeTab === 'special' ? specialSchedules : overrides;

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
                    <div className={`p-4 rounded-lg mb-6 ${status.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
                        { key: 'regular', label: 'Horario Regular' },
                        { key: 'special', label: 'Fechas Especiales' },
                        { key: 'overrides', label: 'Excepciones' },
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
            </div>

            {/* Schedule List */}
            <div className="bg-card rounded-lg border border-border">
                {currentSchedules.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No hay horarios configurados</div>
                ) : (
                    <div className="divide-y divide-border">
                        {currentSchedules.map((schedule) => (
                            <div key={schedule.id} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {activeTab === 'regular' ? (
                                        <Clock className="h-5 w-5 text-muted-foreground" />
                                    ) : activeTab === 'special' ? (
                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                                    )}
                                    <div>
                                        <p className="font-medium">
                                            {schedule.dayOfWeek ? DAYS.find(d => d.value === schedule.dayOfWeek)?.label : schedule.specialDate || schedule.description}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {schedule.isClosed ? (
                                                <span className="text-red-500">Cerrado</span>
                                            ) : (
                                                `${schedule.openTime} - ${schedule.closeTime}`
                                            )}
                                            {schedule.description && activeTab !== 'overrides' && ` • ${schedule.description}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditing(schedule); setShowModal(true); }} className="p-2 hover:bg-muted rounded">
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(schedule.id)} className="p-2 hover:bg-muted rounded text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <ScheduleModal
                    schedule={editing}
                    defaultType={activeTab.toUpperCase() as any}
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
    const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | ''>(schedule?.dayOfWeek || '');
    const [specialDate, setSpecialDate] = useState(schedule?.specialDate || '');
    const [openTime, setOpenTime] = useState(schedule?.openTime || '09:00');
    const [closeTime, setCloseTime] = useState(schedule?.closeTime || '21:00');
    const [isClosed, setIsClosed] = useState(schedule?.isClosed ?? false);
    const [description, setDescription] = useState(schedule?.description || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            scheduleType,
            dayOfWeek: dayOfWeek || undefined,
            specialDate: specialDate || undefined,
            openTime: isClosed ? undefined : openTime,
            closeTime: isClosed ? undefined : closeTime,
            isClosed,
            description: description || undefined,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
                <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">{schedule ? 'Editar Horario' : 'Nuevo Horario'}</h3>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {scheduleType === 'REGULAR' && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Día de la semana</label>
                            <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value as DayOfWeek)} className="w-full px-3 py-2 border border-input rounded-md bg-background" required>
                                <option value="">Seleccionar...</option>
                                {DAYS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </div>
                    )}
                    {scheduleType === 'SPECIAL' && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Fecha</label>
                            <input type="date" value={specialDate} onChange={(e) => setSpecialDate(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background" required />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium mb-1">Descripción</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ej: Navidad, Vacaciones" className="w-full px-3 py-2 border border-input rounded-md bg-background" />
                    </div>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={isClosed} onChange={(e) => setIsClosed(e.target.checked)} className="rounded" />
                        <span className="text-sm">Cerrado este día</span>
                    </label>
                    {!isClosed && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Hora apertura</label>
                                <input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Hora cierre</label>
                                <input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} className="w-full px-3 py-2 border border-input rounded-md bg-background" required />
                            </div>
                        </div>
                    )}
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

export default SchedulePage;
