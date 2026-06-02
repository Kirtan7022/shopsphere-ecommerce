import API from './api';

export const createOrder = (orderData) => API.post('/orders', orderData);
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const getUserOrders = () => API.get('/orders/my-orders');
