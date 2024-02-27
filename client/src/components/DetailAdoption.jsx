import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAnimal } from '../context/AnimalContext';
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

  {/*Diseño por mejorar*/}
  return (
    <div className='container-detailAdoption '>
      {animal ? (
        <>
          <section className='detailAdoption bg-white'>
            <div className='container-img'>
              <img src={animal.multimedia[0]?.secure_url} alt='' />
            </div>
            <div className='container-info'>
              <div>
                <h2 className='txt-morado'>{animal.name}</h2>
                <section className='info-general '>
                  <div>
                    <h4 className='txt-morado'>Sexo:</h4>
                    <p className='txt-black'>{animal.gender}</p>
                  </div>
                  <div>
                    <h4 className='txt-morado'>Raza:</h4>
                    <p className='txt-black'>{animal.raza}</p>
                  </div>
                  <div>
                    <h4 className='txt-morado'>Color:</h4>
                    <p className='txt-black'>{animal.color}</p>
                  </div>
                  <div>
                    <h4 className='txt-morado'>Edad:</h4>
                    <p className='txt-black'>{animal.age} AÑOS</p>
                  </div>
                  <div>
                    <h4 className='txt-morado'>Tamaño:</h4>
                    <p className='txt-black'>{animal.size}</p>
                  </div>
                  <div>
                    <h4 className='txt-morado'>Estado:</h4>
                    <p className='txt-black'>{animal.status}</p>
                  </div>
                </section>
              </div>
              <div className='description'>
                  <h4 className='txt-morado'>Descripcion:</h4>
                  <p className='txt-black'>{animal.history}</p>
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
