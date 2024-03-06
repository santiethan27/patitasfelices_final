import React, { useEffect, useState } from 'react'
import { useAdoption } from '../../../../contexts/AdoptionContext';
import { useForm } from 'react-hook-form';
import Modal from '../../../../components/Modal/Modal';
import { useInterview } from '../../../../contexts/InterviewContext';
import { toast } from 'sonner';
import { useAuth } from '../../../../contexts/AuthContext';
import { useRef } from 'react';

function DetailAdoption({ setToggleDetail, toggleDetail, interviewSelect, setInterview, userSelect, setUser, petSelect, setPet }) {
    const { _putAdoption } = useAdoption();
    const { user } = useAuth();
    const { _getInterviewAdoption, _postInterview, _putInterview, _deleteInterview } = useInterview();
    const [searchInterview, setSearchInterview] = useState();
    const [changeDetect, setChangeDetect] = useState(false);
    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();

    const [action, setAction] = useState();

    const [newDate, setNewDate] = useState();

    const getInterview = async () => {
        try {
            const res = await _getInterviewAdoption(interviewSelect);
            setSearchInterview(res);
            setNewDate(res.date);
        } catch (error) {

        }
    }
    useEffect(() => {
        if (interviewSelect !== null) getInterview();

    }, [interviewSelect]);

    const onSubmit = async (date) => {
        try {
            const data = {
                date,
                userAdmin: user.id || user._id,
                idAdoption: interviewSelect,
                idUser: userSelect,
                idPet: petSelect
            }
            await _postInterview(data);
            await getInterview();
            reset();
        } catch (error) {
            console.log(error);
        }
    }
    const toggleAction = (action) => {
        setAction(action);
    }
    const inputRef = useRef(null);

    const onModify = async () => {
        try {
            const data = {
                date: inputRef.current.value
            }
            await _putInterview(searchInterview._id, data);
            setNewDate(null);
            await getInterview();
            handleChange();
        } catch (error) {
            console.log(error);
        }
    }
    const closedModifyModal = () => {
        setInterview(null);
        setToggleDetail(null);
        setUser(null);
        setNewDate(null);
        setSearchInterview(null);
        setChangeDetect(false);
        setPet(null);
        reset();
    }
    const handleChange = () => {
        setChangeDetect(changeDetect => !changeDetect);
        console.log(changeDetect);
    }
    const onDelete = async () => {
        await _deleteInterview(searchInterview._id);
        setNewDate(null);
        setSearchInterview(null);
        inputRef.current.value = '';
        await getInterview();
    }

    return (
        <Modal className="modal" show={toggleDetail} title='Detalle de la solicitud' close={closedModifyModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
            <div className="c-interview">
                {searchInterview ? <div className="interview formPatitas">
                    <div className="group">
                        <label>Entrevista - activa</label>
                        {console.log(newDate)}
                        <input type="datetime-local" defaultValue={newDate} ref={inputRef} onChange={handleChange} />
                    </div>
                    {changeDetect === false ? <div className="buttons">
                        <button className='bg-morado2 txt-white' onClick={() => toast.promise(onDelete(), {
                            loading: 'Eliminando...',
                            success: 'Se eliminó la entrevista',
                            error: 'Ocurrio un error al eliminar la entrevista'
                        })}>Eliminar</button>
                    </div> : (
                        <div className="buttons">
                            <button className='bg-morado2 txt-white' onClick={() => toast.promise(onModify(), {
                                loading: 'Actualizando...',
                                success: 'Se actualizo la entrevista de adopcion',
                                error: 'Ocurrio un error al actualizar la entrevista'
                            })}>Guardar cambios</button>
                            <button className='bg-morado2 txt-white' onClick={() => handleChange()}>Cancelar</button>
                        </div>
                    )}
                </div>
                    :
                    <form className='formPatitas' onSubmit={handleSubmit((data) => toast.promise(onSubmit(data), {
                        loading: 'Creando...',
                        success: 'Se creo la entrevista',
                        error: 'Ocurrio un error al crear la entrevista'
                    }))}>
                        <div className="group">
                            <label>No se ha encontrado ninguna entrevista, ingrese una nueva</label>
                            <input type="datetime-local" {...register("date", { required: true })} />
                            {errors.age && <span>This field is required</span>}
                        </div>
                        <button type="submit" className="bg-morado2">Crear</button>
                    </form>}
            </div>

            {/* <form className='formPatitas' onSubmit={handleSubmit((data) => toast.promise(onModify(data), {
                loading: 'Actualizando...',
                success: 'Se actualizo la solicitud de adopcion',
                error: 'Ocurrio un error al actualizar la solicitud'
            }))}>
                <div className="group">
                    <label>Nuevo Estado</label>
                    <select {...register("status", { required: true })} defaultValue={adoptionSelect && adoptionSelect[1]}>
                        <option value="ACTIVE">Activo</option>
                        <option value="CLOSE">Cerrado</option>
                    </select>
                </div>
                <div className="buttons">
                    <button type="submit" className="bg-morado2">Guardar</button>
                    <button onClick={closedModifyModal} className="bg-morado2">Cancelar</button>
                </div>
            </form> */}
        </Modal >
    )
}

export default DetailAdoption