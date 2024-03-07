import React from 'react'
import './Product.css'
import ToasterCustom from './../../../components/ToasterCustom/ToasterCustom';
import SideBarAdmin from './../SideBarAdmin/SideBarAdmin';
import { useProduct } from '../../../contexts/ProductContext';
import Tabla from './../Components/Tabla';
import EditProduct from './Components/EditProduct';
import NewProduct from './Components/NewProduct';
import { useState, useEffect } from 'react';
import DeleteProduct from './Components/DeleteProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function Product() {
    const { _getProducts, products } = useProduct();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toggleDelete, setToggleDelete] = useState(null);
    const [toggleModify, setToggleModify] = useState(null);
    const [productSelect, setProduct] = useState(null);
    const [toggleNew, setToggleNew] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await _getProducts();
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
    const toggleModifyModal = (product) => {
        setProduct(product);
        setToggleModify(true);
    }
    const options = [{ id: 'name', name: 'Nombre' }, { id: 'status', name: 'Estado' }, { id: 'category', name: 'Categoria' }];

    return (
        <div className='ad-product'>
            <SideBarAdmin />
            {loading ? (
                <h1>Cargando productos...</h1>
            ) : error ? (
                <h1>Error al cargar los productos: {error.message}</h1>
            ) : (
                <Tabla setToggleNew={setToggleNew} options={options} list={products} toggleDeleteModal={toggleDeleteModal} toggleModifyModal={toggleModifyModal}>
                    {(results) => (

                        <>
                            <thead className='bg-morado2 txt-white'>
                                <tr>
                                    <th>Img</th>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Precio</th>
                                    <th>Estado</th>
                                    <th>Stock</th>
                                    <th>Categoria</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='container-body_table'>
                                {results.map(animal => (
                                    <tr key={animal._id}>
                                        <td><img src={animal.multimedia[0].secure_url} alt="" /></td>
                                        <td>{animal.name}</td>
                                        <td>{animal.description}</td>
                                        <td>$ {animal.price}</td>
                                        <td>{animal.status}</td>
                                        <td>{animal.stock}</td>
                                        <td>{animal.category}</td>
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
            <NewProduct toggleNew={toggleNew} setToggleNew={setToggleNew} />
            <EditProduct setToggleModify={setToggleModify} toggleModify={toggleModify} productSelect={productSelect} setProduct={setProduct} />
            <DeleteProduct toggleDelete={toggleDelete} setToggleDelete={setToggleDelete} />
            <ToasterCustom />
        </div>
    )
}

export default Product