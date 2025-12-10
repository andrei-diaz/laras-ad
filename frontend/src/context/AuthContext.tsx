import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User, LoginRequest, AuthResponse } from '../services/authService';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing auth on mount
        const storedUser = authService.getUser();
        const token = authService.getToken();

        if (token && storedUser) {
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginRequest): Promise<void> => {
        const response: AuthResponse = await authService.login(credentials);
        authService.setAuth(response);
        setUser({
            username: response.username,
            email: response.email,
        });
    };

    const logout = (): void => {
        authService.logout();
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
