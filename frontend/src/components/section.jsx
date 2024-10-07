import React from 'react';
import '../styles/Section.css';

const InfoBox = ({ icon, title, description }) => (
  <div className="info-box">
    <div className="info-content">
      <div className="info-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="info-text">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const Section = () => {
  const infoBoxes = [
    {
      icon: "bi-shop",
      title: "Tienda Online",
      description: "Compra a la hora que quieras 24/7."
    },
    {
      icon: "bi-piggy-bank",
      title: "Ahorro",
      description: "Productos de calidad a precio de fábrica."
    },
    {
      icon: "bi-truck",
      title: "Envíos a todo Chile",
      description: "Salida de Bodega de 2 a 3 días hábiles."
    },
    {
      icon: "bi-headset",
      title: "Soporte",
      description: "Lunes a Viernes 10:00 a 19:00 hrs, Sábados de 10:00 a 17:00 hrs."
    }
  ];

  return (
    <section className="info-section">
      <div className="info-container">
        {infoBoxes.map((box, index) => (
          <InfoBox key={index} {...box} />
        ))}
      </div>
    </section>
  );
};

export default Section;