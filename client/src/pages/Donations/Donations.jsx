import React from 'react'
import './Donations.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faShieldDog, faPaw, faTruckMedical, faHouse } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

function Donations() {
    initMercadoPago('YOUR_PUBLIC_KEY');

    const payDonation = async (price) => {
        const formData =
        {
            "merchantId": 508029,
            "referenceCode": "112",
            "accountId": "512321",
            "description": "Donacion patitas felices",
            "amount": "price",
            "tax": 0.0,
            "taxReturnBase": 0.0,
            "currency": "COP",
            "shipmentValue": 0.00,
            "signature": "8bbe9122975951663c70ec588e1ef76e"
        }
        try {
            await axios.post('https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/', formData);
        } catch (error) {
            console.log(error)
        }
    }
    const handlePayment = async () => {
        try {
            const signature = '8bbe9122975951663c70ec588e1ef76e'
            const formData = new FormData()
            formData.append('merchantId', '508029');
            formData.append('accountId', '512321');
            formData.append('description', 'Donacion patitas felices');
            formData.append('referenceCode', '112');
            formData.append('amount', '20000');
            formData.append('tax', '0.00');
            formData.append('taxReturnBase', '0.00');
            formData.append('shipmentValue', '0.00');
            formData.append('currency', 'COP');
            formData.append('lng', 'es');
            formData.append('displayBuyerComments', 'true');
            formData.append('buyerCommentsLabel', 'es:¿Quieres escribir un comentario para la fundación?|en:Want to add a comment for the foundation?');
            formData.append('sourceUrl', window.location.href);
            formData.append('buttonType', 'SIMPLE');
            formData.append('signature', signature
            );

            const form = document.createElement('form');
            form.setAttribute('method', 'POST');
            form.setAttribute('action', 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/');
            form.setAttribute('acceptCharset', 'UTF-8');

            for (const [key, value] of formData) {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', value);
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();

        } catch (error) {
            console.error('Error al iniciar el proceso de pago:', error);
        }
    };

    return (
        <div className='dt-container'>
            <header className='dt-header bg-morado2'>
                <h1>¿Quieres ayudar a nuestros peluditos?</h1>
            </header>
            <div className="dt-donations">
                <div className="dt-donation">
                    <Link className="dt-detail bg-morado2" onClick={handlePayment}>
                        <p>Donar</p>
                        <p>$2.000 COP</p>
                    </Link>
                    <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} customization={{ texts: { valueProp: 'smart_option' } }} />

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