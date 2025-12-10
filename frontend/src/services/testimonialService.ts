import api from './api';

export interface Testimonial {
    id: number;
    customerName: string;
    text: string;
    rating: number;
    isVisible: boolean;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
}

export interface TestimonialInput {
    customerName: string;
    text: string;
    rating?: number;
    isVisible?: boolean;
    displayOrder?: number;
}

export const testimonialService = {
    getVisibleTestimonials: async (): Promise<Testimonial[]> => {
        const response = await api.get<Testimonial[]>('/testimonials');
        return response.data;
    },

    getAllTestimonials: async (): Promise<Testimonial[]> => {
        const response = await api.get<Testimonial[]>('/admin/testimonials');
        return response.data;
    },

    createTestimonial: async (data: TestimonialInput): Promise<Testimonial> => {
        const response = await api.post<Testimonial>('/admin/testimonials', data);
        return response.data;
    },

    updateTestimonial: async (id: number, data: TestimonialInput): Promise<Testimonial> => {
        const response = await api.put<Testimonial>(`/admin/testimonials/${id}`, data);
        return response.data;
    },

    deleteTestimonial: async (id: number): Promise<void> => {
        await api.delete(`/admin/testimonials/${id}`);
    },
};

export default testimonialService;
