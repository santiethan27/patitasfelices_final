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
      <h1 className='txt-white-pastel bg-amethyst'>Detalles de mascota</h1>
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
                    <h4 className='txt-black'>SEXO:</h4>
                    <p className='bg-rosa txt-morado'>{animal.gender}</p>
                  </div>
                  <div>
                    <h4 className='txt-black'>RAZA:</h4>
                    <p className='bg-rosa txt-morado'>{animal.raza}</p>
                  </div>
                  <div>
                    <h4 className='txt-black'>COLOR:</h4>
                    <p className='bg-rosa txt-morado'>{animal.color}</p>
                  </div>
                  <div>
                    <h4 className='txt-black'>EDAD:</h4>
                    <p className='bg-rosa txt-morado'>{animal.age} AÑOS</p>
                  </div>
                  <div>
                    <h4 className='txt-black'>TAMAÑO:</h4>
                    <p className='bg-rosa txt-morado'>{animal.size}</p>
                  </div>
                  <div>
                    <h4 className='txt-black'>ESTADO:</h4>
                    <p className='bg-rosa txt-morado'>{animal.status}</p>
                  </div>
                </section>
              </div>
              <div className='description'>
                  <h4>Descripcion:</h4>
                  <p className='bg-rosa txt-morado '>{animal.history}</p>
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
