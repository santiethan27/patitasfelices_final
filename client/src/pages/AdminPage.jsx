import React from 'react'
import { useAuth } from '../context/AuthContext'
import './adminPage.css'
import { Link } from 'react-router-dom';

function AdminPage() {
    const { user } = useAuth();
    return (
        <div className='container-adminPage'>
            <h3>Bienvenido {user.name}, ¿Que quieres hacer hoy?</h3>
            <div className='section'>
                Productos
                <Link to={'/product'}>Agregar</Link>
            </div>
            <div className='section'>
                Mascotas
                <Link to={'/pet'}>Agregar</Link>
            </div>
        </div>
    )
}

export default AdminPage
