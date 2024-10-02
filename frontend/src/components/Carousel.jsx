import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://via.placeholder.com/800x400?text=Slide+1',
    process.env.PUBLIC_URL + '/assets/gpt.jpg', // Ruta para la imagen local en public/assets
    'https://via.placeholder.com/800x400?text=Slide+3',
    'https://via.placeholder.com/800x400?text=Slide+4',
    'https://via.placeholder.com/800x400?text=Slide+5',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Cambia de imagen automáticamente cada 3 segundos
    }, 10000);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length); // Cambia al siguiente slide
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length); // Cambia al slide anterior
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index); // Cambia al slide correspondiente al hacer clic en un dot
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="carousel-prev" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="carousel-next" onClick={handleNext}>
        &#10095;
      </button>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
