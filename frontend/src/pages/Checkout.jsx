import React from 'react';
import '../styles/Checkout.css';

const Checkout = () => {
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
          <button className="add-link">+ Añadir Nueva Dirección</button>
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
          <button className="add-link">+ Añadir Nueva Dirección</button>
        </div>
      </div>

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
        <button className="checkout-btn">
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
