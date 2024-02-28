import React from 'react'
// El import react es el principal por lo tanto tiene que ir en la primera linea
import CondicionesAdopcion from './Components/Condiciones/CondicionesAdopcion';
// Separar los componentes creados por nosotros la comunidad 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faPaw } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';
import { Link } from 'react-router-dom';
function HomePage() {

    return (
        <div>
            <main>
                <div className='c-header'>
                    <header className='bg-amethyst txt-white'>
                        <p>NO SOLO LAS PERSONAS NECESITAN UNA CASA, TAMBIEN LOS ANIMALES</p>
                        <Link to='/adoptar' className='bg-lavender txt-amethyst'>ADOPTAR AHORA!<FontAwesomeIcon className='hand txt-white' icon={faHandPointer} /></Link>
                    </header>
                    <img src='./1.png' alt='imagen central de gatos y perritos' className='img-header' />
                </div>
                <CondicionesAdopcion />
            </main>
        </div>
    )
}

export default HomePage