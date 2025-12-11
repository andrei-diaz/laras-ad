import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, X, AlertCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning';

export interface ToastData {
    message: string;
    type: ToastType;
}

interface ToastProps extends ToastData {
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation
        setTimeout(() => setIsVisible(true), 10);

        // Auto close after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        warning: 'bg-amber-500',
    }[type];

    const Icon = {
        success: CheckCircle2,
        error: XCircle,
        warning: AlertCircle,
    }[type];

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white transition-all duration-300 ${bgColor} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
        >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{message}</span>
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="ml-2 p-1 hover:bg-white/20 rounded transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

// Hook for easy toast management
export const useToast = () => {
    const [toast, setToast] = useState<ToastData | null>(null);

    const showToast = (message: string, type: ToastType = 'success') => {
        setToast({ message, type });
    };

    const hideToast = () => setToast(null);

    return { toast, showToast, hideToast };
};

export default Toast;
