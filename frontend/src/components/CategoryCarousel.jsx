import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryCarousel.css';

const categories = [
  { name: 'Hogar', image: '/images/hogar.jpg', link: '/hogar' },
  { name: 'Cocina', image: '/images/cocina.jpg', link: '/cocina' },
  { name: 'Baño', image: '/images/bano.jpg', link: '/bano' },
  { name: 'Juguetería', image: '/images/jugueteria.jpg', link: '/jugueteria' },
  { name: 'Útiles', image: '/images/utiles.jpg', link: '/utiles' },
  { name: 'Jardín', image: '/images/jardin.jpg', link: '/jardin' },
  { name: 'Ferretería', image: '/images/ferreteria.jpg', link: '/ferreteria' },
  { name: 'Celebraciones', image: '/images/celebraciones.jpg', link: '/celebraciones' },
];

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(null);

  const showNextSet = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setAnimationDirection('next');
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
        setIsAnimating(false);
      }, 500);
    }
  };

  const showPrevSet = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setAnimationDirection('prev');
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
        setIsAnimating(false);
      }, 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(showNextSet, 5000);
    return () => clearInterval(interval);
  }, []);

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
      <h2>Explora nuestras categorías</h2>
      <div className="category-carousel">
        <button className="carousel-button prev-button" onClick={showPrevSet}>&lt;</button>
        <div className={`category-slider ${isAnimating ? 'animating' : ''} ${animationDirection || ''}`}>
          {getVisibleCategories().map((category, index) => (
            <Link to={category.link} key={index} className="category-item">
              <div className="category-card">
                <img src={category.image} alt={category.name} />
                <p>{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <button className="carousel-button next-button" onClick={showNextSet}>&gt;</button>
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