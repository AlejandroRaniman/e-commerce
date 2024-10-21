import React, { useState } from 'react';
import '../styles/OrderAnimation.css'; // Asegúrate de crear este archivo CSS

const OrderAnimation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleOrder = () => {
    setIsProcessing(true);

    // Simula un tiempo de espera para la animación (por ejemplo, 5 segundos)
    setTimeout(() => {
      setIsProcessing(false);
      setOrderCompleted(true);
    }, 5000);
  };

  return (
    <div className="order-container">
      {!isProcessing && !orderCompleted && (
        <button onClick={handleOrder} className="order-button">Realizar Pedido</button>
      )}

      {isProcessing && (
        <div className="animation-container">
          <div className="box"></div>
          <div className="truck">
            <div className="truck-body"></div>
            <div className="truck-wheel"></div>
            <div className="truck-wheel"></div>
          </div>
        </div>
      )}

      {orderCompleted && (
        <div className="confirmation-message">
          <h2>¡Pedido realizado con éxito!</h2>
        </div>
      )}
    </div>
  );
};

export default OrderAnimation;
