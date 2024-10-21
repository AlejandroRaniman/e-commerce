import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Checkout.css';

// Componente Modal
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Usar navigate para redirigir al usuario

  // Función para abrir/cerrar el modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Simulación de procesar pago y redirigir a la animación de confirmación del pedido
  const handlePayment = () => {
    // Simula el procesamiento del pago
    setTimeout(() => {
      // Redirige a la página de confirmación de pedido
      navigate('/order-confirmation');
    }, 2000); // Simulación de espera de 2 segundos antes de redirigir
  };

  return (
    <div className="checkout-container">
      {/* Sección de direcciones */}
      <div className="address-section">
        <div className="address-card">
          <h3>Dirección de envío</h3>
          <div className="address-info">
            <p>Nombre: Nueva Imperial Teresa Anacona</p>
            <p>Avda las regalías 7890</p>
            <p>Juníor: xxxxx</p>
            <button className="edit-btn">✏️</button>
          </div>
          <button className="edit-link">Editar</button>
          <button className="add-link" onClick={toggleModal}>+ Añadir Nueva Dirección</button>
        </div>

        <div className="address-card">
          <h3>Dirección de Facturación</h3>
          <div className="address-info">
            <p>Nombre: Nueva Imperial Teresa Anacona</p>
            <p>Avda las regalías 7890</p>
            <p>Juníor: xxxxx</p>
            <button className="edit-btn">✏️</button>
          </div>
          <button className="edit-link">Editar</button>
          <button className="add-link" onClick={toggleModal}>+ Añadir Nueva Dirección</button>
        </div>
      </div>

      {/* Modal para añadir nueva dirección */}
      <Modal show={isModalOpen} onClose={toggleModal}>
        <h2>Añadir Nueva Dirección</h2>
        <form className="add-address-form">
          <div className="form-group">
            <label htmlFor="recipient">Nombre del destinatario:</label>
            <input type="text" id="recipient" placeholder="Nombre completo" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono:</label>
            <input type="tel" id="phone" placeholder="Teléfono" />
          </div>
          <div className="form-group">
            <label htmlFor="rut">RUT:</label>
            <input type="text" id="rut" placeholder="RUT" />
          </div>
          <div className="form-group">
            <label htmlFor="region">Región:</label>
            <input type="text" id="region" placeholder="Región" />
          </div>
          <div className="form-group">
            <label htmlFor="comuna">Comuna:</label>
            <input type="text" id="comuna" placeholder="Comuna" />
          </div>
          <div className="form-group">
            <label htmlFor="street">Calle y número:</label>
            <input type="text" id="street" placeholder="Calle y número" />
          </div>
          <div className="form-group">
            <label htmlFor="extra-info">Dpto/Casa/Oficina/Condominio (Opcional):</label>
            <input type="text" id="extra-info" placeholder="Opcional" />
          </div>
          <button type="submit" className="submit-btn">Guardar Dirección</button>
        </form>
      </Modal>

      {/* Métodos de pago */}
      <div className="payment-section">
        <h3>Métodos de pago</h3>
        <div className="payment-method">
          <input type="radio" id="webpay" name="payment-method" value="Webpay" />
          <label htmlFor="webpay">Webpay Plus</label>
        </div>
        <div className="payment-method">
          <input type="radio" id="transfer" name="payment-method" value="Transferencia" />
          <label htmlFor="transfer">Transferencia Bancaria</label>
        </div>
        <textarea
          className="special-instructions"
          placeholder="Introduce las instrucciones especiales para tu pedido (Opcional)"
        ></textarea>
      </div>

      {/* Opciones de envío */}
      <div className="shipping-section">
        <h3>Opciones de envío</h3>
        <div className="shipping-options">
          <div className="shipping-option">
            <input type="radio" id="envia" name="shipping" value="envia" />
            <label htmlFor="envia">
              Envia a todo el país de 2 a 3 días hábiles
            </label>
          </div>
          <div className="shipping-option">
            <input type="radio" id="domicilio" name="shipping" value="domicilio" />
            <label htmlFor="domicilio">
              Despacho a Domicilio
            </label>
          </div>
        </div>
      </div>

      {/* Resumen de la compra */}
      <div className="summary-section">
        <h3>Resumen de la compra</h3>
        <p>Productos(X): $xxxxxxx</p>
        <p>Descuentos(X): $-xxxxxxx</p>
        <p className="total">Total: $xxxxxxxx</p>
        <button className="checkout-btn" onClick={handlePayment}>
          Realizar Pago
        </button>
      </div>

      {/* Revisión de productos */}
      <div className="review-section">
        <h3>Revisión</h3>
        <div className="product-review">
          <img src="imagen_url" alt="producto" className="product-image" />
          <p>Nombre del producto</p>
          <p>Cantidad: X5</p>
        </div>
        <button className="see-more-btn">Ver más</button>
      </div>
    </div>
  );
};

export default Checkout;
