import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gedToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// Category APIs
export const getCategories = () => api.get('/categories');
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Food APIs - IMPORTANT: Order matters
export const getPublicFoods = (params) => api.get('/foods/public', { params });
export const getAllFoods = (params) => api.get('/foods', { params });
export const getPopularFoods = () => api.get('/foods/popular');
export const getFoodById = (id) => api.get(`/foods/${id}`);
export const createFood = (data) => api.post('/foods', data);
export const updateFood = (id, data) => api.put(`/foods/${id}`, data);
export const toggleFoodActive = (id) => api.put(`/foods/toggle-active/${id}`);  // Correct endpoint
export const deleteFood = (id) => api.delete(`/foods/${id}`);

// Order APIs
export const createOrder = (data) => api.post('/orders', data);
export const getUserOrders = () => api.get('/orders/my-orders');
export const getAllOrders = () => api.get('/orders/all');
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });

// Reservation APIs
export const createReservation = (data) => api.post('/reservations', data);
export const getUserReservations = () => api.get('/reservations/my-reservations');
export const getAllReservations = () => api.get('/reservations/all');
export const updateReservationStatus = (id, status) => api.put(`/reservations/${id}/status`, { status });
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);

export default api;
