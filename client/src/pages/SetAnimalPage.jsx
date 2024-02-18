import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAnimal } from '../context/AnimalContext';
import { useAuth } from '../context/AuthContext';

function SetAnimalPage() {
    const { user } = useAuth();
    console.log(user.id)
    const { register, handleSubmit, formState: {
        errors
    } } = useForm();
    const [loading, setLoading] = useState();
    const { _postAnimals } = useAnimal();
    const onSubmit = async (data) => {
        const formData = new FormData();
        for (let i = 0; i < data.image.length; i++) {
            formData.append('images', data.image[i]);
        }
        formData.append('idUser', user.id);
        formData.append('name', data.name);
        formData.append('age', data.age);
        formData.append('history', data.history);
        formData.append('raza', data.raza);
        formData.append('gender', data.gender);
        formData.append('color', data.color);
        formData.append('size', data.size);
        formData.append('isVaccinated', data.isVaccinated);
        formData.append('isCastrated', data.isCastrated);
        try {
            setLoading(true);
            await _postAnimals(formData);
        } catch (error) {
            setLoading(false);
            console.error('Error al actualizar el usuario:', error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nombre:</label>
                <input type="text" name="name"  {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
            </div>

            <div>
                <label>Edad (En años): </label>
                <input type="text" name="age" {...register("age", { required: true })} />
                {errors.age && <span>This field is required</span>}
            </div>
            <div>
                <label>Historia:</label>
                <textarea type="text" name="history" {...register("history", { required: true })} />
                {errors.history && <span>This field is required</span>}
            </div>
            <div>
                <label>Raza:</label>
                <input type="text" name="raza" {...register("raza", { required: true })} />
                {errors.raza && <span>This field is required</span>}
            </div>
            <div>
                <label>Sexo:</label>
                <input type="text" name="gender" {...register("gender", { required: true })} />
                {errors.gender && <span>This field is required</span>}
            </div>
            <div>
                <label>Color:</label>
                <input type="text" name="color" {...register("color", { required: true })} />
                {errors.color && <span>This field is required</span>}
            </div>
            <div>
                <label>Size:</label>
                <input type="text" name="size" {...register("size", { required: true })} />
                {errors.size && <span>This field is required</span>}
            </div>
            <div>
                <label>¿Esta vacunado?:</label>
                <input type="text" name="isVaccinated" {...register("isVaccinated", { required: true })} />
                {errors.isVaccinated && <span>This field is required</span>}
            </div>
            <div>
                <label>¿Esta castrado?:</label>
                <input type="text" name="isCastrated" {...register("isCastrated", { required: true })} />
                {errors.isCastrated && <span>This field is required</span>}
            </div>
            <div>
                <label>Imagenes</label>
                <input type="file" name="image" {...register("image", { required: true })} />
                {errors.image && <span>This field is required</span>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default SetAnimalPage