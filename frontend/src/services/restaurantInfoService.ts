import api from './api';

export interface RestaurantInfo {
    id?: number;
    aboutUs?: string;
    mission?: string;
    values?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    whatsapp?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    bannerImageUrl?: string;
    logoUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const restaurantInfoService = {
    getInfo: async (): Promise<RestaurantInfo> => {
        const response = await api.get<RestaurantInfo>('/info');
        return response.data;
    },

    getAdminInfo: async (): Promise<RestaurantInfo> => {
        const response = await api.get<RestaurantInfo>('/admin/info');
        return response.data;
    },

    saveInfo: async (data: RestaurantInfo): Promise<RestaurantInfo> => {
        const response = await api.put<RestaurantInfo>('/admin/info', data);
        return response.data;
    },
};

export default restaurantInfoService;
