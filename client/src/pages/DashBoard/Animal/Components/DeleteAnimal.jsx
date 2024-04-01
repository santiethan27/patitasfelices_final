import React from 'react'
import { useAnimal } from '../../../../contexts/AnimalContext';
import Modal from './../../../../components/Modal/Modal';
import { toast } from 'sonner';

function DeleteAnimal({ toggleDelete, setToggleDelete }) {
    const { _deleteAnimal } = useAnimal();
    const onDelete = async () => {
        try {
            await _deleteAnimal(toggleDelete);
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
                        error: "Ocurrio un error al eliminar la mascota",
                        success: "Mascota eliminada",
                        loading: "Se esta eliminando la mascota"
                    });
                }} className="bg-morado2">ACEPTAR</button>
                <button onClick={() => closedDeleteModal()} className="bg-morado2">CANCELAR</button>
            </div>
        </Modal>
    )
}

export default DeleteAnimal