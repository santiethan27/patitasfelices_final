import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Importa el icono 'times'

import CardsAdopcion from "./CardsAdopcion";
import "./Adopcion.css";

// Creamos un rafc para poder exportar este componente
const Adopcion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetKey, setSelectedPetKey] = useState(null);

  const openModal = (key) => {
    setSelectedPetKey(key);
    setIsModalOpen(true);
  };
  const petKeys = Array.from({ length: 20 }, (v, i) => i);

  const cards = petKeys.map((key) => (
    <CardsAdopcion key={key} petKey={key} onModify={() => openModal(key)} />
  ));
  return (
    <div className="container-adopcion">
      <header>
        {/* <img src='./adoptar.png' alt='Amigos peludos' className='img-header'/> */}
        <button type="button" className="txt-white cursor-pointer">
          Sube la mascota
        </button>
        <p className="active">
          Aquí puedes subir un animal que quieras ayudar para que tenga un hogar
        </p>
      </header>
      <div className="container-cards">{cards}</div>
      {isModalOpen && (
        <div className="container-modal">
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <h2>
                Modificar Información de la mascota con la key: {selectedPetKey}
              </h2>
              <form>
                <div class="form-group">
                  <label for="nombre">Nombre</label>
                  <input type="text" id="nombre" value="Sacha" readonly />
                </div>
                <div class="form-group">
                  <label for="edad">Edad</label>
                  <input type="text" id="edad" value="1 año" readonly />
                </div>
                <div class="form-group">
                  <label for="descripcion">Descripción</label>
                  <input type="text" id="descripcion" value="lorem" readonly />
                </div>
                <div class="form-group">
                  <label for="raza">Raza</label>
                  <input type="text" id="raza" value="Pues normal" readonly />
                </div>
                <div class="form-group">
                  <label for="contacto">Contacto</label>
                  <input type="text" id="contacto" value="3208776" readonly />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adopcion;
