import React, { useEffect, useState } from 'react'
import SideBarAdmin from './../SideBarAdmin/SideBarAdmin';
import './ReportPage.css'
import Tabla from './../Components/Tabla';
import { useReport } from '../../../contexts/ReportContext';
import Modal from './../../../components/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

function ReportPage() {
    const { reports, _getReports, _deleteReport } = useReport();
    const [image, setImage] = useState(null);
    const [toggleImage, setToggleImage] = useState(null);
    const [toggleDelete, setToggleDelete] = useState(null);
    const [report, setReport] = useState(null);
    useEffect(() => {
        const loadReports = async () => {
            await _getReports();
        }
        loadReports();
    }, []);

    const handleImage = (url) => {
        setImage(url);
        setToggleImage(true);
        console.log(url);
    }

    const closedImageModal = () => {
        setImage(null);
        setToggleImage(null);
    }
    const onDelete = async () => {
        try {
            await _deleteReport(report);
            setToggleDelete(null);
        } catch (error) {
            console.log(error);
        }
    }
    const closedDeleteModal = () => {
        setToggleDelete(null);
        setReport(null);
    }
    const toggleDeleteModal = (id) => {
        setToggleDelete(true);
        setReport(id);
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
            <Modal className="modal" show={toggleImage} close={closedImageModal} showHeader={false} showOverlay={true} size={"small "} align={"center"} iClose={true}>
                <img className='image-report' src={image} alt="" />
                <div className="buttons">
                    <button onClick={() => closedImageModal()} className="bg-morado2 txt-white">ACEPTAR</button>
                </div>
            </Modal>
            <Modal className="modal" show={toggleDelete} title="¿ESTAS SEGURO?" close={closedDeleteModal} showHeader={true} showOverlay={true} size={"small"} align={"center"} iClose={true}>
                <div className="buttons">
                    <button onClick={(e) =>
                        toast.promise(onDelete(), {
                            error: "Ocurrio un error al eliminar el producto",
                            success: "Producto eliminado",
                            loading: "Se esta eliminando el producto"
                        })
                    } className="bg-morado2 txt-white">ACEPTAR</button>
                    <button onClick={() => closedDeleteModal()} className="bg-morado2 txt-white">CANCELAR</button>
                </div>
            </Modal>
        </div>
    )
}

export default ReportPage