import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');

            if (storedUser && storedToken) {
                try {
                    const response = await userAPI.getCurrentUser();
                    setUser(response.data.data);
                    setToken(storedToken);
                } catch (error) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    setUser(null);
                    setToken(null);
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (email, password) => {
        const response = await authAPI.login(email, password);
        const { token, email: userEmail, name, role } = response.data.data;

        localStorage.setItem('token', token);
        const userData = { email: userEmail, name, role };
        localStorage.setItem('user', JSON.stringify(userData));

        setToken(token);
        setUser(userData);
        return response.data;
    };

    const register = async (name, email, password, role) => {
        const response = await authAPI.register(name, email, password, role);
        const { token: authToken, email: userEmail, name: userName, role: userRole } = response.data.data;

        localStorage.setItem('token', authToken);
        const userData = { email: userEmail, name: userName, role: userRole };
        localStorage.setItem('user', JSON.stringify(userData));

        setToken(authToken);
        setUser(userData);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'ADMIN',
        isStudent: user?.role === 'STUDENT',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
