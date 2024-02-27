import React from 'react'
import "./CardProduct.css"
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function CardProduct({ onModify, onDelete, product }) {
    const { rol } = useAuth();
    return (
        <div className='card'>
            <div className="img bg-rosa-gradient">
                <Link to={`/product/${product._id}`} key={product._id} className='cursor-pointer'>
                    <img src={product.multimedia[0].secure_url} alt="" />
                </Link>
            </div>
            <div className="body">
                <h4>{product.name}</h4>
                <div className="description">{product.description}</div>
                <div className="price">
                    <div className="money txt-amethyst">${product.price}</div>
                    {rol == 'admin' ?
                        <div className="buttons">
                            <button onClick={onModify} className='editar bg-rosa'>Editar</button>
                            <button onClick={onDelete} className='eliminar bg-rosa'>Eliminar</button>
                        </div>
                        :
                        <button className='bg-rosa'>Ver más</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CardProduct