import React, { useState, useContext } from 'react';
import '../styles/Header.css';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Header = ({ toggleNavbar, isNavbarOpen }) => {
    const location = useLocation();
    const hideElements = location.pathname === '/login' || location.pathname === '/register';
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user, logout } = useContext(AuthContext); // Obtener el usuario y la función de logout

    return (
        <header className={`header ${hideElements ? 'login-header' : ''}`}>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/" className="logo">
                        <img src={process.env.PUBLIC_URL + '/assets/huamao.png'} alt="Logo" className="logo-image" />
                    </Link>
                </div>

                {!hideElements && (
                    <>
                        <div className="header-center">
                            <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
                                <input type="text" placeholder="Buscar" className="search-input" />
                                <button className="search-button">
                                    <FaSearch />
                                </button>
                            </div>
                        </div>

                        <div className="header-right">
                            {user ? (
                                <div className="user-info">
                                    <span>Hola, {user.username}</span>
                                    <button onClick={logout} className="logout-button">Cerrar Sesión</button>
                                </div>
                            ) : (
                                <Link to="/signin" className="login-button">
                                    <button className="login">
                                        <FaUser />
                                        <span>Iniciar Sesión</span>
                                    </button>
                                </Link>
                            )}

                            <Link to="/carro">
                                <button className="cart-button">
                                     <FaShoppingCart />
                                        </button>
                            </Link>
                            <div className="mobile-controls">
                                <button className="mobile-search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                    <FaSearch />
                                </button>
                                <button className="menu-toggle" onClick={toggleNavbar}>
                                    {isNavbarOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
