import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Attach the stored token to every outgoing request, if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerRequest = (payload) => api.post('/auth/register', payload);
export const loginRequest = (payload) => api.post('/auth/login', payload);
export const getMeRequest = () => api.get('/auth/me');

export default api;
