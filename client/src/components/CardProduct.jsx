import React from 'react'
import "./CardProduct.css"
import { useAuth } from '../context/AuthContext';

function CardProduct({ product }) {
    const { rol } = useAuth();
    return (
        <div className='card'>
            <div className="img">
                <img src="./celular.png" alt="" />
            </div>
            <div className="body">
                <h4>{product.name}</h4>
                <div className="description">{product.description}</div>
                <div className="price">
                    <div className="money">${product.price}</div>
                    {rol == 'admin' ?
                        <div className="buttons">
                            <button className='editar'>Editar</button>
                            <button className='eliminar'>Eliminar</button>
                        </div>
                        :
                        <button>Hacer pedido</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CardProduct