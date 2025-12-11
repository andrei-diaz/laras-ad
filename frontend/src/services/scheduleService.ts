import api from './api';

export type ScheduleType = 'REGULAR' | 'SPECIAL' | 'OVERRIDE';
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface Schedule {
    id: number;
    scheduleType: ScheduleType;
    daysOfWeek?: DayOfWeek[];
    startDate?: string;
    endDate?: string;
    openTime?: string;
    closeTime?: string;
    isClosed: boolean;
    description?: string;
    priority: number;
    displayOrder: number;
    expiresAt?: string;
    createdAt: string;
    updatedAt: string;
    // Display helpers from backend
    displayDays?: string;
    displayDateRange?: string;
}

export interface ScheduleInput {
    scheduleType: ScheduleType;
    daysOfWeek?: DayOfWeek[];
    startDate?: string;
    endDate?: string;
    openTime?: string;
    closeTime?: string;
    isClosed?: boolean;
    description?: string;
    priority?: number;
    displayOrder?: number;
    expiresAt?: string;
}

export interface RestaurantStatus {
    isOpen: boolean;
    statusMessage: string;
    openTime?: string;
    closeTime?: string;
    nextStatusChange?: string;
}

export const scheduleService = {
    getStatus: async (): Promise<RestaurantStatus> => {
        const response = await api.get<RestaurantStatus>('/status');
        return response.data;
    },

    getPublicSchedule: async (): Promise<Schedule[]> => {
        const response = await api.get<Schedule[]>('/schedule');
        return response.data;
    },

    getActiveSpecialSchedules: async (): Promise<Schedule[]> => {
        const response = await api.get<Schedule[]>('/schedule/special');
        return response.data;
    },

    getRegularSchedules: async (): Promise<Schedule[]> => {
        const response = await api.get<Schedule[]>('/admin/schedules/regular');
        return response.data;
    },

    getSpecialSchedules: async (): Promise<Schedule[]> => {
        const response = await api.get<Schedule[]>('/admin/schedules/special');
        return response.data;
    },

    getOverrides: async (): Promise<Schedule[]> => {
        const response = await api.get<Schedule[]>('/admin/schedules/overrides');
        return response.data;
    },

    createSchedule: async (data: ScheduleInput): Promise<Schedule> => {
        const response = await api.post<Schedule>('/admin/schedules', data);
        return response.data;
    },

    updateSchedule: async (id: number, data: ScheduleInput): Promise<Schedule> => {
        const response = await api.put<Schedule>(`/admin/schedules/${id}`, data);
        return response.data;
    },

    deleteSchedule: async (id: number): Promise<void> => {
        await api.delete(`/admin/schedules/${id}`);
    },
};

export default scheduleService;
