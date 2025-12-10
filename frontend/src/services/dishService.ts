import api from './api';

export interface Dish {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    isAvailable: boolean;
    displayOrder: number;
    categoryId: number;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
}

export interface DishInput {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    isAvailable?: boolean;
    displayOrder?: number;
    categoryId: number;
}

export const dishService = {
    // Public endpoints
    getAvailableDishes: async (): Promise<Dish[]> => {
        const response = await api.get<Dish[]>('/menu');
        return response.data;
    },

    getAvailableDishesByCategory: async (categoryId: number): Promise<Dish[]> => {
        const response = await api.get<Dish[]>(`/menu/category/${categoryId}`);
        return response.data;
    },

    getDishById: async (id: number): Promise<Dish> => {
        const response = await api.get<Dish>(`/menu/${id}`);
        return response.data;
    },

    // Admin endpoints
    getAllDishes: async (): Promise<Dish[]> => {
        const response = await api.get<Dish[]>('/admin/dishes');
        return response.data;
    },

    getDishesByCategory: async (categoryId: number): Promise<Dish[]> => {
        const response = await api.get<Dish[]>(`/admin/dishes/category/${categoryId}`);
        return response.data;
    },

    createDish: async (data: DishInput): Promise<Dish> => {
        const response = await api.post<Dish>('/admin/dishes', data);
        return response.data;
    },

    updateDish: async (id: number, data: DishInput): Promise<Dish> => {
        const response = await api.put<Dish>(`/admin/dishes/${id}`, data);
        return response.data;
    },

    deleteDish: async (id: number): Promise<void> => {
        await api.delete(`/admin/dishes/${id}`);
    },

    toggleAvailability: async (id: number): Promise<void> => {
        await api.patch(`/admin/dishes/${id}/toggle-availability`);
    },

    // Image upload
    uploadImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post<{ url: string }>('/admin/upload/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.url;
    },
};

export default dishService;
