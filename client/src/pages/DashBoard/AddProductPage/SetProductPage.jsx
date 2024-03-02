import React, { useEffect, useState } from 'react'
import { useProduct } from '../../../contexts/ProductContext'
import { useForm } from 'react-hook-form';
import '../../../styled-components/Forms.css'
import { toast } from 'sonner';

function SetProductPage() {
    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();
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
            await _postProducts(formData);
            reset();
        } catch (error) {
            console.error('Error al actualizar el producto: ', error)
        }
    };

    return (
        <>
            <form className='w50 formPatitas m5' onSubmit={handleSubmit((data) => toast.promise(onSubmit(data), {
                loading: 'Cargando...',
                success: 'Se agregó el producto',
                error: 'Ocurrió un error al agregar el producto'
            }))}>
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
        </>


    )
}

export default SetProductPage
