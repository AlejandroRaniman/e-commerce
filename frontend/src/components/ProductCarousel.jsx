// src/components/ProductCarousel.jsx
import React from 'react';
import '../styles/ProductCarousel.css';
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa';

// Datos simulados para los productos
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
  // Agrega más productos si es necesario
];

const ProductCarousel = () => {
  const [currentProduct, setCurrentProduct] = React.useState(0);

  const nextProduct = () => {
    setCurrentProduct((prevProduct) => (prevProduct + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prevProduct) => (prevProduct - 1 + products.length) % products.length);
  };

  return (
    <div className="product-carousel-container">
      <h2>Productos Destacados</h2>
      <div className="product-carousel">
        <button className="carousel-button prev-button" onClick={prevProduct}>
          <FaChevronLeft />
        </button>
        <div className="product-carousel-content">
          <img src={products[currentProduct].image} alt={products[currentProduct].name} />
          <div className="product-info">
            <h3>{products[currentProduct].name}</h3>
            <p>{products[currentProduct].description}</p>
            <div className="product-pricing">
              <span>Normal: ${products[currentProduct].normalPrice}</span>
              <span>Por mayor: ¥{products[currentProduct].bulkPrice}</span>
            </div>
            <div className="product-quantity">
              <label htmlFor="quantity">Cantidad:</label>
              <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
            </div>
            <button className="add-to-cart-button">
              <FaShoppingCart /> Añadir al Carrito
            </button>
          </div>
        </div>
        <button className="carousel-button next-button" onClick={nextProduct}>
          <FaChevronRight />
        </button>
      </div>
      <div className="product-carousel-dots">
        {products.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentProduct ? 'active' : ''}`}
            onClick={() => setCurrentProduct(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
