import { createContext, useState, useContext } from "react";
import { authRegister, authLogin } from '../api/auth';

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("El useAuth deberia estar dentro de un AuthProvider")
    }
    return context;
}


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthen, setIsAuthen] = useState(false)
    const [errors, setErrors] = useState([]);
    const signup = async (user) => {
        try {
            const res = await authRegister(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthen(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    }
    const login = async (user) => {
        try {
            const res = await authLogin(user);
            console.log(res.data);
            setUser(res.data);
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message])
        }
    }

    return (
        <AuthContext.Provider value={{ signup, login, user, isAuthen, errors }}>
            {children}
        </AuthContext.Provider>
    )
}