import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {

    const { user, isAuthen, loading } = useAuth();

    if(loading) return <h5>Cargando ...</h5>
    if(!isAuthen && !isAuthen) return <Navigate to='/auth' replace/>

    return (
        <Outlet/>
    )
}

export default ProtectedRoute