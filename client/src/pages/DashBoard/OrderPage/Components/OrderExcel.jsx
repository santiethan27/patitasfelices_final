import React, { useRef } from 'react';
import { DownloadTableExcel, useDownloadExcel } from 'react-export-table-to-excel';
import '../OrderPage.css'

const OrderExcel = ({ orders }) => {
    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })
    return (
        <div>

            <button onClick={onDownload}>Exportar a Excel</button>
            <table ref={tableRef} className='tabla-disable'>
                <thead>
                    <tr>
                        <th colSpan="10" style={{ textAlign: 'center', fontSize: '40px' }}>Lista de Órdenes</th>
                    </tr>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Nombre de usuario</th>
                        <th>Correo electrónico</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.product_name}</td>
                            <td>{order.product_price}</td>
                            <td>{order.user_name}</td>
                            <td>{order.user_email}</td>
                            <td>{order.user_phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderExcel;
