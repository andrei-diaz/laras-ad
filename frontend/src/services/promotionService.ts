import api from './api';

export interface Promotion {
    id: number;
    title: string;
    description?: string;
    imageUrl?: string;
    startDate?: string;
    endDate?: string;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PromotionInput {
    title: string;
    description?: string;
    imageUrl?: string;
    startDate?: string;
    endDate?: string;
    isFeatured?: boolean;
    isActive?: boolean;
}

export const promotionService = {
    getActivePromotions: async (): Promise<Promotion[]> => {
        const response = await api.get<Promotion[]>('/promotions');
        return response.data;
    },

    getFeaturedPromotions: async (): Promise<Promotion[]> => {
        const response = await api.get<Promotion[]>('/promotions/featured');
        return response.data;
    },

    getAllPromotions: async (): Promise<Promotion[]> => {
        const response = await api.get<Promotion[]>('/admin/promotions');
        return response.data;
    },

    createPromotion: async (data: PromotionInput): Promise<Promotion> => {
        const response = await api.post<Promotion>('/admin/promotions', data);
        return response.data;
    },

    updatePromotion: async (id: number, data: PromotionInput): Promise<Promotion> => {
        const response = await api.put<Promotion>(`/admin/promotions/${id}`, data);
        return response.data;
    },

    deletePromotion: async (id: number): Promise<void> => {
        await api.delete(`/admin/promotions/${id}`);
    },
};

export default promotionService;
