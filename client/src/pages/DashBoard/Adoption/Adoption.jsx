import React, { useEffect, useState } from 'react'
import SideBarAdmin from './../SideBarAdmin/SideBarAdmin';
import './Adoption.css';
import { useAuth } from '../../../contexts/AuthContext';
import { useAdoption } from '../../../contexts/AdoptionContext';
import Tabla from './../Components/Tabla';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardQuestion, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditAdoption from './Components/EditAdoption';
import DeleteAdoption from './Components/DeleteAdoption';
import DetailAdoption from './Components/DetailAdoption';

function Adoption() {

    const { users } = useAuth();
    const { _getAdoptions, adoptions } = useAdoption()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toggleDelete, setToggleDelete] = useState(null);
    const [toggleModify, setToggleModify] = useState(null);
    const [adoptionSelect, setAdoption] = useState(null);
    const [interviewSelect, setInterview] = useState(null);
    const [userSelect, setUser] = useState(null);
    const [toggleDetail, setToggleDetail] = useState(null);
    const [petSelect, setPet] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await _getAdoptions();
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
    }, []);
    const toggleDeleteModal = (_id) => {
        setToggleDelete(_id);
    }

    const toggleModifyModal = (adoption) => {
        setAdoption(adoption);
        setToggleModify(true);
    }
    const toggleDetailModal = (adoption, user, animalId) => {
        setInterview(adoption);
        setUser(user);
        setPet(animalId);
        setToggleDetail(true);
    }
    const options = [{ id: 'animal_name', name: 'Mascota' }];
    return (
        <div className='adop-container'>
            <SideBarAdmin />
            {loading ? (
                <h1>Cargando adopciones...</h1>
            ) : error ? (
                <h1>Error al cargar los usuarios: {error.message}</h1>
            ) : (
                <Tabla options={options} list={adoptions} toggleDeleteModal={toggleDeleteModal} toggleModifyModal={toggleModifyModal} isButtonNew={false}>
                    {(results) => (
                        <>
                            <thead className='bg-morado2 txt-white'>
                                <tr>
                                    <th colSpan='2'>Mascota</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='container-body_table'>
                                {results.map(adoption => (
                                    <tr key={adoption._id}>
                                        <td><img src={adoption.animal_multimedia[0].secure_url} alt="" /></td>
                                        <td>{adoption.animal_name}</td>
                                        <td>{adoption.user_name}</td>
                                        <td>{adoption.user_email}</td>
                                        <td>{adoption.user_phone}</td>
                                        <td>{adoption.date}</td>
                                        <td>{adoption.status}</td>
                                        <td>
                                            <div className='tb-actions'>
                                                <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer txt-morado' onClick={() => toggleModifyModal([adoption._id, adoption.status])} />
                                                <FontAwesomeIcon icon={faTrash} className='cursor-pointer txt-rosado' onClick={() => toggleDeleteModal(adoption._id)} />
                                                <FontAwesomeIcon icon={faClipboardQuestion} onClick={() => toggleDetailModal(adoption._id, adoption.user, adoption.animalId)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    )}
                </Tabla>
            )}
            <EditAdoption setToggleModify={setToggleModify} toggleModify={toggleModify} adoptionSelect={adoptionSelect} setAdoption={setAdoption} />
            <DeleteAdoption toggleDelete={toggleDelete} setToggleDelete={setToggleDelete} />
            <DetailAdoption setToggleDetail={setToggleDetail} toggleDetail={toggleDetail} interviewSelect={interviewSelect} setInterview={setInterview} userSelect={userSelect} setUser={setUser} setPet={setPet} petSelect={petSelect} />
        </div>
    )
}

export default Adoption