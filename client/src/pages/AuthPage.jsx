import React, {useState} from 'react'
import ComponentForm from './../components/ComponentForm';
import './Auth.css'

function AuthPage() {
    const[ordenColumnas, setOrdenColumnas] = useState('normal');

    const cambiarOrdenColumnas = () => {
        setOrdenColumnas(ordenActual => (ordenActual === 'normal' ? 'inverso' : 'normal'));
      };

  return (
    <div className={`authForm ${ordenColumnas}`}>
        <ComponentForm formulario={ordenColumnas === 'normal' ? 'login' : 'register'}/>
        <div className='colForm'>
            <h3 className='title'>{ordenColumnas === 'normal' ? '¡Hola!' : '¡Bienvenido!'}</h3>
            <p className='subtitle'>{ordenColumnas === 'normal' ? 'Crea tu cuenta ahora' : 'Inicia sesion con tu cuenta'}</p>
            <button className='colButton' onClick={cambiarOrdenColumnas}>{ordenColumnas === 'normal' ? 'REGISTRAR' : 'INICIAR SESION'}</button>
        </div>
    </div>

  )
}

export default AuthPage