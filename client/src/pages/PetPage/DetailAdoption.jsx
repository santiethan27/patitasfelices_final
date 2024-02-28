import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAnimal } from '../../contexts/AnimalContext';
import "./DetailAdoption.css";

const DetailAdoption = () => {
  const { id } = useParams();
  const { _getAnimal } = useAnimal();
  const [animal, setAnimal] = useState();

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const animalData = await _getAnimal(id);
        setAnimal(animalData);
        console.log(animalData)
      } catch (error) {
        console.error('Error al obtener información del animal:', error);
      }
    };

    if (id) {
      fetchAnimal();
    }
  }, [id, _getAnimal]);

  {/*Diseño por mejorar*/ }
  return (
    <div className='container-detailAdoption '>

      {animal ? (
        <>
          <section className='detailAdoption bg-white'>
            <div className='container-img'>
              <img src={animal.multimedia[0]?.secure_url} alt='' />
            </div>
            <div className='container-info'>
              <div className='list'>
                <h2 className='txt-morado'>{animal.name}</h2>
                <section className='info-general '>
                  <div className='list'>
                    <h4 className='txt-morado'>SEXO:</h4>
                    <p className='txt-black'>{animal.gender}</p>
                  </div>
                  <div className='list'>
                    <h4 className='txt-morado'>RAZA:</h4>
                    <p className='txt-black'>{animal.raza}</p>
                  </div>
                  <div className='list'>
                    <h4 className='txt-morado'>COLOR:</h4>
                    <p className='txt-black'>{animal.color}</p>
                  </div>
                  <div className='list'>
                    <h4 className='txt-morado'>EDAD:</h4>
                    <p className='txt-black'>{animal.age} AÑOS</p>
                  </div>
                  <div className='list'>
                    <h4 className='txt-morado'>TAMAÑO:</h4>
                    <p className='txt-black'>{animal.size}</p>
                  </div>
                  <div className='list'>
                    <h4 className='txt-morado'>ESTADO:</h4>
                    <p className='txt-black'>{animal.status}</p>
                  </div>
                </section>
              </div>
              <div className='description'>
                <h4 className='txt-morado'>Descripcion:</h4>
                <p className='txt-black '>{animal.history}</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>No se pudo cargar la información del animal.</p>
      )}
    </div>
  );
}

export default DetailAdoption;
