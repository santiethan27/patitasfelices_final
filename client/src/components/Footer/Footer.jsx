import React from 'react';
// El import react es el principal por lo tanto tiene que ir en la primera linea
// Separar los componentes creados por nosotros la comunidad 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
// Se utiliza este free-brands-svg-icons ya que no se puede de ninguna otra forma usar iconos de redes sociales o que tengan exclusividad de svg
import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();
    const name = 'Fundación Patitas Felices';
    const reserve = 'Todos los derechos reservados';
    return (
        <footer className='bg-white'>
            <article className='article'>
                <section className='icon-footer container-email'>
                    <img src='./logo4.png' alt='Logo' className='cursor-pointer logoPatitas' />
                    <div className='email-container cursor-pointer'>
                        <FontAwesomeIcon icon={faEnvelope} size='2x' color='black' className='email-icon' />
                        <p className='txt-black'>Patitasfelices@gmail.com</p>
                    </div>
                </section>
                <section className='icons-social'>
                    <div className='icon-social facebook'>
                        <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
                            <FontAwesomeIcon icon={faFacebookF} color='#fff' />
                        </a>
                    </div>
                    <div className='icon-social instagram'>
                        <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                            <FontAwesomeIcon icon={faInstagram} color='#fff' />
                        </a>
                    </div>
                    <div className='icon-social twitter'>
                        <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>
                            <FontAwesomeIcon icon={faTwitter} color='#fff' />
                        </a>
                    </div>
                    <div className='icon-social whatsapp'>
                        <a href='https://web.whatsapp.com/' target='_blank' rel='noopener noreferrer'>
                            <FontAwesomeIcon icon={faWhatsapp} color='#fff' />
                        </a>
                    </div>
                </section>
            </article>
            <p className='creditos txt-black'>@{year} - {name}, {reserve}</p>
        </footer>
    )
}

export default Footer