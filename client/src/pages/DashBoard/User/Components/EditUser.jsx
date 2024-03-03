import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../contexts/AuthContext';
import Modal from './../../../../components/Modal/Modal';
import { toast } from 'sonner';

function EditUser({ setToggleModify, toggleModify, userSelect, setUser }) {
    const { updateUser } = useAuth();
    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();
    const onModify = async (data) => {
        try {
            const res = await updateUser(userSelect[0], data);
        } catch (error) {
            console.log(error);
        }
    }
    const closedModifyModal = () => {
        setUser(null);
        setToggleModify(null);
        reset();
    }
    return (
        <Modal className="modal" show={toggleModify !== null} title='Modificar Rol' close={closedModifyModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
            <form className='formPatitas' onSubmit={handleSubmit((data) => toast.promise(onModify(data), {
                loading: 'Actualizando...',
                success: 'Se actualizo el usuario',
                error: 'Ocurrio un error al actualizar el usuario'
            }))}>
                <div className="group">
                    <label>Nuevo Rol</label>

                    <select {...register("rol", { required: true })} defaultValue={userSelect && userSelect[1]}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div className="group">
                    <label>Nuevo Estado</label>
                    <select {...register("status", { required: true })} defaultValue={userSelect && userSelect[2]}>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
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

export default EditUser