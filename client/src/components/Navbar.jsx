import React, { useEffect, useState } from 'react';
// El import react es el principal por lo tanto tiene que ir en la primera linea
// Separar los componentes creados por nosotros la comunidad 
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
// Creamos un rafc para poder exportar este componente
import './Navbar.css';

const Navbar = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [showIconMenu, setshowIconMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Actualiza el estado showIconMenu basado en el tamaño de la pantalla
    if(screenSize <= 850){
      setshowIconMenu(true);
      setShowMenu(false);
    }else if(screenSize >= 850){
      setshowIconMenu(false);
      setShowMenu(true);
    }
  }, [screenSize]);

  const toggleShow = () => {
    setShowMenu(!showMenu);
  };
  return (
    // Version navbar 1.0 (Posibles cambios !)
    <div className='nav-container'>
      {showIconMenu ? (<FontAwesomeIcon icon={faBars} size='2x' color='#fff' className='cursor-pointer icon-bar bg-black' onClick={toggleShow}/>): null}
      {showMenu ? (<nav>
        <section className='nav bg-black'>
          <div className='div-nav'>
            <NavLink to={`/`}>
            <h2 className='cursor-pointer txt-white'>Patitas Felices</h2>
            <img src="./logo.png" alt='Logo' className='cursor-pointer' />
            </NavLink>
          </div>
          <div className='div-nav'>
            <ul>
              <NavLink to={`/`} className='cursor-pointer txt-white' activeClassName="active">Inicio</NavLink>
              <NavLink to={`/Adoptar`} className='cursor-pointer txt-white' activeClassName="active">Adoptar</NavLink>
              <NavLink to={`/Fundacion`} className='cursor-pointer txt-white' activeClassName="active">Fundacion</NavLink>
              <NavLink to={`/Rescates`} className='cursor-pointer txt-white' activeClassName="active">Rescatados</NavLink>
              <NavLink to={`/Donaciones`} className='cursor-pointer txt-white' activeClassName="active">Donaciones</NavLink>
              <NavLink to={`/Blog`} className='cursor-pointer txt-white' activeClassName="active">Blog</NavLink>
            </ul>
          </div>
          <div className='div-nav'>
            {/* Se crea un contenedor para poder mover el icono desde el css ya que sin el contenedor es imposible o no encontre forma */}
            <div className='icon-user'>
              <FontAwesomeIcon icon={faUser} className='fa-2x cursor-pointer txt-white' />
            </div>
          </div>
        </section>
      </nav>) : null}
    </div>
  )
}

export default Navbar
