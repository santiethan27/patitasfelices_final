import { createContext, useState, useContext, useEffect } from "react";
import { authRegister, authLogin, verityTokenRequest, logout } from '../utils/services/auth';
import Cookies from 'js-cookie'
import { deleteUser, getUsers, profile, update } from '../utils/services/user';

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("El useAuth deberia estar dentro de un AuthProvider")
    }
    return context;
}


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isAuthen, setIsAuthen] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rol, setRol] = useState(null);

    const signup = async (user) => {
        try {
            const res = await authRegister(user);
            console.log(res.data);
            setUser(res.data);
            setRol(res.data?.rol);
            setIsAuthen(true)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }
    const login = async (user) => {
        try {
            const res = await authLogin(user);
            setUser(res.data);
            setRol(res.data?.rol);
            setIsAuthen(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message])
        }
    }
    const getProfile = async (user) => {
        try {
            const res = await profile(user);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
    const updateUser = async (id, user) => {
        try {
            const res = await update(id, user);
            await _getUsers();
            setUser(res.data);
        } catch (error) {
            console.error(error)
        }
    }
    const _getUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
            return res.data;
        } catch (error) {
            console.error(error)
        }
    }
    const _deleteUser = async (id) => {
        try {
            const deletUser = await deleteUser(id);
            if (deletUser.status === 200) setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error(error);
        }
    }
    const _logout = async () => {
        try {
            logout();
            setIsAuthen(false);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthen(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verityTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuthen(false);
                    setLoading(false);
                    return;
                }
                setLoading(false);
                setIsAuthen(true);
                setUser(res.data);
                setRol(res.data?.rol);
            } catch (error) {
                setIsAuthen(false);
                setUser(null);
                setLoading(false);
            }
        }

        checkLogin();
    }, []);


    return (
        <AuthContext.Provider value={{ signup, login, user,users, isAuthen, errors, loading, rol, getProfile, updateUser, _logout, _getUsers, _deleteUser }}>
            {children}
        </AuthContext.Provider>
    )
}