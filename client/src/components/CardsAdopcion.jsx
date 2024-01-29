import React from 'react'


// Creamos un rafc para poder exportar este componente
const CardsAdopcion = () => {
  return (
    <article className='card'>
      <section>
        <img src='./imgcard.png' alt=''/>
      </section>
      <section>
        <p>Nombre : <span>Sacha</span></p>
        <p>Edad : <span>1 Año</span></p>
        <p>Descripcion : <span>Sacha es una gata muy cariñosa y busca un amor que le de amor y proteccion </span></p>
        <p>Raza : <span> Pues normal </span></p>
        <p>Contacto: <span> 3208776 </span></p>
      </section>
      <div></div>
    </article>
  )
}

export default CardsAdopcion