import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function ComponentForm({ formulario }) {

  //Constantes para guardar los municipios y departamentos de Colombia
  const [municipios, setMunicipios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  //State de que departamento esta seleccionado, por defecto es Antioquia
  const [departamento, setDepartamento] = useState('Antioquia');
  const { register, handleSubmit, formState: {
    errors
  } } = useForm();
  //Consumiendo API de departamentos y municipios del pais
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json');
        const result = await response.json();
        const departamentosUnicos = Array.from(new Set(result.map(item => item.departamento)));
        setDepartamentos(departamentosUnicos);
        // Filtrar por departamento
        const municipiosFiltrados = result.filter(item => item.departamento === departamento).map(item => item.municipio);
        setMunicipios(municipiosFiltrados);

      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [departamento]);

  //Funcion para detectar cuando se hace click en un departamento y guardarla en su State
  const handleDepartamentoChange = (nuevoDepartamento) => {
    setDepartamento(nuevoDepartamento);
  };

  //Funcion para no permitir menores de edad asl seleccionar la fecha de nacimiento
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };
  //Renderizr los dos formularios tanto de login como de register


  //Funciones para registrar y iniciar sesion
  const { signup, login, isAuthen, errors: AuthErrors } = useAuth();
  const navigate = useNavigate();
  //Redireccionar
  useEffect(() => {
    if (isAuthen) navigate("/");
  }, [isAuthen])

  const renderizar = () => {
    if (formulario == "login") {
      return (
        <form className='formClass' onSubmit={handleSubmit(async (values) => {
          login(values)
        })}>
          <h3 className='title'>Iniciar Sesión</h3>
          <div className='icon'>
            <img className='g-icon' src='./icons/google.png'></img>
          </div>
          <p className='f-text'>o usa tu email</p>
          <input type='email' placeholder='Email' className='inputClass' {...register("email", { required: true })}></input>
          {
            errors.email && (
              <p className='error'>Este campo es requerido</p>
            )
          }
          <input type='password' placeholder='Password' className='inputClass' {...register("password", { required: true })}></input>
          {
            errors.password && (
              <p className='error'>Este campo es requerido</p>
            )
          }
          <a href='/olvido-contrasena' className='linkClass'>¿Olvidaste tu contraseña?</a>
          <button className='formButton'>INICIAR SESIÓN</button>
        </form>
      )
    } else if (formulario == "register") {
      return (
        <form className='formClass' onSubmit={handleSubmit(async (values) => {
          signup(values)
        })}>
          <div>{
            AuthErrors.map((error, i) => (
              <p key={i}>
                {error}
              </p>
            ))
          }</div>
          <h3 className='title'>Registrar</h3>
          <div className="group">
            <div className='subgroup'>
              <input type='text' placeholder='Nombre' className='inputClass' {...register("name", { required: true })}></input>
              {
                errors.name && (
                  <p className='error'>Este campo es requerido</p>
                )
              }
            </div>
            <div className='subgroup'>
              <input type='text' placeholder='Apellido' className='inputClass' {...register("last_name", { required: true })}></input>
              {
                errors.last_name && (
                  <p className='error'>Este campo es requerido</p>
                )
              }
            </div>
          </div>
          <input type='number' placeholder='Numero de telefono' className='inputClass' {...register("phone", { required: true })}></input>
          {
            errors.phone && (
              <p className='error'>Este campo es requerido</p>
            )
          }
          <input type='email' placeholder='Email' className='inputClass' {...register("email", { required: true })}></input>
          {
            errors.email && (
              <p className='error'>Este campo es requerido</p>
            )
          }
          <input type='password' placeholder='Password' className='inputClass' {...register("password", { required: true })}></input>
          {
            errors.password && (
              <p className='error'>Este campo es requerido</p>
            )
          }
          <label>Direccion de residencia</label>
          <div className="group">
            <div className="subgroup">
              <input type='text' placeholder='Calle' className='inputClass' {...register("street", { required: true })}></input>
              {
                errors.street && (
                  <p className='error'>Este campo es requerido</p>
                )
              }
            </div>
            <div className="subgroup">
              <input type='number' placeholder='Codigo postal' className='inputClass' {...register("postal_code", { required: true })}></input>
              {
                errors.postal_code && (
                  <p className='error'>Este campo es requerido</p>
                )
              }
            </div>
          </div>
          <div className="group">
            <div className="subgroup">
              <label>Departamento</label>
              {departamentos.length > 0 ?
                (
                  <select {...register("state", { required: true })} value={departamento} onChange={(e) => handleDepartamentoChange(e.target.value)}>
                    {departamentos.map((departamento, index) => (
                      <option key={index}>{departamento}</option>
                    ))}
                  </select>
                ) : (
                  <div>Cargando departamentos...</div>
                )}
                              {
                errors.state && (
                  <p className='error'>Este campo es requerido</p>
                )
              }
            </div>
            <div className="subgroup">
              <label>Municipio</label>
              {municipios.length > 0 ?
                (
                  <select {...register("city", { required: true })}>
                    {municipios.map((municipio, index) => (
                      <option key={index}>{municipio}</option>
                    ))}
                  </select>

                ) : (
                  <div>No se encontraron municipios para el departamento seleccionado</div>
                )}
              {
                errors.city && (
                  <p className='error'>Este campo es requerido</p>
                )
              }
            </div>
          </div>
          <div className='date'>
            <label>Fecha de nacimiento</label>
            <input type='date' className='inputClass' max={getMaxDate()} {...register("yearbirth", { required: true })}></input>
            {
              errors.yearbirth && (
                <p className='error'>Este campo es requerido</p>
              )
            }
          </div>
          <button className='formButton'>REGISTRARSE</button>
        </form>
      )
    }
  }

  return (
    <div className='contForm'>
      {renderizar()}
    </div>
  )
}

export default ComponentForm