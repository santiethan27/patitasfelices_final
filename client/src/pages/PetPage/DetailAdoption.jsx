import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAnimal } from '../../contexts/AnimalContext';
import "./DetailAdoption.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenusMars, faCat, faDroplet, faClockRotateLeft, faDownLeftAndUpRightToCenter, faNoteSticky } from '@fortawesome/free-solid-svg-icons';

const DetailAdoption = () => {
  const { id } = useParams();
  const { _getAnimal } = useAnimal();
  const [animal, setAnimal] = useState();

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const animalData = await _getAnimal(id);
        setAnimal(animalData);
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
    <div className='container-detailAdoption'>

      {animal ? (
        <>
          <section className='detailAdoption bg-white'>
            {/* <svg className='ondas' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#b3a8e2" fill-opacity="10" d="M0,224L40,213.3C80,203,160,181,240,160C320,139,400,117,480,128C560,139,640,181,720,213.3C800,245,880,267,960,256C1040,245,1120,203,1200,170.7C1280,139,1360,117,1400,106.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
             */}
            <div className='container-info'>
              <p className='status bg-rosa txt-white'>{animal.status}</p>
              <div className='list'>
                <h2 className='txt-morado'>Hola! Soy {animal.name}</h2>
                <section className='info-general '>
                  <div className='item'>
                    <h4 className='txt-morado'><FontAwesomeIcon icon={faVenusMars} /> SEXO</h4>
                    <p>{animal.gender}</p>
                  </div>
                  <div className='item'>
                    <h4 className='txt-morado'><FontAwesomeIcon icon={faCat} /> RAZA</h4>
                    <p>{animal.raza}</p>
                  </div>
                  <div className='item'>
                    <h4 className='txt-morado'><FontAwesomeIcon icon={faDroplet} /> COLOR</h4>
                    <p>{animal.color}</p>
                  </div>
                  <div className='item'>
                    <h4 className='txt-morado'><FontAwesomeIcon icon={faClockRotateLeft} /> EDAD</h4>
                    <p>{animal.age}</p>
                  </div>
                  <div className='item'>
                    <h4 className='txt-morado'><FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} /> TAMAÑO</h4>
                    <p>{animal.size}</p>
                  </div>
                  <div className='item'>
                    <h4 className='txt-morado'><FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} /> VACUNADO</h4>
                    <p>{animal.isVaccinated}si</p>
                  </div>
                  <div className='item'>
                    <h4 className='txt-morado'><FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} /> CASTRADO</h4>
                    <p>{animal.isCastrated}SI</p>
                  </div>
                </section>
              </div>
              <div className='item description'>
                <h4 className='txt-morado'><FontAwesomeIcon icon={faNoteSticky} /> HISTORIA</h4>
                <p>{animal.history} Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero amet quos nihil commodi voluptatibus, atque molestiae facere voluptatum fugiat distinctio dolore ipsam delectus velit et ex quibusdam assumenda enim ullam!</p>
              </div>
              <div className="button-adoptar">
                <button className='bg-morado2 txt-white'>ADOPTAR AHORA</button>
              </div>
            </div>
            <div className='container-img bg-morado2'>
              <img className='bg-white' src={animal.multimedia[0]?.secure_url} alt='' />
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
