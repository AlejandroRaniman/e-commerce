import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Carro.css';

const Carro = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/cart/items', {
        method: 'GET',
        credentials: 'include', // Esto permite enviar cookies de sesión
      });

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

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/cart/remove/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Producto eliminado del carrito');
        fetchCartItems(); // Refresca los productos del carrito después de eliminar uno
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        alert('La cantidad debe ser mayor que cero');
        return;
      }

      const response = await fetch(`http://127.0.0.1:5000/cart/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
        credentials: 'include',
      });

      if (response.ok) {
        fetchCartItems(); // Refresca los productos del carrito después de actualizar la cantidad
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto:', error);
    }
  };

  const handleCheckout = () => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = Boolean(localStorage.getItem('auth_token')); // Ejemplo de verificación
    if (!isAuthenticated) {
      alert('Debe iniciar sesión para continuar con el pago.');
      navigate('/login');
    } else {
      // Continuar con el proceso de pago
      navigate('/checkout');
    }
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
          products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="producto-item">
                <img src={product.image_url || 'placeholder.png'} alt={product.product_name} className="product-image" />
                <div className="product-details">
                  <p className="product-title">{product.product_name}</p>
                  <p className="product-price">Precio: $ {product.price}</p>
                </div>
                <div className="product-subtotal">
                  <p>Subtotal: $ {product.price * product.quantity}</p>
                  <div className="product-actions">
                    <button
                      className="quantity-btn"
                      onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={product.quantity}
                      readOnly
                      className="quantity-input"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(product.id)}
                    >
                      ✖
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron productos en el carrito.</p>
          )
        )}
      </div>

      {/* Resumen de compra */}
      <div className="resumen-compra">
        <h3>Resumen de la compra</h3>
        <div className="resumen-details">
          <p>Productos({products.length}): $ {products.reduce((total, product) => total + product.price * product.quantity, 0)}</p>
          <p>Descuentos(X): $ 0</p> {/* Puedes implementar lógica de descuento si es necesario */}
          <p className="total">Total: $ {products.reduce((total, product) => total + product.price * product.quantity, 0)}</p>
          <button className="checkout-btn" onClick={handleCheckout}>
            Realizar pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carro;
