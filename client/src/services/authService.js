import API from './api';

export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
export const getUserProfile = () => API.get('/auth/profile');
export const updateUserProfile = (data) => API.put('/auth/profile', data);
