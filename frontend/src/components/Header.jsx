import React from 'react';
import '../styles/Header.css';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const hideElements = location.pathname === '/login' || location.pathname === '/register';

    return (
        <header className={`header ${hideElements ? 'login-header' : ''}`}>
            <div className="header-container">
                {/* Logo */}
                <div className="logo">
                    <Link to="/">
                        <img src={process.env.PUBLIC_URL + '/assets/huamao.png'} alt="Logo" className="logo-image" />
                    </Link>
                </div>

                {/* Solo muestra la barra de búsqueda, botón de login y carrito si no estás en la página de login o registro */}
                {!hideElements && (
                    <>
                        {/* Barra de Búsqueda */}
                        <div className="search-bar">
                            <input type="text" placeholder="Buscar" className="search-input" />
                            <button className="search-button">
                                <FaSearch />
                            </button>
                        </div>
                        {/* Botón de Login */}
                        <div className="login-button">
                            <Link to="/login">
                                <button className="login">
                                    <FaUser /> Iniciar
                                </button>
                            </Link>
                        </div>
                        <div className="cart-icon">
                            <FaShoppingCart />
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
