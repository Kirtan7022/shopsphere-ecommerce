import API from './api';

export const getAllProducts = (params) => API.get('/products', { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const getProductCategories = () => API.get('/products/categories');
