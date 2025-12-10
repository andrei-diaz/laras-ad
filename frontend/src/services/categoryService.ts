import api from './api';

export interface Category {
    id: number;
    name: string;
    description?: string;
    displayOrder: number;
    isActive: boolean;
    dishCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryInput {
    name: string;
    description?: string;
    displayOrder?: number;
    isActive?: boolean;
}

export const categoryService = {
    // Public endpoints
    getActiveCategories: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },

    getCategoryById: async (id: number): Promise<Category> => {
        const response = await api.get<Category>(`/categories/${id}`);
        return response.data;
    },

    // Admin endpoints
    getAllCategories: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>('/admin/categories');
        return response.data;
    },

    createCategory: async (data: CategoryInput): Promise<Category> => {
        const response = await api.post<Category>('/admin/categories', data);
        return response.data;
    },

    updateCategory: async (id: number, data: CategoryInput): Promise<Category> => {
        const response = await api.put<Category>(`/admin/categories/${id}`, data);
        return response.data;
    },

    deleteCategory: async (id: number): Promise<void> => {
        await api.delete(`/admin/categories/${id}`);
    },

    reorderCategories: async (categoryIds: number[]): Promise<void> => {
        await api.put('/admin/categories/reorder', categoryIds);
    },
};

export default categoryService;
