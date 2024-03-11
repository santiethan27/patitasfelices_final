import React from 'react'
import Modal from './../../../../components/Modal/Modal';
import { useProduct } from '../../../../contexts/ProductContext';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function NewProduct({ toggleNew, setToggleNew }) {
    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();
    const { _postProducts } = useProduct();

    const onSubmit = async (data) => {
        const formData = new FormData();
        for (let i = 0; i < data.image.length; i++) {
            formData.append('options', data.image[i]);
        }
        formData.append('primary', data.primary[0]);
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
    const closedNewModal = () => {
        setToggleNew(false);
    }
    return (
        <Modal show={toggleNew} title='AGREGAR PRODUCTO' close={closedNewModal} showHeader={true} showOverlay={true} iClose={true} size={"medium"}>
            {toggleNew && (<form className='w80 formPatitas' onSubmit={handleSubmit((data) => toast.promise(onSubmit(data), {
                loading: 'Cargando...',
                success: 'Se agregó el producto',
                error: 'Ocurrió un error al agregar el producto'
            }))}>
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
                    <label>Opciones:</label>
                    <input type="file" name="image" {...register("image", { required: true })} multiple />
                    {errors.image && <span>Es necesario rellenar este campo</span>}
                </div>
                <div className='group'>
                    <label>Imagen principal:</label>
                    <input type="file" name="primary" {...register("primary", { required: true })} />
                    {errors.primary && <span>Es necesario rellenar este campo</span>}
                </div>
                <button className='bg-morado2' type='submit'>Agregar</button>
            </form>)}
        </Modal>

    )
}

export default NewProduct