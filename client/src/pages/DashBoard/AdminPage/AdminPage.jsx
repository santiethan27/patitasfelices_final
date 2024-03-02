import React, { useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './adminPage.css'
import { Link, NavLink } from 'react-router-dom';
import { useAnimal } from '../../../contexts/AnimalContext';
import { useProduct } from '../../../contexts/ProductContext';
import SideBar from '../../../components/SideBar/SideBar';

function AdminPage() {
    const { user, _getUsers, users } = useAuth();
    const { animals, _getAnimals } = useAnimal();
    const { products, _getProducts } = useProduct();
    useEffect(() => {
        const loadAnimal = async () => {
            await _getAnimals();
        }
        const loadProduct = async () => {
            await _getProducts();
        }
        const loadUsers = async () => {
            await _getUsers();
        }

        if (products.length < 1)
            loadProduct();
        if (animals.length < 1)
            loadAnimal();
        if (users.length < 1)
            loadUsers();

    });
    return (
        <div className="admin-c">
            <SideBar>          <ul>
                <li><NavLink to={'/administracion'}>Productos</NavLink></li>
                <li><NavLink to={'a/administracion'}>Mascotas</NavLink></li>
                <li><NavLink to={'a/administracion'}>Usuarios</NavLink></li>
                <li><NavLink to={'a/administracion'}>Reportes</NavLink></li>
                <li><NavLink to={'a/administracion'}>Entrevistas</NavLink></li>
            </ul></SideBar>
            <div className='container-adminPage'>
                <h3>Bienvenido {user.name}, <span className='txt-morado'>¿Que quieres hacer hoy?</span></h3>
                <div className="sections-groups">
                    <div className='section bg-rosa'>
                        <h4>Productos</h4>
                        <Link to={'/product'} className='txt-rosado'>Administrar</Link>
                        <p>Numero de productos: {products.length}</p>
                    </div>
                    <div className='section bg-morado2'>
                        <h4>Mascotas</h4>
                        <Link to={'/pet'} className='txt-morado'>Administrar</Link>
                        <p>Numero de mascotas: {animals.length}</p>
                    </div>
                    <div className='section bg-amethyst txt-white'>
                        <h4>Usuarios</h4>
                        <Link to={'/users'} className='bg-white txt-amethyst'>Administrar</Link>
                        <p>Numero de usuarios : {users.length}</p>
                    </div>
                    <div className='section bg-rosa txt-white'>
                        <h4>Reportes</h4>
                        <Link to={'/users'} className='bg-white txt-rosado'>Administrar</Link>
                        <p>Numero de reportes: {users.length}</p>
                    </div>
                    <div className='section bg-morado2 txt-white'>
                        <h4>Entrevistas</h4>
                        <Link to={'/users'} className='bg-white txt-morado'>Administrar</Link>
                        <p>Numero de entrevistas: {users.length}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminPage
