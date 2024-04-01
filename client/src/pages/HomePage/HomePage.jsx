import React from 'react'
// El import react es el principal por lo tanto tiene que ir en la primera linea
import CondicionesAdopcion from './Components/Condiciones/CondicionesAdopcion';
// Separar los componentes creados por nosotros la comunidad 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight, faHandPointer, faHeartPulse, faHouseMedical, faMicrophone, faMicroscope, faPaw } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';
import { Link } from 'react-router-dom';
function HomePage() {

    return (
        <div>
            <main>
                <div className='c-header bg-morado2'>
                    <img src='./images/personapet3.png' alt='imagen central de gatos y perritos' className='img-header' />
                    <header className='txt-white'>
                        <p>NO SOLO LAS PERSONAS NECESITAN UNA CASA, TAMBIEN LOS ANIMALES</p>
                        <div className="infos">
                            <div className="info bg-white txt-black"><FontAwesomeIcon className='icon txt-morado' icon={faHeartPulse} />Su presencia puede ser reconfortante, especialmente en momentos difíciles.</div>
                            <div className="info bg-white txt-black"><FontAwesomeIcon className='icon txt-morado' icon={faMicroscope} />Está científicamente comprobado que interactuar con mascotas puede reducir el estrés y la ansiedad</div>
                            <div className="info bg-white txt-black"><FontAwesomeIcon className='icon txt-morado' icon={faPaw} />La presencia de una mascota en el hogar puede mejorar el bienestar mental y emocional de sus dueños. </div>
                        </div>
                        <Link to='/adoptar' className='borde-white txt-white'>ADOPTAR AHORA!<FontAwesomeIcon className='hand txt-white' icon={faHandPointer} /></Link>

                    </header>
                </div>
                <div className="services">
                    <div className="service">
                        <div className="img"><Link to={'/donations'}><img src="https://globalpetindustry.com/wp-content/uploads/2023/10/The-impact-of-inflation-on-pet-parents-wallets-April-2023.png" alt="" /></Link></div>
                        <p className='txt-morado'>Donar dinero <FontAwesomeIcon className='icon txt-morado' icon={faArrowCircleRight} /></p>
                    </div>
                    <div className="service">
                        <div className="img"><Link to={'/products'}><img src="https://lienzocreativo.com/img/cms/Retratos/mascota-lienzo-pru2.jpg" alt="" /></Link></div>
                        <p className='txt-morado'>Comprar productos <FontAwesomeIcon className='icon txt-morado' icon={faArrowCircleRight} /></p>
                    </div>
                    <div className="service">
                        <div className="img"><Link to={'/adoptar'}><img src="https://t3.ftcdn.net/jpg/02/52/38/76/360_F_252387654_zToUZrtt7OzYv50aJ4XRqHtRukI5M0XB.jpg" alt="" /></Link></div>
                        <p className='txt-morado'>Adopta una mascota <FontAwesomeIcon className='icon txt-morado' icon={faArrowCircleRight} /></p>
                    </div>
                    <div className="service">
                        <div className="img"><Link to={'/blog'}><img src="https://t3.ftcdn.net/jpg/05/24/56/46/360_F_524564695_g4vnTnywI45vKFc11Mqny1Ra5ZstyCEK.jpg" alt="" /></Link></div>
                        <p className='txt-morado'>Revisa nuestro blog <FontAwesomeIcon className='icon txt-morado' icon={faArrowCircleRight} /></p>
                    </div>
                </div>
                <CondicionesAdopcion />
            </main>
        </div>
    )
}

export default HomePage