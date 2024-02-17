import React, { useState } from 'react';

//Se crea un rafc
const CardsAdopcion = ({ onModify, animal }) => {
  return (
    <article className='card'>
      <div className="cont">
        <p className='title'>SACHA</p>
        <img src='./imgcard.png' alt='' />
        <section className='info'>
          <p>1 AÑO - CHIHUAHUA</p>
        </section>
      </div>
      <button onClick={onModify} className='cursor-pointer'>Modificar</button>
    </article>
  );
};

export default CardsAdopcion;