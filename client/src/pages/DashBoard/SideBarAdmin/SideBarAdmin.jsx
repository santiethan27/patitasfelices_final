import React from 'react'
import SideBar from './../../../components/SideBar/SideBar';
import { NavLink } from 'react-router-dom';

function SideBarAdmin() {
    return (
        <SideBar>          <ul>
            <li><NavLink to={'/administracion/inicio'}>Inicio</NavLink></li>
            <li><NavLink to={'/administracion/productos'}>Productos</NavLink></li>
            <li><NavLink to={'/administracion/mascotas'}>Mascotas</NavLink></li>
            <li><NavLink to={'/administracion/usuarios'}>Usuarios</NavLink></li>
            <li><NavLink to={'/administracion/reportes'}>Reportes</NavLink></li>
            <li><NavLink to={'/administracion/entrevistas'}>Entrevistas</NavLink></li>
        </ul></SideBar>
    )
}

export default SideBarAdmin