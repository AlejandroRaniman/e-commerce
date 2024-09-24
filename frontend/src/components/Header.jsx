import React from 'react';
import '../styles/Header.css'; // Asegúrate de crear este archivo para los estilos
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa'; // Iconos de react-icons

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + '/assets/huamao.png'} alt="Logo" className="logo-image" />
                </div>
                {/* Barra de Búsqueda */}
                <div className="search-bar">
                    <input type="text" placeholder="Buscar" className="search-input" />
                    <button className="search-button">
                        <FaSearch />
                    </button>
                </div>
                {/* Botón de Iniciar Sesión */}
                <div className="login-button">
                    <button className="login">
                        <FaUser /> Iniciar
                    </button>
                </div>
                {/* Icono del Carrito */}
                <div className="cart-icon">
                    <FaShoppingCart />
                </div>
            </div>
        </header>
    );
};

export default Header;
