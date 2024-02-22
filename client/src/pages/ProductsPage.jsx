import React, { useState } from "react";
import CardProduct from "../components/CardProduct";
import "./ProductsPage.css";
import { useProduct } from "../context/ProductContext";
import { useEffect } from "react";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";

function ProductsPage() {

    const [selectedItem, setSelectedPetKey] = useState(null);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const { products, _getProducts, _deleteProduct, _putProduct } = useProduct();
    useEffect(() => {
        const get = async () => {
            await _getProducts();
        }
        get();
    }, []);
    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();
    const Toggle = (animal) => {
        if (animal == undefined) {
            reset();
        }
        setSelectedPetKey(animal);
        setModal(!modal)
    };
    const Toggle2 = (animal) => {
        setSelectedPetKey(animal);
        setModal2(!modal2);
    };
    const Toggle3 = (show) => {
        setModal3(show);
    };
    const onSubmit = async (data) => {
        try {
            Toggle3(true);
            await _putProduct(data);
        } catch (error) {
            Toggle3(false);
            console.log(error);
        } finally {
            Toggle3(false);
        }
    };
    const onDelete = async () => {
        try {
            await _deleteProduct(selectedItem);
            setSelectedPetKey(false);
            Toggle2();
        } catch (error) {
            console.error(error)
        }

    };
    return (
        <>
            <header className="txt-white">
                <div className="col2 bg-morado3">
                    <img className="img1" src="./images/dog3.png" alt="" />
                </div>
                <div className="col1 bg-morado2">
                    <h3>AYUDA A LA FUNDACIÓN COMPRANDO PRODUCTOS</h3>
                    <p>Comprando productos ayudas a la fundacion a mantener a los animales con un hogar digno mientras alguien los adopta, ademas de ayudar a la fundacion a pagar a sus empleados y mantener nuestro sueño de restacar perritos</p>
                </div>
                <div className="col2 bg-morado3">
                    <img className="img2" src="./images/gato3.png" alt="" />
                </div>
            </header>
            <div className="container-cards">
                {products.map((product) => (
                    <CardProduct key={product._id} product={product} onDelete={() => Toggle2(product._id)} onModify={() => Toggle(product)} />
                ))}
            </div>
            <Modal show={modal} title={`EDITAR PRODUCTO: ${selectedItem?.name}`} close={Toggle} showHeader={true} showOverlay={true} iClose={true} size={"medium"}>
                {selectedItem && (<form className='w80 formPatitas' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("idProduct")} value={selectedItem._id} hidden />
                    <div className="groups">
                        <div className='group'>
                            <label>Nombre:</label>
                            <input type="text" name="name" defaultValue={selectedItem.name} {...register("name")} />
                            {errors.name && <span>Es necesario rellenar este campo</span>}
                        </div>
                        <div className='group'>
                            <label>Price: </label>
                            <input type="number" name="price" defaultValue={selectedItem.price}  {...register("price")} />
                            {errors.price && <span>Es necesario rellenar este campo</span>}
                        </div>
                    </div>
                    <div className="groups">
                        <div className='group'>
                            <label>Stock:</label>
                            <input type="numer" name="stock" defaultValue={selectedItem.stock} {...register("stock")} />
                            {errors.stock && <span>Es necesario rellenar este campo</span>}
                        </div>
                        <div className='group'>
                            <label>Category:</label>
                            <input type="text" name="category" defaultValue={selectedItem.category} {...register("category")} />
                            {errors.category && <span>Es necesario rellenar este campo</span>}
                        </div>
                    </div>
                    <div className='group'>
                        <label>Description:</label>
                        <textarea type="text" name="description" defaultValue={selectedItem.description} {...register("description")} />
                        {errors.description && <span>Es necesario rellenar este campo</span>}
                    </div>
                    <button className='bg-azul' type='submit'>Actualizar</button>
                </form>)}
            </Modal>
            <Modal className="modal" show={modal2} title="¿ESTAS SEGURO?" close={Toggle2} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
                <div className="buttons">
                    <button onClick={() => onDelete()}>ACEPTAR</button>
                    <button onClick={() => Toggle2()}>CANCELAR</button>
                </div>
            </Modal>
            <Modal className="modalLoading" show={modal3} title="CARGANDO..." close={Toggle3} showHeader={false} showOverlay={true} size={"small"} align={"center"} iClose={false}>
                <h3>CARGANDO...</h3>
            </Modal>
        </>
    );
}

export default ProductsPage;
