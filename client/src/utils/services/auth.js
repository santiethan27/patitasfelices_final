import axios from "./axios";

export const authLogin = (user) => axios.post(`/login`, user);
export const authRegister = (user) => axios.post(`/register`, user);
export const verityTokenRequest = () => axios.get("/verify");
export const logout = () => axios.post("/logout");
