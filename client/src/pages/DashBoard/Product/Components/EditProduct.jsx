import React from 'react'
import { useProduct } from '../../../../contexts/ProductContext';
import { useState, useRef } from 'react';
import Modal from './../../../../components/Modal/Modal';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';


function EditProduct({ setToggleModify, toggleModify, productSelect, setProduct }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { _putProduct } = useProduct();
  const { register, handleSubmit, formState: {
    errors
  }, reset } = useForm();
  const closedModifyModal = () => {
    setProduct(null);
    setToggleModify(null);
    setSelectedImage(null);
    reset();
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append('images', selectedImage);
      }
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const res = await _putProduct(formData);
      setProduct(await res);
      return;
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
    setSelectedImage(file);
  };
  console.log(productSelect);
  return (
    <Modal show={toggleModify} title={`EDITAR PRODUCTO: ${productSelect?.name}`} close={closedModifyModal} showHeader={true} showOverlay={true} iClose={true} size={"medium"}>
      {productSelect && productSelect.primary && (<form className='w80 formPatitas' onSubmit={(e) => {
        toast.promise(handleSubmit(onSubmit), {
          error: "Ocurrio un error al actualizar la mascota",
          success: "Actualizando la mascota",
          loading: "Se esta actualizando la mascota"
        });
        e.preventDefault();
      }}>
        <input type="text" {...register("idProduct")} value={productSelect._id} hidden />
        <div className="groups">
          <div className='group'>
            <label>Nombre:</label>
            <input type="text" name="name" defaultValue={productSelect.name} {...register("name")} />
            {errors.name && <span>Es necesario rellenar este campo</span>}
          </div>
          <div className='group'>
            <label>Price: </label>
            <input type="number" name="price" defaultValue={productSelect.price}  {...register("price")} />
            {errors.price && <span>Es necesario rellenar este campo</span>}
          </div>
        </div>
        <div className="groups">
          <div className='group'>
            <label>Stock:</label>
            <input type="numer" name="stock" defaultValue={productSelect.stock} {...register("stock")} />
            {errors.stock && <span>Es necesario rellenar este campo</span>}
          </div>
          <div className='group'>
            <label>Category:</label>
            <input type="text" name="category" defaultValue={productSelect.category} {...register("category")} />
            {errors.category && <span>Es necesario rellenar este campo</span>}
          </div>
        </div>
        <div className='group'>
          <label>Description:</label>
          <textarea type="text" name="description" defaultValue={productSelect.description} {...register("description")} />
          {errors.description && <span>Es necesario rellenar este campo</span>}
        </div>
        <div className="edit-image" onClick={handleImageClick}>
          <img className="img-edit" src={productSelect.primary.secure_url} alt="" />
        </div>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInputChange} />
        {selectedImage && (
          <div className="alert-load">
            <p className="exito">Imagen cargada con exitoo:</p>
            <p>{selectedImage.name}</p>
          </div>
        )
        }
        <button className='bg-morado2' type='submit'>Actualizar</button>
      </form>)}
    </Modal >
  )
}

export default EditProduct