import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAnimal } from '../../contexts/AnimalContext';
import "./DetailAdoption.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenusMars, faCat, faDroplet, faClockRotateLeft, faDownLeftAndUpRightToCenter, faNoteSticky, faTriangleExclamation, faEnvelope, faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import Modal from './../../components/Modal/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { useAdoption } from '../../contexts/AdoptionContext';

const DetailAdoption = () => {
  const { id } = useParams();
  const { _getAnimal } = useAnimal();
  const [animal, setAnimal] = useState();
  const { user } = useAuth();
  const { _postAdoption, _verifyAdoption } = useAdoption();
  const [status, setStatus] = useState();
  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const animalData = await _getAnimal(id);
        setAnimal(animalData);
        const res = await _verifyAdoption(user._id || user.id);
        setStatus(res);
      } catch (error) {
        console.error('Error al obtener información del animal:', error);
      }
    };

    if (id) {
      fetchAnimal();
    }
  }, [id, _getAnimal]);

  const [toggleModifyModal, setToggleModify] = useState(false);

  const onAdoption = async () => {
    try {
      const id = user.id || user._id;
      const data = {
        userId: id,
        animalId: animal._id
      }
      await _postAdoption(data);
      const res = await _verifyAdoption(user._id || user.id);
      setStatus(res);
      closedModifyModal();
    } catch (error) {
      console.log(error);
    }
  }

  const closedModifyModal = () => {
    setToggleModify(false);
  }
  const toggleModify = () => {
    setToggleModify(true);
  }
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
                <button className='bg-morado2 txt-white' onClick={toggleModify}>ADOPTAR AHORA</button>
              </div>
            </div>
            <div className='container-img bg-morado2'>
              <img className='bg-white' src={animal.multimedia[0]?.secure_url} alt='' />
            </div>
          </section>
          <Modal className="modal" show={toggleModifyModal} title='¿Quieres aplicar para adoptar?' close={closedModifyModal} showHeader={true} showOverlay={true} size={"medium"} align={"center"} iClose={true}>
            {status === 'OK' ? (<div className="c-adoptar">
              <p>Para adoptar, primero debemos tener una entrevista contigo para saber si eres apto para adoptar.</p>
              <p>Nos comunicaremos contigo para establecer el dia en el cual podamos hacer la entrevista, es totalmente virtual</p>
              <p className='info'><span><FontAwesomeIcon icon={faEnvelope} /> Correo: {user.email}</span><span><FontAwesomeIcon icon={faMobileScreenButton} /> Celular: {user.phone}</span></p>
              <p className='txt-rosado'><FontAwesomeIcon icon={faTriangleExclamation} /> Si la informacion es incorrecta, edita tu informacion en el perfil de usuario.</p>
              <div className="buttons">
                <button onClick={(e) => {
                  e.preventDefault();
                  toast.promise(onAdoption(), {
                    error: "Ocurrio un error al hacer la solicitud",
                    success: "Se registro la solicitud, nos comunicaremos contigo",
                    loading: "Procesando solicitud, espera un momento"
                  });
                }} className="bg-morado2 txt-white">SOLICITAR</button>
                <button onClick={() => closedDeleteModal()} className="bg-morado2 txt-white">CANCELAR</button>
              </div>
            </div>) : (
              <h3>Ya tienes un proceso de adopcion pendiente, revisa tu perfil</h3>
            )}
          </Modal>
        </>
      ) : (
        <p>No se pudo cargar la información del animal.</p>
      )}
    </div>
  );
}

export default DetailAdoption;
