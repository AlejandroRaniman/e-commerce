import React, { useState } from 'react';
import '../styles/Header.css';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = ({ toggleNavbar, isNavbarOpen }) => {
    const location = useLocation();
    const hideElements = location.pathname === '/login' || location.pathname === '/register';
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className={`header ${hideElements ? 'login-header' : ''}`}>
            <div className="header-container">
                {/* Logo */}
                <div className="logo">
                    <Link to="/">
                        <img src={process.env.PUBLIC_URL + '/assets/huamao.png'} alt="Logo" className="logo-image" />
                    </Link>
                </div>

                {!hideElements && (
                    <>
                        {/* Barra de Búsqueda (visible en desktop, toggle en mobile) */}
                        <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
                            <input type="text" placeholder="Buscar" className="search-input" />
                            <button className="search-button">
                                <FaSearch />
                            </button>
                        </div>
                        
                        {/* Botón de Login */}
                        <div className="login-button">
                            <Link to="/login">
                                <button className="login">
                                    <FaUser />
                                    <span>Iniciar Sesión</span>
                                </button>
                            </Link>
                        </div>

                        {/* Botón de Carrito */}
                        <div className="cart-icon">
                            <button className="cart-button">
                                <FaShoppingCart />
                                <span>Carrito</span>
                            </button>
                        </div>

                        {/* Iconos para móvil */}
                        <div className="mobile-icons">
                            <FaSearch onClick={() => setIsSearchOpen(!isSearchOpen)} />
                            <Link to="/login"><FaUser /></Link>
                            <FaShoppingCart />
                        </div>

                        {/* Botón de menú para móvil */}
                        <button className="menu-toggle" onClick={toggleNavbar}>
                            {isNavbarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;