import React from "react";
import CardProduct from "./components/CardProduct";
import "./ProductsPage.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useProduct } from "../../contexts/ProductContext";

function ProductsPage() {
    const { _getProducts, products } = useProduct();
    useEffect(() => {
        const get = async () => {
            await _getProducts();
        }
        get();
    }, []);
    return (
        <>
            <div className="pro-header">
                <div className="col bg-morado2">
                    <h1 className="txt-white">Tienda PatitasFelices</h1>
                    <div className="col-buttons txt-white">
                        <span>Camisetas</span>
                        <span>Tazas</span>
                        <span>Conjuntos</span>
                    </div>
                    <img className='col-paw' src="./images/paw3.png" alt="" />
                    <img className="col-img" src="./images/conjunto.png" alt="" />
                </div>
                <div className="pro-images">
                    <div className="cont-img bg-morado2"><img src="./images/camiza.png" alt="" /></div>
                    <div className="cont-img bg-morado2"><img src="./images/taza.png" alt="" /></div>
                </div>
            </div>
            <div className="pet-icons">
                <div className="c-pet-icon">
                    <div className="pet-icon bg-morado2">
                        <img src="./images/object.png" alt="" />
                    </div>
                    <p className="pet-class"><span><FontAwesomeIcon icon={faCircle} className="txt-morado" /></span> Objetos</p>
                </div>
                <div className="c-pet-icon">
                    <div className="pet-icon borde-morado">
                        <img src="./images/toy.png" alt="" />
                    </div>
                    <p className="pet-class"> Juguetes</p>
                </div>
                <div className="c-pet-icon">
                    <div className="pet-icon borde-morado">
                        <img src="./images/shirt.png" alt="" />
                    </div>
                    <p className="pet-class">Ropa</p>
                </div>
            </div>
            <div className="container-cards">
                {products.map((product) => (
                    <CardProduct key={product._id} product={product} />
                ))}
            </div>
        </>
    );
}

export default ProductsPage;
