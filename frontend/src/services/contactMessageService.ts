import api from './api';

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone?: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ContactMessageInput {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export const contactMessageService = {
    submitContactForm: async (data: ContactMessageInput): Promise<ContactMessage> => {
        const response = await api.post<ContactMessage>('/contact', data);
        return response.data;
    },

    getAllMessages: async (): Promise<ContactMessage[]> => {
        const response = await api.get<ContactMessage[]>('/admin/messages');
        return response.data;
    },

    getUnreadMessages: async (): Promise<ContactMessage[]> => {
        const response = await api.get<ContactMessage[]>('/admin/messages/unread');
        return response.data;
    },

    getUnreadCount: async (): Promise<number> => {
        const response = await api.get<{ unread: number }>('/admin/messages/count');
        return response.data.unread;
    },

    markAsRead: async (id: number): Promise<void> => {
        await api.patch(`/admin/messages/${id}/read`);
    },

    markAsUnread: async (id: number): Promise<void> => {
        await api.patch(`/admin/messages/${id}/unread`);
    },

    deleteMessage: async (id: number): Promise<void> => {
        await api.delete(`/admin/messages/${id}`);
    },
};

export default contactMessageService;
