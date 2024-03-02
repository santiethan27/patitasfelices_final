import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import useLocationData from '../../utils/hooks/useLocationData';
import './Profile.css';
import '../../styled-components/Forms.css'
import { toast } from 'sonner';
import SideBar from './../../components/SideBar/SideBar';
import { NavLink } from 'react-router-dom';

function ProfilePage() {
  const { user, getProfile, updateUser } = useAuth();
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);


  const { register, handleSubmit, setValue, watch, resetField, reset } = useForm();

  useEffect(() => {
    async function loadProfile() {
      try {
        const userLoad = await getProfile(user);
        setRes(userLoad);
        if (userLoad.address?.state) {
          setValue("state", userLoad.address.state);
        }
        if (userLoad.address?.city) {
          setValue("city", userLoad.address.city);
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      }
    }
    loadProfile();
  }, [user, getProfile, setValue]);

  const { municipios, departamentos, departamento, municipio, handleDepartamentoChange } = useLocationData(watch("state"));
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();


    if (data.image && data.image[0] !== undefined) {
      formData.append('image', data.image[0]);
    }

    formData.append('phone', data.phone);
    formData.append('street', data.street);
    formData.append('postal_code', data.postal_code);
    formData.append('state', data.state);
    formData.append('city', data.city);

    try {
      await updateUser(res._id, formData);
      const updatedProfile = await getProfile(user);
      setRes(updatedProfile);
      setLoading(false);
      reset();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='prof-cont'>
      <SideBar>
        <ul>
          <li><NavLink to={'/perfil'}>Perfil</NavLink></li>
          <li><NavLink to={'/cuenta'}>Cuenta</NavLink></li>
          <li><NavLink to={'/cuenta'}>Entrevistas</NavLink></li>
          <li><NavLink to={'/cuenta'}>Mis reportes</NavLink></li>
        </ul>
      </SideBar>
      <form className='contProfile formPatitas w80' encType='multipart/form-data' onSubmit={handleSubmit((data) => toast.promise(onSubmit(data), {
        loading: 'Actualizando informacion...',
        success: 'Se actualizo la información',
        error: 'Ocurrió un error al agregar el producto'
      }))}>
        <h2>Editar perfil</h2>
        <div className="banner">
          <img src="./Fondo.jpg" alt="" />
        </div>
        <div className='changeProfile'>
          <img src={res && res.photo && res.photo.secure_url ? res.photo.secure_url : './perfil.png'} />
          <div className='contBot'>
            <div className='contUser'>
              <p className='name'>{res.name} {res.last_name}</p>
              <p className='email'>{res.email}</p>
            </div>
            <input type="file" name='image' {...register("image")} />
          </div>
        </div>
        <div className="groups">
          <div className="group">
            <label className='text'>Celular</label>
            <input type="number" {...register("phone")} placeholder={`+57 ${res.phone}`} />
          </div>
          <div className="group">
            <label className='text'>Calle</label>
            <input type="text" {...register("street")} className='inputChange' placeholder={res.address ? res.address.street : ''} />
          </div>
          <div className="group">
            <label className='text txt-morado'>Codigo postal</label>
            <input type="number" {...register("postal_code")} className='inputChange' placeholder={res.address ? res.address.postal_code : ''} />
          </div>
        </div>
        <div className="groups">
          <div className='group'>
            <label>Departamento</label>
            {departamentos.length > 0 ?
              (

                <select {...register("state", { required: true })} value={departamento} onChange={(e) => {
                  handleDepartamentoChange(e.target.value);
                  setValue("city", municipio);
                }

                }>
                  {departamentos.map((departamento, index) => (
                    <option key={index}>{departamento}</option>
                  ))}
                </select>
              ) : (
                <div>Cargando departamentos...</div>
              )}</div>
          <div className='group'>
            <label>Municipio</label>
            {municipios.length > 0 ?
              (
                <select {...register("city", { required: true })} value={watch("city")} onChange={(e) => setValue("city", e.target.value)}>
                  {municipios.map((municipio, index) => (
                    <option option key={index} > {municipio}</option>
                  ))}
                </select>

              ) : (
                <div>No se encontraron municipios para el departamento seleccionado</div>
              )}</div>
        </div>
        <button className='bg-morado2'>GUARDAR CAMBIOS</button>
        {loading && <p>Actualizando informacion...</p>}
      </form >
    </div>
  )
}

export default ProfilePage