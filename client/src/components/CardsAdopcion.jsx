import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

//Se crea un rafc
const CardsAdopcion = ({ onModify, onDelete, animal }) => {
  const { rol } = useAuth();
  return (
    <article className='card-adoption'>
      <div className="cont">
        <p className='title'>{animal.name}</p>
        <Link to={`/adoption/${animal._id}`} className='cursor-pointer' key={animal._id}>
          <img src={animal.multimedia[0]?.secure_url} alt='' />
        </Link>
        <section className='info'>
          <p><span>Edad: </span>{animal.age}</p>
          <p><span>Raza: </span>{animal.raza}</p>
        </section>
      </div>
      {rol === 'user' ? (
        <div className="buttons">
          <button onClick={onModify} className='cursor-pointer bg-amethyst'>Adoptar Ahora!</button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={onModify} className='cursor-pointer agregar bg-amethyst'>Modificar</button>
          <button onClick={onDelete} className='cursor-pointer eliminar bg-amethyst2'>Eliminar</button>
        </div>
      )
      }
    </article>
  );
};

export default CardsAdopcion;