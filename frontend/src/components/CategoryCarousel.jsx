// src/components/CategoryCarousel.jsx
import React from 'react';
import '../styles/CategoryCarousel.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Definimos las categorías
const categories = [
  { name: 'Escolar', image: process.env.PUBLIC_URL + '/assets/escolar.jpg' },
  { name: 'Regalo', image: process.env.PUBLIC_URL + '/assets/regalo.jpg' },
  { name: 'Ferretería', image: process.env.PUBLIC_URL + '/assets/ferreteria.jpg' },
  { name: 'Tecnología', image: process.env.PUBLIC_URL + '/assets/tecnologia.jpg' },
  { name: 'Hogar', image: process.env.PUBLIC_URL + '/assets/hogar.jpg' },
  // Puedes agregar más categorías aquí
];

const CategoryCarousel = () => {
  const [currentCategory, setCurrentCategory] = React.useState(0);

  // Cambiar a la siguiente categoría
  const nextCategory = () => {
    setCurrentCategory((prevCategory) => (prevCategory + 1) % categories.length);
  };

  // Cambiar a la categoría anterior
  const prevCategory = () => {
    setCurrentCategory((prevCategory) => (prevCategory - 1 + categories.length) % categories.length);
  };

  return (
    <div className="category-carousel-container">
      <h2>Categorías</h2>
      <div className="category-carousel">
        <button className="carousel-button prev-button" onClick={prevCategory}>
          <FaChevronLeft />
        </button>
        <div className="category-carousel-content">
          <img src={categories[currentCategory].image} alt={categories[currentCategory].name} />
          <p>{categories[currentCategory].name}</p>
        </div>
        <button className="carousel-button next-button" onClick={nextCategory}>
          <FaChevronRight />
        </button>
      </div>
      <div className="category-carousel-dots">
        {categories.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentCategory ? 'active' : ''}`}
            onClick={() => setCurrentCategory(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
