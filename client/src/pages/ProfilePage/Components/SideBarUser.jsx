import React from 'react'
import './SideBarUser.css'
import SideBar from './../../../components/SideBar/SideBar';
import { NavLink } from 'react-router-dom';

function SideBarUser() {
    return (
        <SideBar>
            <ul>
                <li><NavLink to={'/perfil'}>Perfil</NavLink></li>
                <li><NavLink to={'/cuenta'}>Cuenta</NavLink></li>
                <li><NavLink to={'/usuario/entrevistas'}>Entrevistas</NavLink></li>
                <li><NavLink to={'/cuenta'}>Mis reportes</NavLink></li>
            </ul>
        </SideBar>
    )
}

export default SideBarUser