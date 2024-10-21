import React, { createContext, useState, useContext } from 'react';

// Crear contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);

// Proveedor del carrito de compras
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para añadir productos al carrito
  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

