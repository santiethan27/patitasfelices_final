import React from 'react'
import { useAuth } from '../../../../contexts/AuthContext';
import { toast } from 'sonner';
import Modal from './../../../../components/Modal/Modal';

function DeleteUser({ toggleDelete, setToggleDelete }) {
    const { _deleteUser } = useAuth();
    const closedDeleteModal = () => {
        setToggleDelete(null);
    }
    const onDelete = async (id) => {
        try {
            await _deleteUser(id);
            setToggleDelete(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal className="modal" show={toggleDelete !== null} title='¿Estás seguro?' close={closedDeleteModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
            <div className="buttons">
                <button onClick={() =>
                    toast.promise(onDelete(toggleDelete), {
                        loading: 'Eliminando...',
                        success: 'Se elimino el usuario',
                        error: 'Ocurrio un error al eliminar el usuario'
                    })} className="bg-morado2">Aceptar</button>
                <button onClick={closedDeleteModal} className="bg-morado2">Cancelar</button>
            </div>
        </Modal>
    )
}

export default DeleteUser