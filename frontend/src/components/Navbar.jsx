import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const NavItem = ({ to, label, subcategories, toggleDropdown, activeDropdown }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeDropdown === label;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      toggleDropdown(label);
    }
  };

  return (
    <li 
      className="nav-item" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        to={to} 
        className="nav-link" 
        onClick={handleClick}
      >
        {label}
        {subcategories && <span className="dropdown-arrow"></span>}
      </Link>
      {subcategories && (
        <ul className={`dropdown-menu ${isHovered || isActive ? 'active' : ''}`}>
          {subcategories.map((subcat, index) => (
            <li key={index}>
              <Link 
                to={`${to}/${subcat.toLowerCase().replace(/\s+/g, '-')}`} 
                className="dropdown-item"
              >
                {subcat}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Navbar = ({ isOpen, toggleDropdown, activeDropdown }) => {
  const categories = [
    { to: "/hogar", label: "Hogar", subcategories: ["Subcategoría 1", "Subcategoría 2", "Subcategoría 3"] },
    { to: "/cocina", label: "Cocina", subcategories: ["Subcategoría 1", "Subcategoría 2", "Subcategoría 3"] },
    { to: "/bano", label: "Baño", subcategories: ["Subcategoría 1", "Subcategoría 2", "Subcategoría 3"] },
    { to: "/jugueteria", label: "Juguetería", subcategories: ["Subcategoría 1", "Subcategoría 2", "Subcategoría 3"] },
    { to: "/utiles", label: "Útiles", subcategories: ["Subcategoría 1", "Subcategoría 2", "Subcategoría 3"] },
    { to: "/jardin", label: "Jardín", subcategories: ["Subcategoría 1", "Subcategoría 2", "Subcategoría 3"] },
    { to: "/ferreteria", label: "Ferretería", subcategories: ["Subcategoría 1", "Subcategoría 2", "Subcategoría 3"] },
    { to: "/celebraciones", label: "Celebraciones", subcategories: ["Subcategoría 1", "Subcategoría 2", "Subcategoría 3"] },
  ];

  return (
    <nav className={`navbar ${isOpen ? 'active' : ''}`}>
      <ul className="navbar-nav">
        {categories.map((category, index) => (
          <NavItem 
            key={index} 
            {...category} 
            toggleDropdown={toggleDropdown}
            activeDropdown={activeDropdown}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;