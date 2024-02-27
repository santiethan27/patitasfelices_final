import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../../components/Modal/Modal';
import { useForm } from 'react-hook-form';

const ListUser = () => {
    const { users, _getUsers, _deleteUser, updateUsers } = useAuth();
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
        setLoading(true);
        try {
            const res = await updateUsers(userSelect[0], data);
            setToggleModify(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
        <div>
            {loading ? (
                <h1>Cargando usuarios...</h1>
            ) : error ? (
                <h1>Error al cargar los usuarios: {error.message}</h1>
            ) : (
                <table className='container-table'>
                    <thead>
                        <tr className='container-tittles'>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='container-body_table'>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.rol}</td>
                                <td>{user.status}</td>
                                <td className='action_button'>
                                    <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' onClick={() => toggleModifyModal([user._id, user.rol, user.status])} />
                                    <FontAwesomeIcon icon={faTrash} className='cursor-pointer' onClick={() => toggleDeleteModal(user._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal className="modal" show={toggleDelete !== null} title='¿Estás seguro?' close={closedDeleteModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
                <div className="buttons">
                    <button onClick={() => onDelete(toggleDelete)} className="bg-morado2">Aceptar</button>
                    <button onClick={closedDeleteModal} className="bg-morado2">Cancelar</button>
                </div>
            </Modal>
            <Modal className="modal" show={toggleModify !== null} title='Modificar Rol' close={closedModifyModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
                <form onSubmit={handleSubmit(onModify)}>
                    <label>
                        Nuevo Rol:
                        <select {...register("rol", { required: true })} defaultValue={userSelect && userSelect[1]}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </label>
                    <label>
                        Nuevo Estado:
                        <select {...register("status", { required: true })} defaultValue={userSelect && userSelect[2]}>
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                    </label>
                    <button type="submit" className="bg-morado2">Guardar</button>
                    <button onClick={closedModifyModal} className="bg-morado2">Cancelar</button>
                </form>
            </Modal>
        </div>
    );
}

export default ListUser;
