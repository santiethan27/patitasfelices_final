import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useProduct } from '../../contexts/ProductContext';
import './DetailProduct.css';
import CardProduct from '../ProductPage/components/CardProduct';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { usePayment } from '../../contexts/PaymentContext';
import EditImage from './Components/EditImage';
import { useOrder } from './../../contexts/OrderContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const DetailProduct = () => {
    const { id } = useParams();
    initMercadoPago('TEST-a2493766-2e31-4138-ab08-63203d0fd71b', {
        locale: "es-CO",
    })
    const { _getProduct, _getProducts, products } = useProduct();
    const [redirectUrl, setRedirectUrl] = useState();
    const { _postPayment } = usePayment();
    const [product, setProduct] = useState();
    const [optionsImage, setOptions] = useState(null);
    const { addOrder } = useOrder();
    const [imgOrder, setImgOrder] = useState(null);
    const { user } = useAuth();
    const createPreference = async (amount, description, id) => {
        try {
            console.log(id);
            const res = await _postPayment(amount, description, id);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const habdleBuys = async (amount, description) => {
        try {
            if (optionsImage.length > 0 && imgOrder === null) {
                throw new Error('Debes guardar la imagen');
            }
            const res = await onOrder();
            if (!res) {
                throw new Error('Ocurrio un error al crear la orden');
            }
            const { init_point } = await createPreference(amount, description, res);
            setRedirectUrl(init_point);
        } catch (error) {
            throw error;
        }
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
                const productOptions = productData.options;
                setOptions(productOptions);
            } catch (error) {
                console.error('Error al obtener información del producto:', error);
            }
        };
        console.log(optionsImage);
        fetchProduct();
    }, [id]);

    const onOrder = async () => {
        const formData = new FormData();

        if (optionsImage.length > 0) {
            const blob = dataURLtoBlob(imgOrder);
            formData.append('image', blob, 'image.png');
        }
        // Crear un FormData y agregar la imagen como un archivo
        formData.append('product', id);
        formData.append('user', user.id || user._id);
        const res = await addOrder(formData);
        console.log(res);
        return res;
    }
    function dataURLtoBlob(dataURL) {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const byteCharacters = atob(parts[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    }
    return (
        product ? (
            <div className="body-product">
                <div className="c-product-detail  bg-white">
                    <div className="product-detail">
                        <div className="container-main">
                            <div className='product-image'>
                                {optionsImage?.length > 0 ?
                                    <EditImage options={optionsImage} setImgOrder={setImgOrder}></EditImage> :
                                    <img src={product.primary.secure_url} alt={product.name} />
                                }
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
                                        <button
                                            className='comprar-product bg-morado2'
                                            onClick={() =>
                                                toast.promise(habdleBuys(product.price, product.name),
                                                    {
                                                        loading: 'Espera...',
                                                        success: 'Se creó el pedido',
                                                        error: (error) => `${error.message}` // Mostrar el mensaje de error
                                                    }
                                                )
                                            }
                                        >Comprar ahora</button>

                                        {/* <button className='comprar-product bg-morado2' onClick={() => onOrder()}>Comprar ahora</button> */}
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
