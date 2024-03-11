import React, { useEffect, useState } from 'react'
import SideBarAdmin from './../SideBarAdmin/SideBarAdmin';
import './OrderPage.css'
import Tabla from './../Components/Tabla';
import Modal from './../../../components/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { useOrder } from './../../../contexts/OrderContext';

function OrderPage() {
    const { orders, fetchOrders, deleteOrderById } = useOrder();
    const [image, setImage] = useState(null);
    const [toggleImage, setToggleImage] = useState(null);
    const [toggleDelete, setToggleDelete] = useState(null);
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const loadOrders = async () => {
            await fetchOrders();
        }
        loadReports();
    }, []);

    const handleImage = (url) => {
        setImage(url);
        setToggleImage(true);
        console.log(url);
    }
    return (
        <div className='report-page'>
            <SideBarAdmin />
            <Tabla list={reports} >
                {(results) => (
                    <>
                        <thead className='bg-morado2 txt-white'>
                            <tr>
                                <th>Img</th>
                                <th>Descripcion</th>
                                <th>Lugar</th>
                                <th>Nombre usuario</th>
                                <th>Correo</th>
                                <th>Telefono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='container-body_table'>
                            {reports.map(report => (
                                <tr key={report._id}>
                                    <td><img className='image-table' onClick={() => handleImage(report.image.secure_url)} src={report.image.secure_url} alt="" /></td>
                                    <td>{report.description}</td>
                                    <td>{report.siteDescription}</td>
                                    <td>{report.user_name}</td>
                                    <td>{report.user_email}</td>
                                    <td>{report.user_phone}</td>
                                    <td>
                                        <div className='tb-actions'>
                                            <FontAwesomeIcon icon={faTrash} className='cursor-pointer txt-rosado' onClick={() => toggleDeleteModal(report._id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>)}
            </Tabla >
        </div>
    )
}

export default OrderPage