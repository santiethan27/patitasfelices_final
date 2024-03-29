import React from 'react';
import './BlogPage.css'

function BlogPage() {
  return (
    <div className="container">
      <div className="div-one">
        <div className="div-texto">
          <div className="contenido">
            <h4 className="titulo-one">RECUERDA</h4>
            <p>Si vas a adoptar un animal que sube una persona, la llamas y te contactas con ella, si ya lo hemos rescatado en la fundación debes llenar un formulario y firmar un acuerdo y esperar indicaciones para entregarte tu mascota si has sido aprobado</p>
          </div>
          <img src='./Inicio.jpg' alt='imagen de perrito sonriendo' />
        </div>
        <div className="div-texto">
          <h4 className="titulo-second">HEMOS RESCATADO MÁS DE 550 PELUDOS</h4>
          <div className="contenido-diferente">
            <p>Hemos cambiado su mundo y ellos el nuestro. Muchos han sido felizmente adoptados, otros nos han enseñado a no darnos por vencidos y son ejemplo de perseverancia y gratitud. Algunos ya no nos acompañan, pero nos queda la sensación de haberles permitido conocer la bondad humana. Y están los que habitan el refugio y que siguen esperando una oportunidad para tener una familia y llenar sus hogares de alegría y amor.
              Puede que no salvemos millones de animales de la calle que existen, pero ayudaremos a los que estén a nuestro alcance, a los que el universo nos coloque en el camino.</p>
          </div>
        </div>
        <div className="div-texto">
          <div className="contenido-doble">
            <div className="contenido">
              <h4 className="titulo-three">LO QUE HACEMOS</h4>
              <p>Hemos cambiado su mundo y ellos el nuestro. Muchos han sido felizmente adoptados, otros nos han enseñado a no darnos por vencidos y son ejemplo de perseverancia y gratitud. Algunos ya no nos acompañan, pero nos queda la sensación de haberles permitido conocer la bondad humana. Y están los que habitan el refugio y que siguen esperando una oportunidad para tener una familia y llenar sus hogares de alegría y amor.
                puede que no salvemos millones de animales de la calle que existen, pero ayudaremos a los que estén a nuestro alcance, a los que el universo nos coloque en el camino.</p>
            </div>
            <div className="contenido">
              <h4 className="titulo-four">LO QUE QUEREMOS</h4>
              <p>Promover la sensibilización colectiva fomentando la esterilización, el respeto a la vida, el NO al maltrato animal y la adopción responsable y soñamos con convertirnos en una organización líder en la protección y preservación de los animales que son víctimas del maltrato y la indiferencia.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion">
        <div className="accordion-item">
          <details>
            <summary>¿CUÁLES SON LOS BENEFICIOS DE ADOPTAR?</summary>
            <div className="accordion-content">
              <li>Enseña a niños valores como respeto a la vida, amistad y amor.</li>
              <li>Crea sentido de responsabilidad y promueve la comunicación entre padres e hijos.</li>
              <li>Disminuyen la soledad, la ansiedad, el estrés y subiendo el ánimo y la autoestima.</li>
              <li>Estimulan el contacto social y nos ayudan a estar en forma.</li>
              <li>Podrás escoger entre más de 130 perritos, él que concuerde con tu personalidad (ya seas hiperactivo, calmado o consentidor).</li>
              <li>Te entregamos un perro sano, vacunado y esterilizado.</li>
              <li>Costos que usualmente tu asumirías al comprarlo.</li>
            </div>
          </details>
        </div>
        <div className="accordion-item">
          <details>
            <summary>¿POR QUÉ ADOPTAR EN LUGAR DE COMPRAR?</summary>
            <div className="accordion-content">
              <li>El 40% de los perros en Bogotá, son callejeros.</li>
              <li>Pasan sus días a la intemperie, expuestos a todo tipo de riesgos y maltrato humano. </li>
              <li>Solos y con hambre deambulan esperando que alguien les recuerde que tienen derecho a la vida digna.</li>
              <li>Al comprar un perro o un gato en una tienda o criadero, no sabes el trato se les ha dado. </li>
              <li>Muchas hembras son puestas a reproducción toda su vida y desechadas cuando ya no pueden tener más crías. </li>
              <li>Además muchos son cruzados con parientes generando desviaciones genéticas de la raza y problemas de salud o comportamiento.</li>
              <li>¡Salvarás una vida! Llena tu alma y da ejemplo a otros de cómo aportas a la ciudad negándote a comprar perritos que promueven la sobrepoblación canina.</li>
            </div>
          </details>
        </div>
        <div className="accordion-item">
          <details>
            <summary>¿QUÉ CUIDADOS ESPECIALES SE DEBE TENER?</summary>
            <div className="accordion-content">
              <li>No sacarlo a la calle sin collar, correa, ni placa de identificación.</li>
              <li>Tener precaución al dejar puertas abiertas para evitar que el animal huya, se extravíe o sufra un accidente.</li>
              <li>Vacunarlo en el momento correspondiente (esquema de vacunación completo y/o reforzarlas anualmente).</li>
              <li>Desparasitarlo por lo menos dos veces al año.</li>
              <li>Recoger sus desechos fisiológicos, tanto en el lugar de vivienda como en espacios públicos y parques. Garantizar un hábitat limpio y libre de desechos y malos olores.</li>
              <li>Cepillarlo una vez a la semana, bañarlo cuando sea necesario y limpiar con frecuencia sus dientes.</li>
            </div>
          </details>
        </div>
        <div className="accordion-item">
          <details>
            <summary>¿CUÁNTOS ANIMALES HAN SIDO DADOS EN ADOPCIÓN?</summary>
            <div className="accordion-content">
              <p>Nos enorgullece y motiva el hecho de que, a la fecha, hemos rescatado más de 450 peludos. Sin duda, hemos cambiado el mundo de estas criaturas y ellos el nuestro. Muchos de nuestros rescatados han sido felizmente adoptados, otros nos han enseñado a no darnos por vencidos y son el vivo ejemplo de perseverancia y gratitud. Algunos ya no nos acompañan, pero nos queda la sensación de haberles permitido conocer la bondad humana, ahora son angelitos que iluminan nuestro camino y nos han llenado el espíritu de fuerza para continuar y, por último, están los que habitan el refugio y que siguen esperando allí una oportunidad para llenar hogares de alegría y amor.</p>
            </div>
          </details>
        </div>
      </div>
      <div className="image-container">
        <div className="image-pair">
          <img src="blog1.jpg" alt="Imagen 1" />
          <img src="blog2.jpg" alt="Imagen 2" />
        </div>
        <div className="image-pair">
          <img src="blog3.jpeg" alt="Imagen 3" />
          <img src="blog4.jpg" alt="Imagen 4" />
        </div>
        <div className="image-pair">
          <img src="blog5.jpg" alt="Imagen 5" />
          <img src="blog6.jpeg" alt="Imagen 6" />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

