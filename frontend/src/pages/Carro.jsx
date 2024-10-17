import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import '../styles/Carro.css';

const Carro = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Instancia de useNavigate

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/api/productos/Carro');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error al cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    // Redirigir a la página de métodos de pago y dirección de envío
    navigate('/Checkout'); // Cambiar a la ruta correcta
  };

  return (
    <div className="carro-container">
      <div className="carro-productos">
        <h2>Carro de Compras</h2>
        {loading ? (
          <p className="loading">Cargando productos...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="producto-item">
              <img src={product.imageUrl} alt={product.title} className="product-image" />
              <div className="product-details">
                <p className="product-title">{product.title}</p>
                <p className="product-price">$ {product.price}</p>
              </div>
              <div className="product-subtotal">
                <p>Subtotal: $ {product.price * 1}</p>
                <div className="product-actions">
                  <button className="quantity-btn">-</button>
                  <input type="number" defaultValue="1" className="quantity-input" />
                  <button className="quantity-btn">+</button>
                  <button className="remove-btn">✖</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resumen de compra */}
      <div className="resumen-compra">
        <h3>Resumen de la compra</h3>
        <div className="resumen-details">
          <p>Productos(X): $xxxxxxx</p>
          <p>Descuentos(X): $-xxxxxxx</p>
          <p className="total">Total: $xxxxxxxx</p>
          <button className="checkout-btn" onClick={handleCheckout}>
            Realizar pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carro;
