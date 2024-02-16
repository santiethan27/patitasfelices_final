import React, { useEffect, useState } from 'react';
// El import react es el principal por lo tanto tiene que ir en la primera linea
// Separar los componentes creados por nosotros la comunidad 
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faX } from '@fortawesome/free-solid-svg-icons';
// Creamos un rafc para poder exportar este componente
import './Navbar.css';
import { set } from 'mongoose';


const Navbar = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [showIconMenu, setshowIconMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [changeIcon, setChangeIcon] = useState(false);
  const [txtChangeColor, setTextChangeColor] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth)
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Actualiza el estado showIconMenu basado en el tamaño de la pantalla
    if (showIconMenu === false && screenSize < 850) {
      setshowIconMenu(true);
      setShowMenu(false);
    } else {
      if (screenSize > 850) {
        setshowIconMenu(false);
        setShowMenu(true);
        setChangeIcon(false);
        setTextChangeColor(false);
      }
    }
  }, [screenSize]);

  const toggleShow = () => {
    setShowMenu(!showMenu);
    setChangeIcon(!changeIcon);
    setTextChangeColor(!txtChangeColor);
  };


  return (
    // Version navbar 2.0 (Posibles cambios !)
    <div className={showMenu && showIconMenu ? "back active" : "back"} onClick={showMenu && showIconMenu ? toggleShow : null}>
      <div className='container-navbar' onClick={(e) => e.stopPropagation()}>
        <div className='container-iconBar'>
          {showIconMenu ? (<FontAwesomeIcon icon={changeIcon ? faX : faBars} size='2x' color='#fff' className={`cursor-pointer icon-bar transition ${txtChangeColor ? 'txt-white' : 'txt-black'}`} onClick={toggleShow} />) : null}
        </div>
        {showMenu ? (<nav className='bg-rosa transition'>
          <div className='div-nav'>
            <h2 className='cursor-pointer txt-white'>Patitas Felices</h2>
            <img src="./logo3.png" alt='Logo' className='cursor-pointer logoPatitas' />
          </div>
          <div className='div-nav'>
            <ul>
              <NavLink to={`/`} className='cursor-pointer txt-white link' onClick={showMenu && showIconMenu ? toggleShow : null} activeclassname="active">Inicio</NavLink>
              <NavLink to={`/adoptar`} className='cursor-pointer txt-white link' onClick={showMenu && showIconMenu ? toggleShow : null} activeclassname="active">Adoptar</NavLink>
              <NavLink to={`/fundacion`} className='cursor-pointer txt-white link' onClick={showMenu && showIconMenu ? toggleShow : null} activeclassname="active">Fundacion</NavLink>
              <NavLink to={`/rescates`} className='cursor-pointer txt-white link' onClick={showMenu && showIconMenu ? toggleShow : null} activeclassname="active">Rescatados</NavLink>
              <NavLink to={`/donaciones`} className='cursor-pointer txt-white link' onClick={showMenu && showIconMenu ? toggleShow : null} activeclassname="active">Donaciones</NavLink>
              <NavLink to={`/blog`} className='cursor-pointer txt-white link' onClick={showMenu && showIconMenu ? toggleShow : null} activeclassname="active">Blog</NavLink>
            </ul>
          </div>
          <div className='div-nav'>
            {/* Se crea un contenedor para poder mover el icono desde el css ya que sin el contenedor es imposible o no encontre forma */}
            <div className='icon-user'>
              <NavLink to={`/perfil`} className='cursor-pointer txt-white link' activeclassname="active"><FontAwesomeIcon icon={faUser} className='fa-2x cursor-pointer' /></NavLink>
            </div>
          </div>
        </nav>) : null}
      </div>
    </div>

  )
}

export default Navbar