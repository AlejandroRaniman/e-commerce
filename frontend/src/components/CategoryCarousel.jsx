import React, { useState, useEffect } from 'react';
import '../styles/CategoryCarousel.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = [
  { label: "Escolar", image: process.env.PUBLIC_URL + '/assets/escolar.jpg' },
  { label: "Regalo", image: process.env.PUBLIC_URL + '/assets/regalo.jpg' },
  { label: "Ferretería", image: process.env.PUBLIC_URL + '/assets/ferreteria.jpg' },
  { label: "Hogar", image: process.env.PUBLIC_URL + '/assets/hogar.jpg' },
  { label: "Cocina", image: process.env.PUBLIC_URL + '/assets/cocina.jpg' },
  { label: "Baño", image: process.env.PUBLIC_URL + '/assets/bano.jpg' },
];

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('');

  const nextSlide = () => {
    if (!isAnimating) {
      setDirection('next');
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setDirection('prev');
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Match this with your CSS transition time
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getVisibleCategories = () => {
    const visibleCategories = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % categories.length;
      visibleCategories.push(categories[index]);
    }
    return visibleCategories;
  };

  return (
    <div className="category-carousel-container">
      <h2>Categorías</h2>
      <div className="category-carousel">
        <button className="carousel-button prev-button" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <div className={`category-slider ${isAnimating ? `animating ${direction}` : ''}`}>
          {getVisibleCategories().map((category, index) => (
            <div key={index} className="category-item">
              <div className="category-card">
                <img src={category.image} alt={category.label} />
                <p>{category.label}</p>
              </div>
            </div>
          ))}
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