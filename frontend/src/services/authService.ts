import api from './api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    type: string;
    username: string;
    email: string;
}

export interface User {
    username: string;
    email: string;
}

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken: (): string | null => {
        return localStorage.getItem('token');
    },

    setAuth: (authResponse: AuthResponse) => {
        localStorage.setItem('token', authResponse.token);
        localStorage.setItem('user', JSON.stringify({
            username: authResponse.username,
            email: authResponse.email,
        }));
    },

    getUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    },
};

export default authService;
