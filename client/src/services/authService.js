import API from './api';

export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
export const getUserProfile = () => API.get('/auth/profile');
export const updateUserProfile = (data) => API.put('/auth/profile', data);
export const logoutUser = () => API.post('/auth/logout');
export const forgotPasswordApi = (email) => API.post('/auth/forgot-password', { email });
export const resetPasswordApi = (token, passwords) => API.put(`/auth/reset-password/${token}`, passwords);
