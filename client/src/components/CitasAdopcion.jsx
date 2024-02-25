import React from 'react'
import "./Forms.css"
import "./CitasAdopcion.css"

export const CitasAdopcion = () => {
  return (
<div className='conta'>
 <form className='formPatitas'>
    <img className='imagen' src="./gatoscafes.png" alt="" />
    <div className='groups'>
    <div className='group'>
      <label className='text'>Nombre Adoptante</label>
      <input type="text" placeholder='Nombre Mascota' />
    </div>
    <div className='group'>
      <label className='text'>Nombre Adoptante</label>
      <input type="text" placeholder='Nombre Adoptante' />
    </div>
    </div>
    <div className='group'>
      <label className='text'>Fecha</label>
      <input type="date" />    
    </div>
    <div className='group'>
      <label className='text'>Hora</label>
      <input type="time"  />    
    </div>
    <button className='text'>GUARDAR CAMBIOS</button>
 </form>
</div>
  )
}
export default CitasAdopcion