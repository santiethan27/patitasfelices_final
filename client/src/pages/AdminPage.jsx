import React from 'react'
import SetProductPage from './SetProductPage'

function AdminPage() {
    return (
        <div className='container-adminPage'>
            <div className='container-crudProductos'>
                <h2>Productos</h2>
                <SetProductPage/>
            </div>
        </div>
    )
}

export default AdminPage
