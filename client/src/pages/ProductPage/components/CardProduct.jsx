import React from 'react'
import "./CardProduct.css"
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CardProduct({ onModify, onDelete, product }) {
    const { rol } = useAuth();
    return (
        <div className='card bg-white txt-black'>
            <div className="img bg-morado2">
                <Link to={`/product/${product._id}`} key={product._id} className='cursor-pointer'>
                    <img src={product.multimedia[0].secure_url} alt="" />
                </Link>
            </div>
            <div className="body">
                <div className="head-body"><h4>{product.name}</h4><button className='bg-rosa txt-white'><FontAwesomeIcon icon={faPlus} /> Ver más</button></div>

                <div className="cd-description">{product.description} Lorem ipsum dolor sit amet</div>
                <div className="money txt-black">${product.price}</div>
                {/* <div className="price">
                    {rol == 'admin' ?
                            <div className="buttons">
                                <button onClick={onModify} className='editar bg-rosa'>Editar</button>
                                <button onClick={onDelete} className='eliminar bg-rosa'>Eliminar</button>
                            </div>
                            :

                        }
                </div> */}
            </div>
        </div>
    )
}

export default CardProduct