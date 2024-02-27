import axios from './axios'

export const profile = async(user) => axios.get('/profile', user);
export const update = async (id, user) => axios.put(`/update-user/${id}`, user);
export const deleteUser = async (id) => axios.delete(`/user_delete/${id}`);
export const getUsers = async () => axios.get('/users');