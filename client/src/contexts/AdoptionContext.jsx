import { createContext, useContext, useState } from "react";
import { deleteAdoption, getAdoption, getAdoptions, postAdoption, putAdoption, verifyAdoption } from "../utils/services/adoption";

export const AdoptionContext = createContext();

export const useAdoption = () => {
    const context = useContext(AdoptionContext);
    if (!context) {
        throw new Error("El useAuth debe estar dentro del contexto");
    }
    return context;
}

export const AdoptionProvider = ({ children }) => {

    const [adoptions, setAdoptions] = useState([]);

    const _getAdoption = async (id) => {
        try {
            const adoption = await getAdoption(id);
            return adoption.data;
        } catch (error) {
            console.log(error);
        }
    }
    const _verifyAdoption = async (id) => {
        try {
            const resVerify = await verifyAdoption(id);
            return resVerify.data.status;
        } catch (error) {
            console.log(error);
        }
    }
    const _getAdoptions = async () => {
        try {
            const resAdoptions = await getAdoptions();
            setAdoptions(resAdoptions.data);
        } catch (error) {
            console.log(error);
        }
    }

    const _postAdoption = async (animal) => {
        try {
            await postAdoption(animal);
            await _getAdoptions();
        } catch (error) {
            console.log(error);
        }
    }
    const _putAdoption = async (animal, data) => {
        try {
            const resAdoption = await putAdoption(animal, data);
            await _getAdoptions();
            return resAdoption.data;
        } catch (error) {
            console.log(error);
        }
    }
    const _deleteAdoption = async (id) => {
        try {
            const resAdoption = await deleteAdoption(id);
            if (resAdoption.status === 200) setAdoptions(adoptions.filter((adoption) => adoption._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AdoptionContext.Provider value={{ _verifyAdoption, adoptions, _getAdoptions, _getAdoption, _putAdoption, _deleteAdoption, _postAdoption }}>
            {children}
        </AdoptionContext.Provider>
    )
}