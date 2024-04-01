import React from 'react'
import Modal from './../../../../components/Modal/Modal';
import { toast } from 'sonner';
import { useAdoption } from '../../../../contexts/AdoptionContext';

function DeleteAdoption({ toggleDelete, setToggleDelete }) {
    const { _deleteAdoption } = useAdoption();
    const onDelete = async () => {
        try {
            await _deleteAdoption(toggleDelete);
            setToggleDelete(null);
        } catch (error) {
            console.log(error);
        }
    }
    const closedDeleteModal = () => {
        setToggleDelete(null);
    }
    return (
        <Modal className="modal" show={toggleDelete} title="¿ESTAS SEGURO?" close={closedDeleteModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
            <div className="buttons">
                <button onClick={(e) => {
                    e.preventDefault();
                    toast.promise(onDelete(), {
                        error: "Ocurrio un error al eliminar la solicitud",
                        success: "Solicitud eliminada",
                        loading: "Se esta eliminando la solicitud"
                    });
                }} className="bg-morado2">ACEPTAR</button>
                <button onClick={() => closedDeleteModal()} className="bg-morado2">CANCELAR</button>
            </div>
        </Modal>
    )
}

export default DeleteAdoption