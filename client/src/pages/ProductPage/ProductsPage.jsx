import React, { useState } from "react";
import CardProduct from "./components/CardProduct";
import "./ProductsPage.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useProduct } from "../../contexts/ProductContext";
import MyListbox from './../../components/ListBox/ListBox';

function ProductsPage() {
    const { _getProducts, products } = useProduct();
    const [search, setSearch] = useState("");
    const [type, setType] = useState("OBJETOS");

    const options = [{ id: 0, name: 'Nombre' }];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    useEffect(() => {
        const get = async () => {
            await _getProducts();
        }
        get();
    }, []);
    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const handleType = (typeIndex) => {
        if (typeIndex == 0) {
            setType("OBJETOS");
        }
        if (typeIndex == 1) {
            setType("JUGUETES");
        }
        if (typeIndex == 2) {
            setType("ROPA");
        }
    }

    let filters = products?.filter((dato) => dato.category.toLowerCase().includes(type.toLowerCase()));

    let results = []
    if (!search) {
        results = filters;
    } else {
        results = filters.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()));
    }
    return (
        <>
            <div className="pro-header">
                <div className="col bg-morado2">
                    <h1 className="txt-white">Tienda PatitasFelices</h1>
                    <div className="col-buttons txt-white">
                        <span>Camisetas</span>
                        <span>Tazas</span>
                        <span>Conjuntos</span>
                    </div>
                    <img className='col-paw' src="./images/paw3.png" alt="" />
                    <img className="col-img" src="./images/conjunto.png" alt="" />
                </div>
                <div className="pro-images">
                    <div className="cont-img bg-morado2"><img src="./images/camiza.png" alt="" /></div>
                    <div className="cont-img bg-morado2"><img src="./images/taza.png" alt="" /></div>
                </div>
            </div>
            <div className="pet-icons">
                <div className="c-pet-icon" onClick={() => handleType(0)}>
                    <div className={`pet-icon ${type == "OBJETOS" ? "bg-morado2" : "borde-morado"}`}>
                        <img src="./images/object.png" alt="" />
                    </div>
                    <p className="pet-class">{type == "OBJETOS" && <span><FontAwesomeIcon icon={faCircle} className="txt-morado" /></span>} Objetos</p>
                </div>
                <div className="c-pet-icon" onClick={() => handleType(1)}>
                    <div className={`pet-icon ${type == "JUGUETES" ? "bg-morado2" : "borde-morado"}`}>
                        <img src="./images/toy.png" alt="" />
                    </div>
                    <p className="pet-class">{type == "JUGUETES" && <span><FontAwesomeIcon icon={faCircle} className="txt-morado" /></span>} Juguetes</p>
                </div>
                <div className="c-pet-icon" onClick={() => handleType(2)}>
                    <div className={`pet-icon ${type == "ROPA" ? "bg-morado2" : "borde-morado"}`}>
                        <img src="./images/shirt.png" alt="" />
                    </div>
                    <p className="pet-class">{type == "ROPA" && <span><FontAwesomeIcon icon={faCircle} className="txt-morado" /></span>} Ropa</p>
                </div>
            </div>
            <div className="c-search">
                <div className="pet-search">
                    <input type="text" placeholder="Buscar..." value={search} onChange={searcher} className="in-search" />
                    <MyListbox options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                </div>
            </div>
            <div className="container-cards">
                {results.map((product) => (
                    <CardProduct key={product._id} product={product} />
                ))}
            </div>
        </>
    );
}

export default ProductsPage;
