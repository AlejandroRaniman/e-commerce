import React, { useState } from 'react';
import '../styles/ProductCarousel.css';

const products = [
  {
    name: 'Producto X',
    description: 'sdhsajkdhsa jkdhs 10pcs',
    normalPrice: 100,
    bulkPrice: 1000,
    image: process.env.PUBLIC_URL + '/assets/product1.jpg',
  },
  {
    name: 'Producto Y',
    description: 'Descripcion Y',
    normalPrice: 120,
    bulkPrice: 1100,
    image: process.env.PUBLIC_URL + '/assets/product2.jpg',
  },
  {
    name: 'Producto Z',
    description: 'Descripcion Z',
    normalPrice: 150,
    bulkPrice: 1300,
    image: process.env.PUBLIC_URL + '/assets/product3.jpg',
  },
];

const ProductCarousel = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextProduct = () => {
    setCurrentProduct((prevProduct) => (prevProduct + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prevProduct) => (prevProduct - 1 + products.length) % products.length);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  return (
    <div className="product-carousel-container">
      <h2>Productos Destacados</h2>
      <div className="product-carousel">
        <button className="carousel-button prev-button" onClick={prevProduct} aria-label="Producto anterior">
          <i className="bi bi-chevron-left"></i>
        </button>
        <div className="product-carousel-content">
          <div className="product-image">
            <img src={products[currentProduct].image} alt={products[currentProduct].name} />
          </div>
          <div className="product-info">
            <h3>{products[currentProduct].name}</h3>
            <p>{products[currentProduct].description}</p>
            <div className="product-pricing">
              <span>Normal: ${products[currentProduct].normalPrice}</span>
              <span>Por mayor: ¥{products[currentProduct].bulkPrice}</span>
            </div>
            <div className="product-quantity">
              <label htmlFor="quantity">Cantidad:</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min="1" 
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <button className="add-to-cart-button">
              <i className="bi bi-cart-plus"></i> Añadir al Carrito
            </button>
          </div>
        </div>
        <button className="carousel-button next-button" onClick={nextProduct} aria-label="Siguiente producto">
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="product-carousel-dots">
        {products.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentProduct ? 'active' : ''}`}
            onClick={() => setCurrentProduct(index)}
            aria-label={`Ir al producto ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;