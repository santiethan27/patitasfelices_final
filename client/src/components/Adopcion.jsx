import React from 'react'
import CardsAdopcion from './CardsAdopcion';
import './Adopcion.css';
// Creamos un rafc para poder exportar este componente
const Adopcion = () => {

  const cards = Array.from({ length: 20 }, (v, i) => <CardsAdopcion key={i} />);

  return (
    <div className='container-adopcion'>
      <header>
      {/* <img src='./adoptar.png' alt='Amigos peludos' className='img-header'/> */}
      <button type='button' className='txt-white cursor-pointer'>Sube la mascota</button>
      <p className='active'>Aquí puedes subir un animal que quieras ayudar para que tenga un hogar</p>
      </header>
      <div className='container-cards'>
      {cards}
      </div>
    </div>
  )
}

export default Adopcion
