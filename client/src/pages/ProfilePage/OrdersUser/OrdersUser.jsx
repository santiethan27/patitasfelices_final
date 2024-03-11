import React, { useEffect, useState } from 'react'
import { useOrder } from './../../../contexts/OrderContext';
import Modal from './../../../components/Modal/Modal';
import SideBarUser from './../Components/SideBarUser';
import Tabla from './../../DashBoard/Components/Tabla';
import { useAuth } from '../../../contexts/AuthContext';

function OrderUser() {
    const { fetchOrdersById } = useOrder();
    const [image, setImage] = useState(null);
    const [toggleImage, setToggleImage] = useState(null);
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();
    const closedImageModal = () => {
        setImage(null);
        setToggleImage(null);
    }
    const handleImage = (url) => {
        setImage(url);
        setToggleImage(true);
        console.log(url);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOrdersById(user.id || user._id);
                setOrders(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [])

    return (
        <div className="prof-cont">
            <SideBarUser />
            <Tabla list={orders} >
                {(results) => (
                    <>
                        <thead className='bg-morado2 txt-white'>
                            <tr>
                                <th>Producto</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Nombre usuario</th>
                                <th>Correo</th>
                                <th>Telefono</th>
                            </tr>
                        </thead>
                        <tbody className='container-body_table'>
                            {orders.map(report => (
                                <tr key={report._id}>
                                    <td><img className='image-table' onClick={() => report.image && report.image.secure_url && handleImage(report.image.secure_url)}
                                        src={(report.image && report.image.secure_url) || (report.product_primary && report.product_primary.secure_url) || '/icons/rota.svg'}
                                        alt={report.image || report.product_primary ? '' : 'No Found'} /></td>
                                    <td>{report.product_name}</td>
                                    <td>{report.product_price}</td>
                                    <td>{report.user_name}</td>
                                    <td>{report.user_email}</td>
                                    <td>{report.user_phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </>)}
            </Tabla >
            <Modal className="modal" show={toggleImage} close={closedImageModal} title='Previsualización de pedido' showHeader={true} showOverlay={true} size={"small "} align={"center"} iClose={true}>
                <img className='image-report' src={image} alt="" />
                <div className="buttons">
                    <button onClick={() => closedImageModal()} className="bg-morado2 txt-white">ACEPTAR</button>
                </div>
            </Modal>
        </div>
    )
}

export default OrderUser