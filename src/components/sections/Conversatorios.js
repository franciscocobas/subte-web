import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import '../../styles/Conversatorios.scss';
import suffleArray, { verificaciones } from '../utils/utilities';
import { sendConvesatoriosInscripcion } from '../../api/_api';

const formCaptchas = suffleArray(verificaciones);
const loadingText = 'No cierre el navegador se está enviando la inscripción';

const Conversatorios = () => {
  const [formOpened, setFormOpened] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [selectedFormCaptcha, setSelectedFormCaptcha] = useState();
  const [showSpinner, setShowSpinner] = useState(false);
  const [formMessage, setFormMessage] = useState({
    type: '',
    message: '',
  });

  const spinnerTextRef = useRef(loadingText);

  const inscribirse = async (data, e) => {
    let interval = setSendingIntervalEvent();
    setShowSpinner(true);
    const response = await sendConvesatoriosInscripcion({
      nombre: data.nombre,
      organizacion: data.organizacion,
      mail: data.mail,
      pregunta: data.pregunta,
      requestType: 'registroConversatorio',
    });
    if (response && response.status === 'ok') {
      setFormMessage({
        type: 'success',
        message: 'Inscripción enviada correctamente',
      });
      e.target.reset();
    } else {
      console.log(response);
      setFormMessage({
        type: 'error',
        message:
          'Hubo un error al enviar la inscripción, trate de nuevo o escriba un mail a hola@subte.uy',
      });
    }
    clearInterval(interval);
    setShowSpinner(false);
  };

  const setSendingIntervalEvent = () => {
    return setInterval(() => {
      let text = spinnerTextRef.current;
      spinnerTextRef.current =
        spinnerTextRef.current === `${loadingText}...`
          ? loadingText
          : `${text}.`;
    }, 300);
  };

  useEffect(() => {
    setSelectedFormCaptcha(formCaptchas[0]);
  }, []);

  return (
    <div className="conversatorios-container">
      <div className="header-conversatorios">
        <img
          src="https://res.cloudinary.com/subteuy/image/upload/v1610825690/subte.uy/Conversatorios/BannersWeb_conversatorios_ya8gln.jpg"
          alt="Cabezal de la sección Conversatorios"
        />
      </div>
      <div className="container-fluid container-info">
        <div className="row justify-content-center">
          <div className="col-xl-11">
            <div className="row mb-5">
              <div className="col-12 col-md-6 order-2 order-md-1">
                <h2>¿Qué son?</h2>
                <p>
                  Los Conversatorios Subterráneos son espacios donde nos
                  proponemos reflexionar colectivamente sobre los principales
                  problemas de la comunicación en las cooperativas,
                  organizaciones sociales, culturales y políticas.{' '}
                </p>
                <p>
                  Mediante un diálogo horizontal que aporte diferentes
                  perspectivas esbozaremos cuáles son los principales desafíos,
                  qué estrategias debemos desandar y cuáles producir. Teniendo
                  en cuenta que al poner en tensión estas cuestiones provocamos
                  una revisión interna que es de suma importancia para cualquier
                  organización colectiva.{' '}
                </p>
                <p>
                  Cada conversatorio será un encuentro de dos horas donde
                  referentes de diferentes organizaciones expondrán un pequeño
                  diagnóstico como insumo disparador para producir en conjunto
                  consensos y disensos en torno a las problemáticas comunes y
                  particulares de cada organización.{' '}
                </p>
                <p className="last-p">
                  Entendemos que la comunicación es una herramienta clave en los
                  procesos colectivos, y es sumamente potente el poder
                  cuestionar los lenguajes y dispositivos hegemónicos para
                  construir otros más cercanos y propios de las organizaciones.
                </p>
              </div>
              <div className="col-12 col-md-6 order-1 order-md-2">
                <video
                  className="video-conversatorios"
                  autoPlay
                  loop
                  controls
                  muted
                >
                  <source
                    src="https://res.cloudinary.com/subteuy/video/upload/v1610826241/subte.uy/Conversatorios/SPOTCS_C4_baja_u82811.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversatorios;
