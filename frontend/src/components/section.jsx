import React from 'react';
import '../styles/Section.css'; // Importa los estilos específicos para esta sección

const Section = () => {
  return (
    <section className="info-section">
      <div className="info-container">
        <div className="info-box">
          <div className="info-icon">
            <img src="/assets/store-icon.png" alt="Tienda Online" />
          </div>
          <div className="info-text">
            <h4>Tienda Online</h4>
            <p>Compra a la hora que quieras 24/7.</p>
          </div>
        </div>
        <div className="info-box">
          <div className="info-icon">
            <img src="/assets/savings-icon.png" alt="Ahorro" />
          </div>
          <div className="info-text">
            <h4>Ahorro</h4>
            <p>Productos de calidad a precio de fábrica.</p>
          </div>
        </div>
      </div>
      <div className="info-container">
        <div className="info-box">
          <div className="info-icon">
            <img src="/assets/shipping-icon.png" alt="Envíos" />
          </div>
          <div className="info-text">
            <h4>Envíos a todo Chile</h4>
            <p>Salida de Bodega de 2 a 3 días hábiles.</p>
          </div>
        </div>
        <div className="info-box">
          <div className="info-icon">
            <img src="/assets/support-icon.png" alt="Soporte" />
          </div>
          <div className="info-text">
            <h4>Soporte</h4>
            <p>Lunes a Viernes 10:00 a 19:00 hrs, Sábados de 10:00 a 17:00 hrs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
