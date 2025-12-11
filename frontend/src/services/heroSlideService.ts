import api from './api';

export interface HeroSlide {
    id: number;
    imageUrl: string;
    title?: string;
    subtitle?: string;
    linkUrl?: string;
    displayOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface HeroSlideInput {
    imageUrl: string;
    title?: string;
    subtitle?: string;
    linkUrl?: string;
    displayOrder?: number;
    isActive?: boolean;
}

export const heroSlideService = {
    // Public - get active slides for homepage
    getActiveSlides: async (): Promise<HeroSlide[]> => {
        const response = await api.get<HeroSlide[]>('/hero-slides');
        return response.data;
    },

    // Admin - get all slides
    getAllSlides: async (): Promise<HeroSlide[]> => {
        const response = await api.get<HeroSlide[]>('/admin/hero-slides');
        return response.data;
    },

    getSlideById: async (id: number): Promise<HeroSlide> => {
        const response = await api.get<HeroSlide>(`/admin/hero-slides/${id}`);
        return response.data;
    },

    createSlide: async (data: HeroSlideInput): Promise<HeroSlide> => {
        const response = await api.post<HeroSlide>('/admin/hero-slides', data);
        return response.data;
    },

    updateSlide: async (id: number, data: HeroSlideInput): Promise<HeroSlide> => {
        const response = await api.put<HeroSlide>(`/admin/hero-slides/${id}`, data);
        return response.data;
    },

    deleteSlide: async (id: number): Promise<void> => {
        await api.delete(`/admin/hero-slides/${id}`);
    },

    toggleActive: async (id: number): Promise<void> => {
        await api.patch(`/admin/hero-slides/${id}/toggle-active`);
    },

    reorderSlides: async (orderedIds: number[]): Promise<void> => {
        await api.put('/admin/hero-slides/reorder', orderedIds);
    },
};

export default heroSlideService;
