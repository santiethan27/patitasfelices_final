import React, { useState } from 'react';

//Se crea un rafc
const CardsAdopcion = ({ onModify }) => {
  return (
    <article className='card'>
      <div className="cont">
        <p className='title'>Sacha</p>
        <p className='descripcion'>Sacha es una gata muy cariñosa y busca un amor que le de amor y proteccion</p>
        <img src='./imgcard.png' alt='' />
        <section className='info'>
          <p>1 Año de edad</p>
          <p>Raza normal</p>
          <p>Contacto: 3208776</p>
        </section>
      </div>
      <button onClick={onModify} className='cursor-pointer'>Modificar</button>
    </article>
  );
};

export default CardsAdopcion;