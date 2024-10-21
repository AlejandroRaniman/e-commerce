import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Carro.css'; 
import { AuthContext } from '../context/AuthContext';

const Carro = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    totalPrice: 0,
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/cart/items', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();

      const groupedItems = data.reduce((acc, item) => {
        const existingItem = acc.find(i => i.product_details.id === item.product_details.id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      setCartItems(groupedItems);
      calculateCartSummary(groupedItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateCartSummary = (items) => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.product_details.price * item.quantity, 0);
    setCartSummary({
      totalItems,
      totalPrice,
    });
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await fetch(`http://127.0.0.1:5000/cart/remove/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    if (user) {
        navigate('/checkout');
    } else {
        navigate('/signin', { state: { from: '/checkout' } });
    }
};

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product_details.id}>
              <h4>{item.product_details.name}</h4>
              <p>Precio: ${item.product_details.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Resumen de la compra</h3>
            <p>Total de productos: {cartSummary.totalItems}</p>
            <p>Total a pagar: ${cartSummary.totalPrice.toFixed(2)}</p>
            <button className="checkout-btn" onClick={handleCheckout}>Realizar Pago</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carro;
