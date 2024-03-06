import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useProduct } from '../../contexts/ProductContext';
import './DetailProduct.css';
import CardProduct from '../ProductPage/components/CardProduct';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { usePayment } from '../../contexts/PaymentContext';

const DetailProduct = () => {
    const { id } = useParams();
    initMercadoPago('TEST-5debe8b1-62f0-48af-96d8-a790fefd85cb', {
        locale: "es-CO",
    })
    const { _getProduct, _getProducts, products } = useProduct();
    const [redirectUrl, setRedirectUrl] = useState();
    const { _postPayment } = usePayment();
    const [product, setProduct] = useState();

    const createPreference = async (amount, description) => {
        try {
            const res = await _postPayment(amount, description);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const habdleBuys = async (amount, description) => {
        const { init_point } = await createPreference(amount, description);
        setRedirectUrl(init_point);
    }

    if (redirectUrl) {
        console.log(redirectUrl)
        window.location.href = redirectUrl;
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await _getProduct(id);
                setProduct(await productData);
                await _getProducts();
                console.log(productData);
            } catch (error) {
                console.error('Error al obtener información del producto:', error);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        product ? (
            <div className="body-product">
                <div className="c-product-detail  bg-white">
                    <div className="product-detail">
                        <div className="container-main">
                            <div className='product-image'>
                                <img src={product.multimedia[0].secure_url} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <div className="header-product">
                                    <h1>{product.name}</h1>
                                    <h5 className='category txt-rosado'>{product.category}</h5>
                                    <div className="info">
                                        <p className='product-description'>{product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum facilis nesciunt dignissimos quisquam aut nulla velit ipsum quam temporibus et voluptates vitae sed assumenda repellat mollitia, vero quo aliquid voluptatem!</p>
                                    </div>
                                </div>
                                <div className="footer-product">
                                    {/* <p><span>{product.stock}</span> unidades disponibles</p> */}
                                    <div className="price">
                                        <h2 className='txt-morado'>$ {product.price}</h2>
                                        <button className='comprar-product bg-morado2' onClick={() => habdleBuys(product.price,product.name)}>Comprar ahora</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="others-product">
                            <h4>Otros productos</h4>
                            {
                                products.map((product) => (
                                    <>
                                        {product._id != id &&
                                            <CardProduct key={product._id} product={product} />}
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <h1>Cargando...</h1>
        )
    )
}

export default DetailProduct
