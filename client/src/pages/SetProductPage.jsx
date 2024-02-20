import React, { useState } from 'react'
import { useProduct } from '../context/ProductContext'
import { useForm } from 'react-hook-form';
import '../components/Forms.css'

function SetProductPage() {
    const { product } = useProduct();
    const { register, handleSubmit, formState: {
        errors
    } } = useForm();
    const [loading, setLoading] = useState();
    const { _postProducts } = useProduct();
    const onSubmit = async (data) => {
        const formData = new FormData();
        for (let i = 0; i < data.image.length; i++) {
            formData.append('images', data.image[i]);
        }
        formData.append('idProduct', product.id);
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('stock', data.stock);
        formData.append('description', data.description);
        formData.append('category', data.category)
        try {
            setLoading(true);
            await _postProducts(formData);
        } catch (error) {
            setLoading(false);
            console.error('Error al actualizar el producto: ', error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='w50 m5' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='title'>AGREGAR PRODUCTO</h2>
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
            <button className='bg-azul' type='submit'>Agregar</button>
        </form>
    )
}

export default SetProductPage
