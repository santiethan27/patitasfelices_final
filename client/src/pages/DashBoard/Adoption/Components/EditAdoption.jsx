import React from 'react'
import Modal from './../../../../components/Modal/Modal';
import { useAdoption } from '../../../../contexts/AdoptionContext';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function EditAdoption({ setToggleModify, toggleModify, adoptionSelect, setAdoption }) {
    const { _putAdoption } = useAdoption();
    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();
    const onModify = async (data) => {
        try {
            console.log(data);
            const res = await _putAdoption(adoptionSelect[0], data);
        } catch (error) {
            console.log(error);
        }
    }
    const closedModifyModal = () => {
        setAdoption(null);
        setToggleModify(null);
        reset();
    }
    return (
        <Modal className="modal" show={toggleModify} title='Modificar Rol' close={closedModifyModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
            <form className='formPatitas' onSubmit={handleSubmit((data) => toast.promise(onModify(data), {
                loading: 'Actualizando...',
                success: 'Se actualizo la solicitud de adopcion',
                error: 'Ocurrio un error al actualizar la solicitud'
            }))}>
                <div className="group">
                    <label>Nuevo Estado</label>
                    <select {...register("status", { required: true })} defaultValue={adoptionSelect && adoptionSelect[1]}>
                        <option value="ACTIVE">Activo</option>
                        <option value="CLOSE">Cerrado</option>
                    </select>
                </div>
                <div className="buttons">
                    <button type="submit" className="bg-morado2">Guardar</button>
                    <button onClick={closedModifyModal} className="bg-morado2">Cancelar</button>
                </div>
            </form>
        </Modal>
    )
}

export default EditAdoption