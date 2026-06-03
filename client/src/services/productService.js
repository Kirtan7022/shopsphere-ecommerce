import API from './api';

export const getAllProducts = (params) => API.get('/products', { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const getProductCategories = () => API.get('/products/categories');
export const getTopProducts = (limit = 5) => API.get('/products/top', { params: { limit } });

// Admin endpoints
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Reviews
export const createReview = (id, reviewData) => API.post(`/products/${id}/reviews`, reviewData);
