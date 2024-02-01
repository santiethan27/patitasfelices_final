import { createContext, useContext} from "react";
import {  profile, update  } from '../api/user.js';

export const UserContext = createContext();


export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("El useAuth deberia estar dentro de un AuthProvider")
    }
    return context;
}

export const UserProvider = ({children}) => {

    const getProfile = async(user) => {
        try {
            const res = await profile(user);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
    const updateUser = async(id, user) => {
        try {
            const res = await update(id, user);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <UserContext.Provider value={{getProfile, updateUser}}>
            {children}
        </UserContext.Provider>
    )

}
