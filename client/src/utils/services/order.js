import axios from './axios';

export const getOrder = async (id) => axios.get(`/order/${id}`);
export const getOrders = async () => axios.get('/orders');
export const postOrder = async (order) => axios.post('/order', order);
export const updateOrder = async (id, order) => axios.patch(`/order/${id}`, order);
export const deleteOrder = async (id) => axios.delete(`/order/${id}`);