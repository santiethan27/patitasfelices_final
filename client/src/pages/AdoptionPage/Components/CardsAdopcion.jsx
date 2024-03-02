import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import "./CardAdoption.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart, faMagnifyingGlass, faVenusMars } from '@fortawesome/free-solid-svg-icons';
//Se crea un rafc
const CardsAdopcion = ({ onModify, onDelete, animal }) => {
  const { rol } = useAuth();
  return (
    // <article className='card-adoption borde-morado'>
    //   <div className="cont">
    //     <p className='title'>{animal.name}</p>
    //     <Link to={`/adoption/${animal._id}`} className='cursor-pointer' key={animal._id}>
    //       <img src={animal.multimedia[0]?.secure_url} alt='' />
    //     </Link>
    //     <section className='info'>
    //       <p><span>Edad: </span>{animal.age}</p>
    //       <p><span>Raza: </span>{animal.raza}</p>
    //     </section>
    //   </div>
    //   <div className="buttons">
    //     <button onClick={onModify} className='cursor-pointer txt-white bg-morado2'>Adoptar Ahora!</button>
    //   </div>
    //   {/* <div className="buttons">
    //       <button onClick={onModify} className='cursor-pointer agregar bg-amethyst'>Modificar</button>
    //       <button onClick={onDelete} className='cursor-pointer eliminar bg-amethyst2'>Eliminar</button>
    //     </div> */}
    // </article>
    <article className='card-adoption'>
      <div className="c-pet-img">
        <img className='pet-img' src={animal.multimedia[0]?.secure_url} alt='' />
      </div>
      <div className="cont bg-gray">
        <div className="title">
          <p className='txt-black'>{animal.name}</p>
          <Link><FontAwesomeIcon className='txt-rosado' icon={faHeart} /></Link>
        </div>
        {/* <Link to={`/adoption/${animal._id}`} className='cursor-pointer' key={animal._id}>

        </Link> */}
        <section className='info txt-black'>
          <p>{animal.raza}</p>
        </section>
        <div className="info2 txt-black">
          <p><FontAwesomeIcon className='txt-rosado' icon={faClock} /> {animal.age}</p>
          <p><FontAwesomeIcon className='txt-rosado' icon={faVenusMars} /> {animal.gender}</p>
        </div>
      </div>
      {/* <div className="buttons">
        <button onClick={onModify} className='cursor-pointer txt-white bg-morado2'>Adoptar Ahora!</button>
      </div> */}
      {/* <div className="buttons">
            <button onClick={onModify} className='cursor-pointer agregar bg-amethyst'>Modificar</button>
            <button onClick={onDelete} className='cursor-pointer eliminar bg-amethyst2'>Eliminar</button>
          </div>  */}
    </article>
  );
};

export default CardsAdopcion;