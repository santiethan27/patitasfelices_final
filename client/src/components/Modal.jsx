import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Importa el icono 'times'
import { useForm } from 'react-hook-form';
import { useAnimal } from '../context/AnimalContext';

function Modal({ isModalOpen, setIsModalOpen, selectedItem }) {
    const { register, handleSubmit, formState: {
        errors
    } } = useForm();
    const { _putAnimal } = useAnimal();
    const onSubmit = async (data) => {
        const formData = new FormData();

        _putAnimal(data);
    };
    return (
        <>
            {isModalOpen && (
                <div className="container-modal">
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setIsModalOpen(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            <h2>
                                Modificar de {selectedItem.name}
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <input type="text" {...register("idPublication", { required: true })} value={selectedItem._id} />
                                    <label>Nombre:</label>
                                    <input type="text" name="name" defaultValue={selectedItem.name}  {...register("name", { required: true })} />
                                    {errors.name && <span>This field is required</span>}
                                </div>

                                <div>
                                    <label>Edad (En años): </label>
                                    <input type="text" name="age" defaultValue={selectedItem.age} {...register("age", { required: true })} />
                                    {errors.age && <span>This field is required</span>}
                                </div>
                                <div>
                                    <label>Historia:</label>
                                    <textarea type="text" name="history" defaultValue={selectedItem.history} {...register("history", { required: true })} />
                                    {errors.history && <span>This field is required</span>}
                                </div>
                                <div>
                                    <label>Raza:</label>
                                    <input type="text" name="raza" defaultValue={selectedItem.raza} {...register("raza", { required: true })} />
                                    {errors.raza && <span>This field is required</span>}
                                </div>
                                <div>
                                    <label>Sexo:</label>
                                    <input type="text" name="gender" defaultValue={selectedItem.gender} {...register("gender", { required: true })} />
                                    {errors.gender && <span>This field is required</span>}
                                </div>
                                <div>
                                    <label>Color:</label>
                                    <input type="text" name="color" defaultValue={selectedItem.color} {...register("color", { required: true })} />
                                    {errors.color && <span>This field is required</span>}
                                </div>
                                <div>
                                    <label>Size:</label>
                                    <input type="text" name="size" defaultValue={selectedItem.size} {...register("size", { required: true })} />
                                    {errors.size && <span>This field is required</span>}
                                </div>
                                <div>
                                    <label>¿Esta vacunado?:</label>
                                    <input type="text" name="isVaccinated" defaultValue={selectedItem.isVaccinated} {...register("isVaccinated", { required: true })} />
                                    {errors.isVaccinated && <span>This field is required</span>}
                                </div>
                                <div>
                                    <label>¿Esta castrado?:</label>
                                    <input type="text" name="isCastrated" defaultValue={selectedItem.isCastrated} {...register("isCastrated", { required: true })} />
                                    {errors.isCastrated && <span>This field is required</span>}
                                </div>

                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal