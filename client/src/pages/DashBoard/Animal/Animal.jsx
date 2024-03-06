import React from 'react'
import { useAnimal } from '../../../contexts/AnimalContext';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './Animal.css'
import ToasterCustom from '../../../components/ToasterCustom/ToasterCustom';
import Tabla from '../Components/Tabla';
import SideBarAdmin from '../SideBarAdmin/SideBarAdmin';
import NewAnimal from './Components/NewAnimal';
import EditAnimal from './Components/EditAnimal';
import DeleteAnimal from './Components/DeleteAnimal';

function Animal() {
    const { _getAnimals, animals } = useAnimal();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toggleDelete, setToggleDelete] = useState(null);
    const [toggleModify, setToggleModify] = useState(null);
    const [animalSelect, setAnimal] = useState(null);
    const [toggleNew, setToggleNew] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await _getAnimals();
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const toggleDeleteModal = (_id) => {
        setToggleDelete(_id);
    }
    const toggleModifyModal = (animal) => {
        setAnimal(animal);
        setToggleModify(true);
    }
    const options = [{ id: 'name', name: 'Nombre' }, { id: 'raza', name: 'Raza' }, { id: 'size', name: 'Tamaño' }, { id: 'status', name: 'Estado' }, { id: 'age', name: 'Edad' }, { id: 'gender', name: 'Sexo' }, { id: 'color', name: 'Color' }];
    return (
        <div className='ad-product'>
            <SideBarAdmin />
            {loading ? (
                <h1>Cargando animales...</h1>
            ) : error ? (
                <h1>Error al cargar los animales: {error.message}</h1>
            ) : (
                <Tabla setToggleNew={setToggleNew} options={options} list={animals} toggleDeleteModal={toggleDeleteModal} toggleModifyModal={toggleModifyModal}>
                    {(results) => (
                        <>
                            <thead className='bg-morado2 txt-white'>
                                <tr>
                                    <th>Img</th>
                                    <th>Nombre</th>
                                    <th>Raza</th>
                                    <th>Tamaño</th>
                                    <th>Estado</th>
                                    <th>Edad</th>
                                    <th>Sexo</th>
                                    <th>Color</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='container-body_table'>
                                {results.map(animal => (
                                    <tr key={animal._id}>
                                        <td><img src={animal.multimedia[0].secure_url} alt="" /></td>
                                        <td>{animal.name}</td>
                                        <td>{animal.raza}</td>
                                        <td>{animal.size}</td>
                                        <td>{animal.status}</td>
                                        <td>{animal.age}</td>
                                        <td>{animal.gender}</td>
                                        <td>{animal.color}</td>
                                        <td>
                                            <div className='tb-actions'>
                                                <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer txt-morado' onClick={() => toggleModifyModal(animal)} />
                                                <FontAwesomeIcon icon={faTrash} className='cursor-pointer txt-rosado' onClick={() => toggleDeleteModal(animal._id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>)}
                </Tabla >
            )
            }
            <NewAnimal toggleNew={toggleNew} setToggleNew={setToggleNew} />
            <EditAnimal setToggleModify={setToggleModify} toggleModify={toggleModify} animalSelect={animalSelect} setAnimal={setAnimal} />
            <DeleteAnimal toggleDelete={toggleDelete} setToggleDelete={setToggleDelete} />
            <ToasterCustom />
        </div>
    )
}

export default Animal