import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../../components/Modal/Modal';
import { useForm } from 'react-hook-form';
import "../../../styled-components/Tables.css";
import "./ListUser.css"
import "./../../../styled-components/Forms.css"
import { toast } from 'sonner';
import SideBarAdmin from './../SideBarAdmin/SideBarAdmin';
import Tabla from './../Components/Tabla';
import EditUser from './Components/EditUser';
import DeleteUser from './Components/DeleteUser';

const ListUser = () => {
    const { users, _getUsers } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toggleDelete, setToggleDelete] = useState(null);
    const [toggleModify, setToggleModify] = useState(null);
    const [userSelect, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await _getUsers();
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        if (users.length === 0) {
            fetchData();
        }
    }, [_getUsers]);

    const toggleDeleteModal = (_id) => {
        setToggleDelete(_id);
    }

    const toggleModifyModal = (user) => {
        setUser(user);
        setToggleModify(true);
    }

    const options = [{ id: 'name', name: 'Nombre' }, { id: 'email', name: 'Email' }, { id: 'phone', name: 'Telefono' }, { id: 'rol', name: 'Rol' }, { id: 'status', name: 'Estado' }, { id: 'gender', name: 'Sexo' }, { id: 'color', name: 'Color' }];
    return (
        <div className='ad-product'>
            <SideBarAdmin />
            {loading ? (
                <h1>Cargando usuarios...</h1>
            ) : error ? (
                <h1>Error al cargar los usuarios: {error.message}</h1>
            ) : (
                <Tabla options={options} list={users} toggleDeleteModal={toggleDeleteModal} toggleModifyModal={toggleModifyModal} isButtonNew={false}>
                    {(results) => (
                        <>
                            <thead className='bg-morado2 txt-white'>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='container-body_table'>
                                {results.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.rol}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <div className='tb-actions'>
                                                <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer txt-morado' onClick={() => toggleModifyModal([user._id, user.rol, user.status])} />
                                                <FontAwesomeIcon icon={faTrash} className='cursor-pointer txt-rosado' onClick={() => toggleDeleteModal(user._id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    )}
                </Tabla>
            )}
            <EditUser setToggleModify={setToggleModify} toggleModify={toggleModify} userSelect={userSelect} setUser={setUser} />
            <DeleteUser toggleDelete={toggleDelete} setToggleDelete={setToggleDelete} />
        </div>
    );
}

export default ListUser;
