import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

import './Profile.css'

function ProfilePage() {
  const { user } = useAuth();
  const { getProfile, updateUser } = useUser();
  const [photoLoad, setPhoto] = useState(null);
  const [res, setRes] = useState({});

  const { register, handleSubmit, formState: {
    errors
  } } = useForm();

  useEffect(() => {
    async function loadPerfil() {
      setRes(await getProfile(user));
    }
    loadPerfil();
  }, [user, getProfile]);
  return (
    <form className='contProfile' encType='multipart/form-data' onSubmit={handleSubmit(async (data) => {
      console.log(data)
      const formData = new FormData();
      formData.append("image", data.image[0]);

      updateUser(user.id, formData)
    })}>
      <h2>Editar perfil</h2>
      <div className="banner">
        <img src="./Fondo.jpg" alt="" />
      </div>
      <div className='changeProfile'>
        <img src={res.photo == null ? './perfil.png' : res.photo.secure_url} />
        <div className='contBot'>
          <div className='contUser'>
            <p className='name'>{res.name} {res.last_name}</p>
            <p className='email'>{res.email}</p>
          </div>
          <input type="file" name='image' {...register("image")} />
        </div>
      </div>
      <div className="changeProfile cont2">
        <p className='text'>Celular <input type="text" className='inputChange' placeholder='+57 3046541435' /></p>
        <p className='text'>Calle <input type="text" className='inputChange' placeholder='Calle 102B' /></p>
        <p className='text'>Municipio <input type="text" className='inputChange' placeholder='Medellin' /></p>
        <p className='text'>Departamento <input type="text" className='inputChange' placeholder='Antioquia' /></p>
        <button className='bInformacion'>GUARDAR CAMBIOS</button>
      </div>
    </form>
  )
}

export default ProfilePage