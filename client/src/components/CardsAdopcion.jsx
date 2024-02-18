import React from 'react';
import { useAuth } from '../context/AuthContext';

//Se crea un rafc
const CardsAdopcion = ({ onModify, onDelete, animal }) => {
  const { rol } = useAuth();
  return (
    <article className='card'>
      <div className="cont">
        <p className='title'>{animal.name}</p>
        <img src={animal.multimedia[0]?.secure_url} alt='' />
        <section className='info'>
          <p>{animal.age} - {animal.raza}</p>
        </section>
      </div>
      {rol === 'user' ? (
        <div className="buttons">
          <button onClick={onModify} className='cursor-pointer'>Adoptar</button>
        </div>
      ) : (
        <div className="buttons">
          <button onClick={onModify} className='cursor-pointer'>Modificar</button>
          <button onClick={onDelete} className='cursor-pointer eliminar'>Eliminar</button>
        </div>
      )
      }
    </article>
  );
};

export default CardsAdopcion;