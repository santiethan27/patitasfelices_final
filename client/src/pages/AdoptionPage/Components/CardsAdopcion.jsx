import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import "./CardAdoption.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart, faVenusMars } from '@fortawesome/free-solid-svg-icons';
//Se crea un rafc
const CardsAdopcion = ({ animal }) => {
  return (
    <article className='card-adoption'>
      <Link to={`/adoption/${animal._id}`} className="c-pet-img">
        <img className='pet-img' src={animal.multimedia[0]?.secure_url} alt='' />
      </Link>
      <div className="cont bg-gray">
        <div className="title">
          <p className='txt-black'>{animal.name}</p>
          <Link to={`/adoption/${animal._id}`}><FontAwesomeIcon className='txt-rosado' icon={faHeart} /></Link>
        </div>
        <section className='info txt-black'>
          <p>{animal.raza}</p>
        </section>
        <div className="info2 txt-black">
          <p><FontAwesomeIcon className='txt-rosado' icon={faClock} /> {animal.age}</p>
          <p><FontAwesomeIcon className='txt-rosado' icon={faVenusMars} /> {animal.gender}</p>
        </div>
      </div>
    </article>
  );
};

export default CardsAdopcion;