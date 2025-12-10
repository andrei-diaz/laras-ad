import api from './api';

export interface MenuTemplateItem {
    id: number;
    menuSection: string;
    menuNumber: number;
    name: string;
    description?: string;
    price?: number;
    priceHalf?: number;
    priceFull?: number;
    priceLabel1?: string;
    price1?: number;
    priceLabel2?: string;
    price2?: number;
    positionTop?: string;
    positionLeft?: string;
    positionWidth?: string;
    minHeight?: string;
    displayOrder: number;
    styleVariant?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface MenuTemplateItemInput {
    menuSection: string;
    menuNumber?: number;
    name: string;
    description?: string;
    price?: number;
    priceHalf?: number;
    priceFull?: number;
    priceLabel1?: string;
    price1?: number;
    priceLabel2?: string;
    price2?: number;
    positionTop?: string;
    positionLeft?: string;
    positionWidth?: string;
    minHeight?: string;
    displayOrder?: number;
    styleVariant?: string;
    isActive?: boolean;
}

export const menuTemplateService = {
    // Public
    getActiveItems: async (): Promise<MenuTemplateItem[]> => {
        const response = await api.get<MenuTemplateItem[]>('/menu-template');
        return response.data;
    },

    getActiveItemsByMenu: async (menuNumber: number): Promise<MenuTemplateItem[]> => {
        const response = await api.get<MenuTemplateItem[]>(`/menu-template/${menuNumber}`);
        return response.data;
    },

    // Admin
    getAllItems: async (): Promise<MenuTemplateItem[]> => {
        const response = await api.get<MenuTemplateItem[]>('/admin/menu-template');
        return response.data;
    },

    getItemsBySection: async (section: string): Promise<MenuTemplateItem[]> => {
        const response = await api.get<MenuTemplateItem[]>(`/admin/menu-template/section/${section}`);
        return response.data;
    },

    getItemById: async (id: number): Promise<MenuTemplateItem> => {
        const response = await api.get<MenuTemplateItem>(`/admin/menu-template/item/${id}`);
        return response.data;
    },

    createItem: async (data: MenuTemplateItemInput): Promise<MenuTemplateItem> => {
        const response = await api.post<MenuTemplateItem>('/admin/menu-template', data);
        return response.data;
    },

    updateItem: async (id: number, data: MenuTemplateItemInput): Promise<MenuTemplateItem> => {
        const response = await api.put<MenuTemplateItem>(`/admin/menu-template/${id}`, data);
        return response.data;
    },

    deleteItem: async (id: number): Promise<void> => {
        await api.delete(`/admin/menu-template/${id}`);
    },

    toggleActive: async (id: number): Promise<void> => {
        await api.patch(`/admin/menu-template/${id}/toggle-active`);
    },
};

export default menuTemplateService;
