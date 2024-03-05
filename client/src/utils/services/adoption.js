import axios from "./axios";

export const getAdoption = async (id) => await axios.get(`/adoption/${id}`);
export const getAdoptions = async () => await axios.get("/adoptions");
export const postAdoption = async (adoption) => await axios.post("/adoption", adoption);
export const putAdoption = async (id, adoption) => await axios.put(`/adoption/${id}`, adoption);
export const deleteAdoption = async (id) => await axios.delete(`/adoption/${id}`);
export const verifyAdoption = async (id) => await axios.get(`/adoption/verify/${id}`);