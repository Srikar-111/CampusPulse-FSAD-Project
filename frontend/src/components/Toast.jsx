import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
        warning: <AlertCircle className="w-5 h-5" />,
        info: <AlertCircle className="w-5 h-5" />,
    };

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-amber-500',
        info: 'bg-electric-500',
    };

    const bgColors = {
        success: 'bg-green-500/10 border-green-500/30',
        error: 'bg-red-500/10 border-red-500/30',
        warning: 'bg-amber-500/10 border-amber-500/30',
        info: 'bg-electric-500/10 border-electric-500/30',
    };

    const textColors = {
        success: 'text-green-700',
        error: 'text-red-700',
        warning: 'text-amber-700',
        info: 'text-electric-500',
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-md shadow-2xl max-w-md ${bgColors[type]}`}
        >
            <div className={`${colors[type]} text-white rounded-full p-1`}>
                {icons[type]}
            </div>
            <span className={`font-medium ${textColors[type]}`}>{message}</span>
            <button
                onClick={onClose}
                className={`ml-auto p-1 rounded-lg hover:bg-black/10 transition-colors ${textColors[type]}`}
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export const useToast = () => {
    const showToast = (message, type = 'info') => {
        const event = new CustomEvent('toast', { detail: { message, type } });
        window.dispatchEvent(event);
    };

    return {
        success: (message) => showToast(message, 'success'),
        error: (message) => showToast(message, 'error'),
        warning: (message) => showToast(message, 'warning'),
        info: (message) => showToast(message, 'info'),
    };
};

export const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (e) => {
            const id = Date.now();
            setToasts(prev => [...prev, { id, ...e.detail }]);
        };

        window.addEventListener('toast', handleToast);
        return () => window.removeEventListener('toast', handleToast);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            <AnimatePresence>
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
