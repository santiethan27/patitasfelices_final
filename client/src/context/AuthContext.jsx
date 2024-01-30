import { createContext, useState, useContext, useEffect } from "react";
import { authRegister, authLogin, verityTokenRequest } from '../api/auth';
import Cookies from 'js-cookie'

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
    const [loading, setLoading] = useState(true);
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
            setIsAuthen(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) 
            {
                setIsAuthen(false);
                setLoading(false);
                return setUser(null);
            }
                try {
                    const res = await verityTokenRequest(cookies.token)
                    console.log(res);
                    if (!res.data){
                        setIsAuthen(false);
                        setLoading(false);

                        return;
                    } 
                    setLoading(false);
                    setIsAuthen(true);
                    setUser(res.data);
                } catch (error) {
                    setIsAuthen(false);
                    setUser(null);
                    setLoading(false);
                }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ signup, login, user, isAuthen, errors, loading }}>
            {children}
        </AuthContext.Provider>
    )
}