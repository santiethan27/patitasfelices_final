import React, { useState } from 'react'
import { useProduct } from '../context/ProductContext'
import { useForm } from 'react-hook-form';


function SetProductPage() {
    const { product } = useProduct();
    console.log(product.id)
    const{ register, handleSubmit, formState: {
        errors
    }} = useForm();
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
            console.error('Error al actualizar el producto: ',error)
        }finally{
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nombre:</label>
                <input type="text" name="name" {...register("name", { required: true })}/>
                {errors.name && <span>Es necesario rellenar este campo</span>}
            </div>
            <div>
                <label>Price:</label>
                <input type="text" name="price" {...register("price", { required: true })}/>
                {errors.price && <span>Es necesario rellenar este campo</span>}
            </div>
            <div>
                <label>Stock:</label>
                <input type="text" name="stock" {...register("stock", { required: true })}/>
                {errors.stock && <span>Es necesario rellenar este campo</span>}
            </div>
            <div>
                <label>Description:</label>
                <textarea type="text" name="description" {...register("description", { required: true })}/>
                {errors.description && <span>Es necesario rellenar este campo</span>}
            </div>
            <div>
                <label>Category:</label>
                <textarea type="text" name="category" {...register("category", { required: true })}/>
                {errors.category && <span>Es necesario rellenar este campo</span>}
            </div>
            <div>
                <label>Imagenes:</label>
                <input type="file" name="image" {...register("image", { required: true })}/>
                {errors.image && <span>Es necesario rellenar este campo</span>}
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default SetProductPage
