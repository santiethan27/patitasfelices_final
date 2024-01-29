import axios from 'axios'

const API = 'http://localhost:3000/api';
export const authLogin = user => axios.post(`${API}/login`, user);
export const authRegister = user => axios.post(`${API}/register`, user);