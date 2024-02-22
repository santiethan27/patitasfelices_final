import React, { useEffect, useState } from "react";
import CardsAdopcion from "./CardsAdopcion";
import "./Adopcion.css";
import { useAnimal } from "../context/AnimalContext";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import "./Forms.css";

const Adopcion = () => {
  const { animals, _getAnimals, _deleteAnimal } = useAnimal();
  const [selectedItem, setSelectedPetKey] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  useEffect((() => {
    _getAnimals();
  }), []);

  const { register, handleSubmit, formState: {
    errors
  }, reset } = useForm();
  const { _putAnimal } = useAnimal();




  const Toggle = (animal) => {
    if (animal == undefined) {
      reset();
    }
    setSelectedPetKey(animal);
    setModal(!modal)
  };
  const Toggle2 = (animal) => {
    setSelectedPetKey(animal);
    setModal2(!modal2);
  };
  const Toggle3 = (show) => {
    setModal3(show);
  };
  const onSubmit = async (data) => {
    try {
      Toggle3(true);
      await _putAnimal(data);
    } catch (error) {
      Toggle3(false);
      console.log(error);
    } finally {
      Toggle3(false);
    }
  };
  const onDelete = async () => {
    try {
      await _deleteAnimal(selectedItem);
      setSelectedPetKey(false);
      Toggle2();
    } catch (error) {
      console.error(error)
    }

  };
  return (
    <>
      <div className="container-adopcion">
        <header>
          <div className="container-txt">
            <h3>PERROS Y GATOS DISPONIBLES PARA SER ADOPTADOS</h3>
            <h4>Click en la foto de la mascota para abrir una nueva ventana con informacion adicional sobre la mascota</h4>
          </div>
          <div className="container-img">
            <img src="./images/petspage.png" alt="" />
          </div>
        </header>
        <div className="container-cards">{
          animals.map((animal) => (
            <CardsAdopcion key={animal._id} animal={animal} onDelete={() => Toggle2(animal._id)} onModify={() => Toggle(animal)} />
          ))
        }</div>
      </div>

      {/* */}
      <Modal show={modal} title={`EDITAR MASCOTA: ${selectedItem?.name}`} close={Toggle} showHeader={true} showOverlay={true} iClose={true} size={"medium"}>
        {selectedItem && (<form className="w80 formPatitas" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("idPublication", { required: true })} value={selectedItem._id} hidden />
          <div className="groups">
            <div className="group">
              <label>Nombre:</label>
              <input type="text" name="name" defaultValue={selectedItem.name}  {...register("name", { required: true })} />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="group">
              <label>Edad (En años): </label>
              <input type="text" name="age" defaultValue={selectedItem.age} {...register("age", { required: true })} />
              {errors.age && <span>This field is required</span>}
            </div>
          </div>
          <div className="groups">
            <div className="group">
              <label>Raza:</label>
              <input type="text" name="raza" defaultValue={selectedItem.raza} {...register("raza", { required: true })} />
              {errors.raza && <span>This field is required</span>}
            </div>
            <div className="group">
              <label>Sexo:</label>
              <input type="text" name="gender" defaultValue={selectedItem.gender} {...register("gender", { required: true })} />
              {errors.gender && <span>This field is required</span>}
            </div>
          </div>
          <div className="groups">
            <div className="group">
              <label>Color:</label>
              <input type="text" name="color" defaultValue={selectedItem.color} {...register("color", { required: true })} />
              {errors.color && <span>This field is required</span>}
            </div>
            <div className="group">
              <label>Size:</label>
              <input type="text" name="size" defaultValue={selectedItem.size} {...register("size", { required: true })} />
              {errors.size && <span>This field is required</span>}
            </div>
          </div>
          <div className="groups">
            <div className="group">
              <label>¿Esta vacunado?:</label>
              <input type="text" name="isVaccinated" defaultValue={selectedItem.isVaccinated} {...register("isVaccinated", { required: true })} />
              {errors.isVaccinated && <span>This field is required</span>}
            </div>
            <div className="group">
              <label>¿Esta castrado?:</label>
              <input type="text" name="isCastrated" defaultValue={selectedItem.isCastrated} {...register("isCastrated", { required: true })} />
              {errors.isCastrated && <span>This field is required</span>}
            </div>
          </div>
          <div className="group">
            <label>Historia:</label>
            <textarea type="text" name="history" defaultValue={selectedItem.history} {...register("history", { required: true })} />
            {errors.history && <span>This field is required</span>}
          </div>



          <button type="submit" className="bg-azul">Actualizar</button>
        </form>)}

      </Modal>
      <Modal className="modal" show={modal2} title="¿ESTAS SEGURO?" close={Toggle2} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
        <div className="buttons">
          <button onClick={() => onDelete()}>ACEPTAR</button>
          <button onClick={() => Toggle2()}>CANCELAR</button>
        </div>
      </Modal>
      <Modal className="modalLoading" show={modal3} title="CARGANDO..." close={Toggle3} showHeader={false} showOverlay={true} size={"small"} align={"center"} iClose={false}>
        <h3>CARGANDO...</h3>
      </Modal>
    </>
  );
};

export default Adopcion;
