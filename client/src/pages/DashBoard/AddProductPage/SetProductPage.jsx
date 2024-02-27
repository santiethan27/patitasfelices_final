import React, { useState } from 'react'
import { useProduct } from '../../../contexts/ProductContext'
import { useForm } from 'react-hook-form';
import '../../../styled-components/Forms.css'
import Modal from '../../../components/Modal/Modal';

function SetProductPage() {
    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();
    const [modal, setModal] = useState(false);
    const Toggle = (open) => {
        setModal(open);
    }
    const { _postProducts } = useProduct();
    const onSubmit = async (data) => {
        const formData = new FormData();
        for (let i = 0; i < data.image.length; i++) {
            formData.append('images', data.image[i]);
        }
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        formData.append('description', data.description);
        formData.append('category', data.category)
        try {
            Toggle(true);
            await _postProducts(formData);
            reset();
        } catch (error) {
            Toggle(false);
            console.error('Error al actualizar el producto: ', error)
        } finally {
            Toggle(false);
        }
    };

    return (
        <>
            <form className='w50 formPatitas m5' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='title'>AGREGAR UN PRODUCTO</h2>
                <div className="groups">
                    <div className='group'>
                        <label>Nombre:</label>
                        <input type="text" name="name" {...register("name", { required: true })} />
                        {errors.name && <span>Es necesario rellenar este campo</span>}
                    </div>
                    <div className='group'>
                        <label>Price:</label>
                        <input type="text" name="price" {...register("price", { required: true })} />
                        {errors.price && <span>Es necesario rellenar este campo</span>}
                    </div>
                </div>
                <div className="groups">
                    <div className='group'>
                        <label>Stock:</label>
                        <input type="text" name="stock" {...register("stock", { required: true })} />
                        {errors.stock && <span>Es necesario rellenar este campo</span>}
                    </div>
                    <div className='group'>
                        <label>Category:</label>
                        <input type="text" name="category" {...register("category", { required: true })} />
                        {errors.category && <span>Es necesario rellenar este campo</span>}
                    </div>
                </div>
                <div className='group'>
                    <label>Description:</label>
                    <textarea type="text" name="description" {...register("description", { required: true })} />
                    {errors.description && <span>Es necesario rellenar este campo</span>}
                </div>
                <div className='group'>
                    <label>Imagenes:</label>
                    <input type="file" name="image" {...register("image", { required: true })} />
                    {errors.image && <span>Es necesario rellenar este campo</span>}
                </div>
                <button className='bg-morado2' type='submit'>Agregar</button>
            </form>
            <Modal className="modalLoading" show={modal} title="CARGANDO..." close={Toggle} showHeader={false} showOverlay={true} size={"small"} align={"center"} iClose={false}>
                <h3>CARGANDO...</h3>
            </Modal>
        </>


    )
}

export default SetProductPage
