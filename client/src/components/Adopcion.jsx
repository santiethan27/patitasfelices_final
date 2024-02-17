import React, { useEffect, useState } from "react";
import CardsAdopcion from "./CardsAdopcion";
import "./Adopcion.css";
import { useAnimal } from "../context/AnimalContext";
import Modal from "./Modal";

const Adopcion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedPetKey] = useState(null);
  const { animals, _getAnimals, _deleteAnimal } = useAnimal();

  
  const openModal = (key) => {
    setSelectedPetKey(key);
    setIsModalOpen(true);
  };
  const onDelete = async (key) => {
    _deleteAnimal(key);
  };
  
  useEffect((() => {
    _getAnimals();
  }), [])

  return (
    <>
      <div className="container-adopcion">
        <header>
          <button type="button" className="txt-white cursor-pointer">
            Sube una mascota
          </button>
          <p className="active">
            Aquí puedes subir un animal que quieras ayudar para que tenga un hogar
          </p>
        </header>
        <div className="container-cards">{
          animals.map((animal) => (
            <CardsAdopcion key={animal._id} animal={animal} onDelete={() => onDelete(animal._id)} onModify={() => openModal(animal)} />
          ))
        }</div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedItem={selectedItem} />
    </>
  );
};

export default Adopcion;
