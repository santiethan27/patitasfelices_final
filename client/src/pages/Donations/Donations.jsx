import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldDog, faPaw, faHouse } from '@fortawesome/free-solid-svg-icons';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { usePayment } from '../../contexts/PaymentContext';

import './Donations.css'

function Donations() {
    initMercadoPago('TEST-a2493766-2e31-4138-ab08-63203d0fd71b', {
        locale: "es-CO",
    });
    const [redirectUrl, setRedirectUrl] = useState();
    const { _postPayment } = usePayment();

    const createPreference = async (amount, description) => {
        try {
            const res = await _postPayment(amount, description);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const habdleDonation = async (amount, description) => {
        const { init_point } = await createPreference(amount, description);
        setRedirectUrl(init_point);
    }
    if (redirectUrl) {
        console.log(redirectUrl)
        window.location.href = redirectUrl;
    }
    return (
        <div className='dt-container'>
            <header className='dt-header bg-morado2'>
                <h1>¿Quieres ayudar a nuestros peluditos?</h1>
            </header>
            <div className="dt-donations">
                <div className="dt-donation">
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(2000, 'Donacion patitas felices')}>
                        <p>Donar</p>
                        <p>$2.000COP</p>
                    </button>
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(5000, 'Donacion patitas felices')}>
                        <p>Donar</p>
                        <p>$5.000 COP</p>
                    </button>
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(10000, 'Donacion patitas felices')}>
                        <p>Donar</p>
                        <p>$10.000 COP</p>
                    </button>
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(20000, 'Donacion patitas felices')}>
                        <p>Donar</p>
                        <p>$20.000 COP</p>
                    </button>
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(25000, 'Donacion patitas felices')}>
                        <p>Donar</p>
                        <p>$25.000 COP</p>
                    </button>
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(30000, 'Donacion patitas felices')}>
                        <p>Donar</p>
                        <p>$30.000 COP</p>
                    </button>
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(40000, 'Donacion patitas felices')}>
                        <p>Donar</p>
                        <p>$40.000 COP</p>
                    </button>
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(50000, 'Donacion patitas felices')}>
                        <p>Donar</p>
                        <p>$50.000 COP</p>
                    </button>
                    <button className="dt-detail bg-morado2" onClick={() => habdleDonation(100000, 'Donacion patitas felices')}>
                        <p>Donar</p>
                        <p>$100.000 COP</p>
                    </button>
                </div>
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