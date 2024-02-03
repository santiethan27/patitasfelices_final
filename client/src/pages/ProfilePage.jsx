import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import useLocationData from '../hooks/useLocationData';
import './Profile.css';

function ProfilePage() {
  const { user } = useAuth();
  const { getProfile, updateUser } = useUser();
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);


  const { register, handleSubmit, setValue, watch } = useForm();

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

    console.log(data.image[0])

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
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className='contProfile' encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
      <h2>Editar perfil</h2>
      <div className="banner">
        <img src="./Fondo.jpg" alt="" />
      </div>
      <div className='changeProfile'>
        {console.log(res)}
        <img src={res && res.photo && res.photo.secure_url ? res.photo.secure_url : './perfil.png'} />
        <div className='contBot'>
          <div className='contUser'>
            <p className='name'>{res.name} {res.last_name}</p>
            <p className='email'>{res.email}</p>
          </div>
          <input type="file" name='image' {...register("image")} />
        </div>
      </div>
      <div className="changeProfile cont2">
        <p className='text'>Celular <input type="number" {...register("phone")} className='inputChange' placeholder={`+57 ${res.phone}`} /></p>
        <p className='text'>Calle <input type="text" {...register("street")} className='inputChange' placeholder={res.address ? res.address.street : ''} /></p>
        <p className='text'>Codigo postal <input type="number" {...register("postal_code")} className='inputChange' placeholder={res.address ? res.address.postal_code : ''} /></p>
        <div className='text'>Departamento {departamentos.length > 0 ?
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
        <div className='text'>Municipio {municipios.length > 0 ?
          (
            <select {...register("city", { required: true })} value={watch("city")} onChange={(e) => setValue("city", e.target.value)}>
              {municipios.map((municipio, index) => (
                <option option key={index} > {municipio}</option>
              ))}
            </select>

          ) : (
            <div>No se encontraron municipios para el departamento seleccionado</div>
          )}</div>
        <button className='bInformacion'>GUARDAR CAMBIOS</button>
        {loading && <p>Actualizando informacion...</p>}
      </div>
    </form >
  )
}

export default ProfilePage