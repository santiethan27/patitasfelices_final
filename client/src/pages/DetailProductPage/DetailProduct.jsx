import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { useProduct } from '../context/ProductContext';
import './DetailProduct.css';

const DetailProduct = () => {
    // const { id } = useParams();
    // const { _getProduct } = useProduct();
    // const [product, setProduct] = useState();

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const productData = await _getProduct(id);
    //             setProduct(productData);
    //             console.log(productData);
    //         } catch (error) {
    //             console.error('Error al obtener información del producto:', error);
    //         }
    //     };

    //     if (id) {
    //         fetchProduct();
    //     }
    // }, [id, _getProduct]);

    const product = {
        name: 'Prueba',
        description: 'Este texto es de relleno para saber como se puede modificar en el datail de los productos, solucion de errores y posibles fallos de diseño establecidos',
        price: 5000,
        stock: 12,
        image: 'https://res.cloudinary.com/duvbxqzxx/image/upload/v1708876339/media/r3avcp0slz7qe23mo4c8.png'
    };

    return (
        <div>
            <div className="product-detail">
                <div className="container-main bg-white">
                    <div className="product-image">
                        <figure className='container-img'>
                            <img src={product.image} alt={product.name} />
                        </figure>
                    </div>
                    <div className="product-info">
                        <h1>{product.name}</h1>
                        <h2>$ {product.price}</h2>
                        <p>Cantidad disponible: <span>{product.stock}</span> Unidades</p>
                        <p className='description'>Descripcion : {product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
