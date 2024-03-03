import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAnimal } from '../../../../contexts/AnimalContext';
import Modal from './../../../../components/Modal/Modal';
import { useRef } from 'react';
import { toast } from 'sonner';

function EditAnimal({ setToggleModify, toggleModify, animalSelect, setAnimal }) {
    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();
    const { _putAnimal } = useAnimal();
    const [selectedImage, setSelectedImage] = useState(null);
    const onModify = async (data) => {
        try {
            const formData = new FormData();
            if (selectedImage) {
                formData.append('images', selectedImage);
            }
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const res = await _putAnimal(formData);
            setAnimal(await res);
        } catch (error) {
            console.log(error);
        }
    }
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setSelectedImage(file);
    };
    const closedModifyModal = () => {
        setAnimal(null);
        setToggleModify(null);
        reset();
    }
    return (
        <Modal show={toggleModify} title={`EDITAR MASCOTA: ${animalSelect?.name}`} close={closedModifyModal} showHeader={true} showOverlay={true} iClose={true} size={"medium"}>
            {animalSelect && animalSelect.multimedia && (<form className="w80 formPatitas" onSubmit={(e) => {
                toast.promise(handleSubmit(onModify), {
                    error: "Ocurrio un error al actualizar la mascota",
                    success: "Actualizando la mascota",
                    loading: "Se esta actualizando la mascota"
                });
                e.preventDefault();
            }}>
                <input type="text" {...register("idPublication", { required: true })} value={animalSelect._id} hidden />
                <div className="groups">
                    <div className="group">
                        <label>Nombre:</label>
                        <input type="text" name="name" defaultValue={animalSelect.name}  {...register("name", { required: true })} />
                        {errors.name && <span>This field is required</span>}
                    </div>
                    <div className="group">
                        <label>Edad (En años): </label>
                        <input type="text" name="age" defaultValue={animalSelect.age} {...register("age", { required: true })} />
                        {errors.age && <span>This field is required</span>}
                    </div>
                </div>
                <div className="groups">
                    <div className="group">
                        <label>Raza:</label>
                        <input type="text" name="raza" defaultValue={animalSelect.raza} {...register("raza", { required: true })} />
                        {errors.raza && <span>This field is required</span>}
                    </div>
                    <div className="group">
                        <label>Sexo:</label>
                        <input type="text" name="gender" defaultValue={animalSelect.gender} {...register("gender", { required: true })} />
                        {errors.gender && <span>This field is required</span>}
                    </div>
                </div>
                <div className="groups">
                    <div className="group">
                        <label>Color:</label>
                        <input type="text" name="color" defaultValue={animalSelect.color} {...register("color", { required: true })} />
                        {errors.color && <span>This field is required</span>}
                    </div>
                    <div className="group">
                        <label>Size:</label>
                        <input type="text" name="size" defaultValue={animalSelect.size} {...register("size", { required: true })} />
                        {errors.size && <span>This field is required</span>}
                    </div>
                </div>
                <div className="groups">
                    <div className="group">
                        <label>¿Esta vacunado?:</label>
                        <input type="text" name="isVaccinated" defaultValue={animalSelect.isVaccinated} {...register("isVaccinated", { required: true })} />
                        {errors.isVaccinated && <span>This field is required</span>}
                    </div>
                    <div className="group">
                        <label>¿Esta castrado?:</label>
                        <input type="text" name="isCastrated" defaultValue={animalSelect.isCastrated} {...register("isCastrated", { required: true })} />
                        {errors.isCastrated && <span>This field is required</span>}
                    </div>
                </div>
                <div className="group">
                    <label>Historia:</label>
                    <textarea type="text" name="history" defaultValue={animalSelect.history} {...register("history", { required: true })} />
                    {errors.history && <span>This field is required</span>}
                </div>
                <div className="edit-image" onClick={handleImageClick}>
                    <img className="img-edit" src={animalSelect.multimedia[0]?.secure_url} alt="" />
                </div>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInputChange} />
                {selectedImage && (
                    <div className="alert-load">
                        <p className="exito">Imagen cargada con exitoo:</p>
                        <p>{selectedImage.name}</p>
                    </div>
                )
                }
                <button type="submit" className="bg-morado2">Actualizar</button>
            </form>)}

        </Modal>
    )
}

export default EditAnimal