import React from 'react'
// El import react es el principal por lo tanto tiene que ir en la primera linea
import CondicionesAdopcion from './../components/CondicionesAdopcion';
// Separar los componentes creados por nosotros la comunidad 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
function HomePage() {
    return (
        <div>
            <main>
                <div className='c-header'>
                    <header>
                        <img src='./Inicio.jpg' alt='imagen de perrito sonriendo' />
                        <p>Bienvenido a Patitas Felices</p>
                        <FontAwesomeIcon icon={faPaw} size='3x' />
                        <img src='./CorazonesInicio.png' alt='Corazones' />
                    </header>
                    <img src='./1.png' alt='imagen central de gatos y perritos' className='img-header' />
                </div>
                <CondicionesAdopcion />
            </main>
        </div>
    )
}

export default HomePage