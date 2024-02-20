import React from "react";
import CardProduct from "../components/CardProduct";
import "./ProductsPage.css";
import { useProduct } from "../context/ProductContext";
import { useEffect } from "react";

function ProductsPage() {
    const { products, _getProducts } = useProduct();
    useEffect(() => {
        _getProducts();
    }, []);
    return (
        <>
            <div className="container-cards">
                {products.map((product) => (
                    <CardProduct key={product._id} product={product} />

                ))}
            </div>
        </>
    );
}

export default ProductsPage;
