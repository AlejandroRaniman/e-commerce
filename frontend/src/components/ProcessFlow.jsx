// src/components/ProcessFlow.jsx
import React from 'react';
import '../styles/ProcessFlow.css';

const steps = [
  {
    number: '1',
    title: 'Comprar',
    description: 'Elija sus favoritos de nuestra gama de alta calidad y agréguelos a su carrito de compras.',
  },
  {
    number: '2',
    title: 'Pagar en línea',
    description: 'Complete la información del pedido y pague usando WebPay lo cual es muy simple.',
  },
  {
    number: '3',
    title: 'Entrega rápida',
    description: 'Una vez confirmado el pedido, enviaremos el artículo dentro de los 3 días. Si tienes alguna pregunta, puedes enviarnos un correo electrónico o contacto al Whatsapp.',
  },
];

const ProcessFlow = () => {
  return (
    <div className="process-flow-container">
      <h2>Proceso Operativo</h2>
      <p className="subtext">Siempre brindamos la mejor experiencia de compra.</p>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {index !== steps.length - 1 && <div className="step-divider"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow;
