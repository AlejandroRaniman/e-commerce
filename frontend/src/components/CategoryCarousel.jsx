import React, { useState } from 'react';
import '../styles/CategoryCarousel.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = [
  { name: 'Escolar', image: process.env.PUBLIC_URL + '/assets/escolar.jpg' },
  { name: 'Regalo', image: process.env.PUBLIC_URL + '/assets/regalo.jpg' },
  { name: 'Ferretería', image: process.env.PUBLIC_URL + '/assets/ferreteria.jpg' },
  { name: 'Tecnología', image: process.env.PUBLIC_URL + '/assets/tecnologia.jpg' },
  { name: 'Hogar', image: process.env.PUBLIC_URL + '/assets/hogar.jpg' },
];

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  return (
    <div className="category-carousel-container">
      <h2>Categorías</h2>
      <div className="category-carousel">
        <button className="carousel-button prev-button" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <div className="category-slider">
          {categories.map((category, index) => {
            let position = index - currentIndex;
            if (position < 0) position = categories.length + position;
            return (
              <div
                key={index}
                className={`category-item ${position === 1 ? 'active' : ''} ${
                  position === 0 || position === 2 ? 'adjacent' : ''
                }`}
                style={{
                  transform: `translateX(${(position - 1) * 100}%)`,
                  opacity: position >= 0 && position <= 2 ? 1 : 0,
                }}
              >
                <div className="category-card">
                  <img src={category.image} alt={category.name} />
                  <p>{category.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-button next-button" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
      <div className="category-carousel-dots">
        {categories.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;