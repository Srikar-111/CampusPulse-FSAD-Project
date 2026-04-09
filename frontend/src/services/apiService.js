import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (name, email, password, role) => api.post('/auth/register', { name, email, password, role }),
};

// Club APIs
export const clubAPI = {
    getAll: () => api.get('/clubs'),
    getById: (id) => api.get(`/clubs/${id}`),
    search: (name) => api.get('/clubs/search', { params: { name } }),
    create: (clubData) => api.post('/clubs', clubData),
    update: (id, clubData) => api.put(`/clubs/${id}`, clubData),
    delete: (id) => api.delete(`/clubs/${id}`),
};

// Event APIs
export const eventAPI = {
    getAll: () => api.get('/events'),
    getUpcoming: () => api.get('/events/upcoming'),
    getById: (id) => api.get(`/events/${id}`),
    getByClub: (clubId) => api.get(`/events/club/${clubId}`),
    search: (query) => api.get('/events/search', { params: { query } }),
    getByCategory: (category) => api.get(`/events/category/${category}`),
    create: (eventData) => api.post('/events', eventData),
    update: (id, eventData) => api.put(`/events/${id}`, eventData),
    delete: (id) => api.delete(`/events/${id}`),
};

// Registration APIs
export const registrationAPI = {
    getMyRegistrations: () => api.get('/registrations/my'),
    registerForEvent: (eventId) => api.post(`/registrations/event/${eventId}`),
    cancelRegistration: (eventId) => api.delete(`/registrations/event/${eventId}`),
    getEventRegistrations: (eventId) => api.get(`/registrations/event/${eventId}`),
};

// User APIs
export const userAPI = {
    getCurrentUser: () => api.get('/users/me'),
    getAllUsers: () => api.get('/users'),
    getStats: () => api.get('/users/stats'),
};

export default api;
