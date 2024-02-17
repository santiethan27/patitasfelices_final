import axios from './axios'

export const profile = async(user) => axios.get('/profile', user);
export const update = async (id, user) => axios.put(`/update-user/${id}`, user);