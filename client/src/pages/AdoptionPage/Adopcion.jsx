import React, { useEffect, useRef, useState } from "react";
import CardsAdopcion from "./Components/CardsAdopcion";
import "./Adopcion.css";
import { useAnimal } from "../../contexts/AnimalContext";
import Modal from "../../components/Modal/Modal";
import { useForm } from "react-hook-form";
import "../../styled-components/Forms.css";
import ToasterCustom from './../../components/ToasterCustom/ToasterCustom';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faCircle, faDog, faVenusMars, faPaw, faHeart } from '@fortawesome/free-solid-svg-icons';
import MyListbox from './../../components/ListBox/ListBox';

const Adopcion = () => {
  const { animals, _getAnimals, _deleteAnimal } = useAnimal();
  const [selectedItem, setSelectedPetKey] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState("");

  const options = [{ id: 0, name: 'Nombre' }, { id: 1, name: 'Raza' }];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const loadAnimals = async () => {
    await _getAnimals()
  }
  useEffect((() => {
    loadAnimals();
  }), []);

  const searcher = (e) => {
    setSearch(e.target.value)
  }
  let results = []
  if (!search) {
    results = animals;
  } else {

    results = animals.filter((dato) => selectedOption.name == options[0].name ? dato.name.toLowerCase().includes(search.toLocaleLowerCase()) : dato.raza.toLowerCase().includes(search.toLocaleLowerCase()));
  }
  const { register, handleSubmit, formState: {
    errors
  }, reset } = useForm();
  const { _putAnimal } = useAnimal();

  const Toggle = (animal) => {
    if (animal == undefined) {
      reset();
    }
    setSelectedImage(null);
    setSelectedPetKey(animal);
    setModal(!modal)
  };
  const Toggle2 = (animal) => {
    setSelectedPetKey(animal);
    setModal2(!modal2);
  };
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append('images', selectedImage);
      }
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const res = await _putAnimal(formData);
      setSelectedPetKey(await res);
    } catch (error) {
      console.log(error);
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
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  return (
    <>
      <div className="container-adopcion">
        <div className="c-header  bg-morado2">
          <header className="adop-header txt-black">
            <div className="adop-col1">
              <div className="adop-col-cont bg-white">
                <FontAwesomeIcon icon={faPaw} className="txt-morado adop-icon" />
                <h3 className="txt-black">Dale hogar a un amigo peludo</h3>
              </div>
              <div className="adop-col-cont bg-white">
                <FontAwesomeIcon icon={faHeart} className="txt-morado adop-icon" />
                <h3 className="txt-black">Encuentra tu nuevo mejor amigo</h3>
              </div>
            </div>
            <div className="adop-col2">
              <img src="./images/bone2.png" alt="" className="bone" />
              <img src="./images/mascotaLogin.png" alt="" />
            </div>
          </header>
        </div>
        <div className="pet-icons">
          <div className="c-pet-icon">
            <div className="pet-icon bg-morado2">
              <img src="./images/dog.png" alt="" />
            </div>
            <p className="pet-class"><span><FontAwesomeIcon icon={faCircle} className="txt-morado" /></span> Perros</p>
          </div>
          <div className="c-pet-icon">
            <div className="pet-icon borde-morado">
              <img src="./images/black-cat.png" alt="" />
            </div>
            <p className="pet-class">Gatos</p>
          </div>
        </div>
        <div className="c-search">
          <div className="pet-search">
            <input type="text" placeholder="Buscar..." value={search} onChange={searcher} className="in-search" />
            <MyListbox options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          </div>
        </div>
        <div className="adop-container-cards">{
          results.length > 0 ? (
            results.map((animal) => (
              <CardsAdopcion key={animal._id} animal={animal} onDelete={() => Toggle2(animal._id)} onModify={() => Toggle(animal)} />
            ))
          ) : (
            <p>No se encontraron resultados</p>
          )
        }</div>
      </div>
    </>
  );
};

export default Adopcion;
