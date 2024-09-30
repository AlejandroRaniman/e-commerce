// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Nosotros</h3>
          <p>
            Huamao, nos enorgullece ofrecer una experiencia de compra integral y satisfactoria en un solo lugar. Somos una Importadora que cuenta con una amplia variedad de productos para satisfacer todas tus necesidades y gustos. Desde moda y accesorios, hasta artículos para el hogar y tecnología de vanguardia, tenemos algo para cada miembro de tu familia y para cada rincón de tu vida.
          </p>
        </div>
        <div className="footer-section">
          <h3>Términos y Condiciones</h3>
          <ul>
            <li>Términos condiciones</li>
            <li>Política y privacidad</li>
            <li>Preguntas Frecuentes</li>
            <li>Envío y devoluciones</li>
            <li>Garantías</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Ayuda</h3>
          <ul>
            <li>Contacto</li>
            <li>Carro de Compra</li>
            <li>Métodos de Pago</li>
            <li>Actualizaciones y Novedades</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contactos</h3>
          <p>ayuda@huamao.cl</p>
          <p>9 1111 1111</p>
          <div className="footer-icons">
            <span>📧</span>
            <span>🔔</span>
            <span>💬</span>
          </div>
        </div>
        <div className="footer-logo">
          <img src={process.env.PUBLIC_URL + '/assets/Huamao.png'} alt="Huamao Logo" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Huamao Importadora. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
