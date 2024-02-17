import { createContext, useContext, useState } from "react";
import { deleteProduct, getProduct, postProduct, putProduct } from "../api/product.js";

export const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("El useAuth debe estar dentro del contexto");
    }
    return context;
}
export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]);

    const _getProduct = async (id) => {
        try {
            const product = await getProduct(id);
            return product.data();
        } catch (error) {
            console.log(error);
        }
    }

    const _getProducts = async () => {
        try {
            const resProducts = await getProduct();
            setProduct(resProducts.data());
        } catch (error) {
            console.log(error);
        }
    }

    const _postProducts = async (product) => {
        try {
            await postProduct(product);
        } catch (error) {
            console.log(error);
        }
    }

    const _putProduct = async (product) => {
        try {
            const resProduct = await putProduct(product);
            console.log(resProduct);
        } catch (error) {
            console.log(error);
        }
    }

    const _deleteProduct = async (id) => {
        try {
            const resProduct = await deleteProduct(id);
            if (resProduct.status === 200) setProduct(product.filter((product) => product._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProductContext.Provider value={{ _getProduct, _getProducts, _postProducts, _putProduct, _deleteProduct, product }}>
            {children}
        </ProductContext.Provider>
    )
}
