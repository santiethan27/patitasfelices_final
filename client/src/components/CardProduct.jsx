import React from 'react'
import "./CardProduct.css"
import { useAuth } from '../context/AuthContext';

function CardProduct({ onModify, onDelete, product }) {
    const { rol } = useAuth();
    return (
        <div className='card'>
            <div className="img">
                <img src={product.multimedia[0].secure_url} alt="" />
            </div>
            <div className="body">
                <h4>{product.name}</h4>
                <div className="description">{product.description}</div>
                <div className="price">
                    <div className="money txt-palorosa">${product.price}</div>
                    {rol == 'admin' ?
                        <div className="buttons">
                            <button onClick={onModify} className='editar bg-palorosa'>Editar</button>
                            <button onClick={onDelete} className='eliminar'>Eliminar</button>
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