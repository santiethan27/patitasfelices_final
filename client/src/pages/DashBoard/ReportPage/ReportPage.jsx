import React, { useEffect } from 'react'
import SideBarAdmin from './../SideBarAdmin/SideBarAdmin';
import './ReportPage.css'
import Tabla from './../Components/Tabla';
import { useReport } from '../../../contexts/ReportContext';

function ReportPage() {
    const { reports, _getReports } = useReport();
    useEffect(() => {
        const loadReports = async () => {
            await _getReports();
        }
        loadReports();
    }, [])
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
                            </tr>
                        </thead>
                        <tbody className='container-body_table'>
                            {reports.map(report => (
                                <tr key={report._id}>
                                    {console.log(report)}
                                    <td><img src={report.image.secure_url} alt="" /></td>
                                    <td>{report.description}</td>
                                    <td>{report.siteDescription}</td>
                                </tr>
                            ))}
                        </tbody>
                    </>)}
            </Tabla >
        </div>
    )
}

export default ReportPage