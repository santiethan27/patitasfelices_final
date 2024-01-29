import React from 'react';
// El import react es el principal por lo tanto tiene que ir en la primera linea
// Separar los componentes creados por nosotros la comunidad 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import "./CondicionesAdopcion.css"

// Creamos un rafc para poder exportar este componente
const CondicionesAdopcion = () => {
    return (
        <section className='container-codicionesAdopcion'>
            <div className='container-tittle'>
            <h3 className='txt-white'>Recuerda que al adoptar tienes que tener en cuenta lo siguiente:</h3>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>Obrar en concordancia a lo establecido en la ley 1774 del 6 de enero de 2016 y asumir la adopción del canino o felino, con responsabilidad y compromiso.</p>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>No abandonar al animal adoptado por ninguna razón o motivo. Ni por problemas de comportamiento, vejez o enfermedad.</p>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>Garantizarle alimento, agua, abrigo, y protección contra el clima.</p>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>Prestarle el debido cuidado en caso de enfermedad y suministrarle atención veterinaria necesaria, evitando exponerlo al dolor o crueldad.</p>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>Proporcionarle un trato humano y digno, lo cual significa no golpearlo, ni maltratarlo de ninguna forma. Será educado con paciencia y amor.</p>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>Respetar el estado de su cola, orejas y extremidades en general; no realizarle intervenciones quirúrgicas con el fin de acortar o cambiar de forma o tamaño sus extremidades.</p>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>Si por alguna razón la adopción no resulta lo esperado, devolver al animal directamente a la fundación Patitas Feloces. Por ninguna razón, se debe entregar a: centros de zoonosis, perreras, universidades de experimentación, terceros o familiares, o amigos. Tampoco podrá ser vendido o comercializado.</p>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>No aplicarle eutanasia por vejez o por problemas de comportamiento ni por algún otro problema que tenga una solución sin importar que sea costoso.</p>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>Aceptar la realización de visitas periódicas y verificaciones vía telefónica para constatar la tenencia responsable y adecuada del adoptado.</p>
            </div>
            <div className='container-condicion'>
                <FontAwesomeIcon icon={faPaw} size='2x' />
                <p className='txt-white'>En tiempo vacaciones o situaciones similares los adoptantes deben tomar medidas con el fin de evitar que el animal quede solo por periodos prolongados y quede expuesto a situaciones de hambre, frio o abandono lejos de sus propietarios.</p>
            </div>
        </section>
    )
}

export default CondicionesAdopcion
