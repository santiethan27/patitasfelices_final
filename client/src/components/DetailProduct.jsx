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
        name: 'Product Name',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit molestias in illo placeat tenetur tempore dolores sunt aut. Sunt voluptas nam similique libero perferendis provident molestias esse reiciendis magni qui?',
        price: 20.99,
        stock: 100,
        image: 'https://i.blogs.es/1cc33c/iphone-15-analisis-aps-02/375_375.webp'
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
