import axios from './axios';

export const getOrdersById = async (id) => axios.get(`/orderid/${id}`);
export const getOrders = async () => axios.get('/orders');
export const postOrder = async (order) => axios.post('/order', order);
export const updateOrder = async (id, order) => axios.patch(`/order/${id}`, order);
export const deleteOrder = async (id) => axios.delete(`/order/${id}`);