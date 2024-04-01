import React from 'react'
import './ReportsUser.css'
import SideBarUser from './../Components/SideBarUser';
import { useForm } from 'react-hook-form';
import { useReport } from '../../../contexts/ReportContext';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'sonner';

function ReportsUser() {
    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();
    const { user } = useAuth();
    const { _postReport } = useReport();
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            if (data.image && data.image[0] !== undefined) {
                formData.append('image', data.image[0]);
            }
            formData.append('siteDescription', data.siteDescription);
            formData.append('description', data.description);
            formData.append('userId', user.id || user._id);
            await _postReport(formData);
            reset();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="prof-cont">
            <SideBarUser />
            <form className='w50 formPatitas reports' onSubmit={(e) => {
                e.preventDefault();
                toast.promise(handleSubmit(onSubmit), {
                    error: "Ocurrio un error al subir el reporte",
                    success: "Reporte subido",
                    loading: "Se esta subiendo el reporte"
                });
            }}>
                <h2 className='txt-morado'>Sube un reporte</h2>
                <p>¿Ves una mascota en situacion de calle?, reportala con nosotros. Tal vez podamos asistir a su rescate.</p>
                <div className='group'>
                    <label>Description del reporte</label>
                    <textarea type="text" {...register("description")} />
                    {errors.description && <span>Es necesario rellenar este campo</span>}
                </div>
                <div className='group'>
                    <label>Describe donde esta ubicado</label>
                    <textarea type="text" {...register("siteDescription")} />
                    {errors.description && <span>Es necesario rellenar este campo</span>}
                </div>
                <div className='group'>
                    <label>Sube una imagen</label>
                    <input type="file" {...register("image")} />
                </div>
                <button className='bg-morado2' type='submit'>Subir reporte</button>
            </form>
        </div>
    )
}

export default ReportsUser