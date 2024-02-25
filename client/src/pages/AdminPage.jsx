import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './adminPage.css'
import { Link } from 'react-router-dom';
import { useAnimal } from '../context/AnimalContext';
import { useProduct } from '../context/ProductContext';

function AdminPage() {
    const { user } = useAuth();
    const { animals, _getAnimals } = useAnimal();
    const { products, _getProducts } = useProduct();
    if (animals.length < 1) {
        useEffect(() => {
            const loadAnimal = async () => {
                await _getAnimals();
            }
            const loadProduct = async () => {
                await _getProducts();
            }
            if (products.length < 1) {
                loadProduct();
            }
            loadAnimal();
        });
    }
    return (
        <div className='container-adminPage'>
            <h3>Bienvenido {user.name}, <span className='txt-morado'>¿Que quieres hacer hoy?</span></h3>
            <div className="sections-groups">
                <div className='section bg-rosa'>
                    <h4>Productos</h4>
                    <Link to={'/product'} className='txt-rosado'>Agregar</Link>
                    <p>Numero de productos: {products.length}</p>
                </div>
                <div className='section bg-morado2'>
                    <h4>Mascotas</h4>
                    <Link to={'/pet'} className='txt-morado'>Agregar</Link>
                    <p>Numero de mascotas: {animals.length}</p>
                </div>
                <div className='section bg-amethyst txt-white'>
                    <h4>Usuarios</h4>
                    <Link to={'/users'} className='bg-white txt-amethyst'>Ver usuarios</Link>
                    <p>Numero de usuarios :</p>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
