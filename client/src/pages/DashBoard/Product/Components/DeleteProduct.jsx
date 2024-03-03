import React from 'react'
import Modal from './../../../../components/Modal/Modal';
import { useProduct } from '../../../../contexts/ProductContext';
import { toast } from 'sonner';

function DeleteProduct({ toggleDelete, setToggleDelete }) {
  const { _deleteProduct } = useProduct();
  const onDelete = async () => {
    try {
      await _deleteProduct(toggleDelete);
      setToggleDelete(null);
    } catch (error) {
      console.error(error)
    }

  };
  const closedDeleteModal = () => {
    setToggleDelete(null);
  }
  return (
    <Modal className="modal" show={toggleDelete} title="¿ESTAS SEGURO?" close={closedDeleteModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
      <div className="buttons">
        <button onClick={(e) =>
          toast.promise(onDelete(), {
            error: "Ocurrio un error al eliminar el producto",
            success: "Producto eliminado",
            loading: "Se esta eliminando el producto"
          })
        } className="bg-morado2">ACEPTAR</button>
        <button onClick={() => closedDeleteModal()} className="bg-morado2">CANCELAR</button>
      </div>
    </Modal>
  )
}

export default DeleteProduct