import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldDog, faPaw, faHouse } from '@fortawesome/free-solid-svg-icons';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { usePayment } from '../../contexts/PaymentContext';
import axios from 'axios';
import './Donations.css'

function Donations() {
    initMercadoPago('TEST-5debe8b1-62f0-48af-96d8-a790fefd85cb', {
        locale: "es-CO",
    });
    const [preferenceId, setPreferenceId] = useState();
    const { _postPayment } = usePayment();

    const createPreference = async (amount) => {
        try {
            const res = await _postPayment(amount);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
    const habdleDonation = async (amount) => {
        const id = await createPreference(amount);
        if (id) {
            setPreferenceId(id);
            console.log(id);
        }
    }

    return (
        <div className='dt-container'>
            <header className='dt-header bg-morado2'>
                <h1>¿Quieres ayudar a nuestros peluditos?</h1>
            </header>
            <div className="dt-donations">
                <div className="dt-donation">
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(2000)}>
                        <p>Donar</p>
                        <p>$2.000COP</p>
                    </button>

                    <div className="dt-detail bg-morado2">
                        <p>Donar</p>
                        <p>$10.000 COP</p>
                    </div>
                    <div className="dt-detail bg-morado2">
                        <p>Donar</p>
                        <p>$20.000 COP</p>
                    </div>
                    <div className="dt-detail bg-morado2">
                        <p>Donar</p>
                        <p>$50.000 COP</p>
                    </div>
                    <div className="dt-detail bg-morado2">
                        <p>Donar</p>
                        <p>$80.000 COP</p>
                    </div>
                    <div className="dt-detail bg-morado2">
                        <p>Donar</p>
                        <p>$100.000 COP</p>
                    </div>
                    <div className="dt-detail bg-morado2">
                        <p>Donar</p>
                        <p>$50.000 COP</p>
                    </div>
                    <div className="dt-detail bg-morado2">
                        <p>Donar</p>
                        <p>$80.000 COP</p>
                    </div>
                    <div className="dt-detail bg-morado2">
                        <p>Donar</p>
                        <p>$100.000 COP</p>
                    </div>
                </div>
                {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                <div className="dt-img-donation">
                    <img src="./images/donation.gif" alt="" />
                </div>
            </div>
            <div className="dt-razones">
                <div className="dt-c-razon">
                    <div className="dt-razon txt-black">
                        <FontAwesomeIcon className='icon txt-rosado' icon={faShieldDog} /><p>Ayudas a comprar alimentos para las mascotas</p>
                    </div>
                    <div className="dt-razon txt-black">
                        <FontAwesomeIcon className='icon txt-rosado' icon={faPaw} /> <p>Ayudas a darle atencion medica a las mascotas</p>
                    </div>
                    <div className="dt-razon txt-black">
                        <FontAwesomeIcon className='icon txt-rosado' icon={faHouse} /><p>Ayudas a que podamos ayudar mas animales</p>
                    </div>
                </div>
                <div className="dt-img-razones">
                    <img src="./images/cat.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Donations