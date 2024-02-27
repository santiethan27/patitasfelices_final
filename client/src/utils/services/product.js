import axios from "./axios";

export const getProduct = async (id) => axios.get(`/product/${id}`);
export const getProducts = async () => axios.get("/products");
export const postProduct = async (product) => axios.post("/product", product);
export const putProduct = async (product) => axios.put("/product", product);
export const deleteProduct = async (id) => axios.delete(`/product/${id}`);