import './AcountUser.css'
import React from 'react'
import SideBarUser from './../Components/SideBarUser';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuth } from '../../../contexts/AuthContext';

function AcountUser() {
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
    const { user, updateUser } = useAuth();
    const onSubmit = async (data) => {
        console.log(user);
        try {
            await updateUser(user.id, data);
            reset();
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };
    return (
        <div className='prof-cont'>
            <SideBarUser />
            <form className='contProfile formPatitas w50' encType='multipart/form-data' onSubmit={handleSubmit((data) => toast.promise(onSubmit(data), {
                loading: 'Actualizando informacion...',
                success: 'Se actualizo la información',
                error: 'Ocurrió un error al actualizar'
            }))}>
                <h2>Actualizar informacion</h2>
                <div className='group'>
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        defaultValue={user.email}
                        {...register('email', {
                            required: 'Correo electrónico es requerido',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Correo electrónico inválido'
                            }
                        })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className='group'>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        {...register('password', {
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe tener al menos 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div className='group'>
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            validate: (value) => value === getValues('password') || 'Las contraseñas no coinciden'
                        })}
                        autoComplete="new-password"
                    />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </div>
                <button type="submit" className='bg-morado2'>Cambiar Contraseña</button>
            </form>
        </div>
    )
}

export default AcountUser