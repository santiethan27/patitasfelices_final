import { createContext, useContext, useState } from "react";
import { deleteAnimal, getAnimal, getAnimals, postAnimal, putAnimal } from '../api/animal.js';

export const AnimalContext = createContext();

export const useAnimal = () => {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error("El useAuth debe estar dentro del contexto");
    }
    return context;
}

export const AnimalProvider = ({ children }) => {

    const [animals, setAnimals] = useState([]);

    const _getAnimal = async (id) => {
        try {
            const animal = await getAnimal(id);
            return animal.data;
        } catch (error) {
            console.log(error);
        }
    }

    const _getAnimals = async () => {
        try {
            const resAnimals = await getAnimals();
            setAnimals(resAnimals.data);
        } catch (error) {
            console.log(error);
        }
    }

    const _postAnimals = async (animal) => {
        try {
            await postAnimal(animal);
        } catch (error) {
            console.log(error);
        }
    }
    const _putAnimal = async (animal) => {
        try {
            const resAnimal = await putAnimal(animal);
            await _getAnimals();
            return resAnimal.data;
        } catch (error) {
            console.log(error);
        }
    }
    const _deleteAnimal = async (id) => {
        try {
            const resAnimal = await deleteAnimal(id);
            if (resAnimal.status === 200) setAnimals(animals.filter((animal) => animal._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AnimalContext.Provider value={{ _getAnimal, _getAnimals, _postAnimals, _putAnimal, _deleteAnimal, animals }}>
            {children}
        </AnimalContext.Provider>
    )
}