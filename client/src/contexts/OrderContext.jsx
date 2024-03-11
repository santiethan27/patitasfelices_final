import React, { createContext, useContext, useState, useEffect } from 'react';
import { getOrders, postOrder, updateOrder, deleteOrder } from '../utils/services/order';

// Creamos el contexto
const OrderContext = createContext();

// Hook personalizado para acceder al contexto
export const useOrder = () => useContext(OrderContext);

// Proveedor del contexto
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const addOrder = async (newOrder) => {
    try {
      const response = await postOrder(newOrder);
      setOrders([...orders, response.data]);
      console.log(response.data);
      return response.data._id;
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const updateOrderById = async (id, updatedOrder) => {
    try {
      await updateOrder(id, updatedOrder);
      const updatedOrders = orders.map(order => order._id === id ? updatedOrder : order);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const deleteOrderById = async (id) => {
    try {
      await deleteOrder(id);
      const updatedOrders = orders.filter(order => order._id !== id);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderById, deleteOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};
