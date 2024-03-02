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

const ListUser = () => {
    const { users, _getUsers, _deleteUser, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toggleDelete, setToggleDelete] = useState(null);
    const [toggleModify, setToggleModify] = useState(null);
    const [userSelect, setUser] = useState(null);

    const { register, handleSubmit, formState: {
        errors
    }, reset } = useForm();

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

    const onDelete = async (id) => {
        try {
            await _deleteUser(id);
            setToggleDelete(null);
        } catch (error) {
            console.log(error);
        }
    }

    const onModify = async (data) => {
        try {
            const res = await updateUser(userSelect[0], data);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleDeleteModal = (_id) => {
        setToggleDelete(_id);
    }

    const closedDeleteModal = () => {
        setToggleDelete(null);
    }

    const toggleModifyModal = (user) => {
        setUser(user);
        setToggleModify(true);
    }

    const closedModifyModal = () => {
        setUser(null);
        setToggleModify(null);
        reset();
    }
    return (
        <div className='us-container'>
            {loading ? (
                <h1>Cargando usuarios...</h1>
            ) : error ? (
                <h1>Error al cargar los usuarios: {error.message}</h1>
            ) : (
                <table className='pf-table'>
                    <thead className='bg-rosa txt-white'>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody className='container-body_table'>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.rol}</td>
                                <td>{user.status}</td>
                                <td>
                                    <div className='tb-actions'>
                                        <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer tb-edit' onClick={() => toggleModifyModal([user._id, user.rol, user.status])} />
                                        <FontAwesomeIcon icon={faTrash} className='cursor-pointer tb-trash' onClick={() => toggleDeleteModal(user._id)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal className="modal" show={toggleDelete !== null} title='¿Estás seguro?' close={closedDeleteModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
                <div className="buttons">
                    <button onClick={() =>
                        toast.promise(onDelete(toggleDelete), {
                            loading: 'Eliminando...',
                            success: 'Se elimino el usuario',
                            error: 'Ocurrio un error al eliminar el usuario'
                        })} className="bg-morado2">Aceptar</button>
                    <button onClick={closedDeleteModal} className="bg-morado2">Cancelar</button>
                </div>
            </Modal>
            <Modal className="modal" show={toggleModify !== null} title='Modificar Rol' close={closedModifyModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
                <form className='formPatitas' onSubmit={handleSubmit((data) => toast.promise(onModify(data), {
                    loading: 'Actualizando...',
                    success: 'Se actualizo el usuario',
                    error: 'Ocurrio un error al actualizar el usuario'
                }))}>
                    <div className="group">
                        <label>Nuevo Rol</label>

                        <select {...register("rol", { required: true })} defaultValue={userSelect && userSelect[1]}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="group">
                        <label>Nuevo Estado</label>
                        <select {...register("status", { required: true })} defaultValue={userSelect && userSelect[2]}>
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                    </div>
                    <div className="buttons">
                        <button type="submit" className="bg-morado2">Guardar</button>
                        <button onClick={closedModifyModal} className="bg-morado2">Cancelar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ListUser;
