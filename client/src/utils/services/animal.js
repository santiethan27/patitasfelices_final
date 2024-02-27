import axios from "./axios";

export const getAnimal = async (id) => axios.get(`/publication/${id}`);
export const getAnimals = async () => axios.get("/publications");
export const postAnimal = async (animal) => axios.post("/publication", animal);
export const putAnimal = async (animal) => axios.put("/publication", animal);
export const deleteAnimal = async (id) => axios.delete(`/publication/${id}`);