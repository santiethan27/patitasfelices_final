import React, { useState } from 'react'
import './Tabla.css'
import MyListbox from './../../../components/ListBox/ListBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function Tabla({ children, setToggleNew, options, list }) {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const searcher = (e) => {
        setSearch(e.target.value)
    }
    const [search, setSearch] = useState("");
    let results = [];

    if (!search) {
        results = list;
    } else {
        results = list.filter((dato) => dato[selectedOption.id].toLowerCase().includes(search.toLocaleLowerCase()))
    }
    return (
        <div className="adtable-container">
            <div className="adds">
                <div className="pet-search">
                    <input type="text" placeholder="Buscar..." value={search} onChange={searcher} className="in-search" />
                    <MyListbox options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                </div>
                {setToggleNew && (<button onClick={() => setToggleNew(true)} className='add bg-rosa txt-white'>Agregar nuevo</button>)}
            </div>
            <table className='pf-table'>
                {children(results)}
            </table>
        </div>
    )
}

export default Tabla