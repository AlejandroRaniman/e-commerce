import React from 'react';
import '../styles/Navbar.css'; // Asegúrate de crear este archivo para los estilos

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    Hogar
                    <span className="dropdown-icon">▼</span>
                    <div className="dropdown">
                        <ul>
                            <li>Decoración</li>
                            <li>Iluminación</li>
                            <li>Muebles</li>
                        </ul>
                    </div>
                </li>
                <li className="navbar-item">
                    Cocina
                    <span className="dropdown-icon">▼</span>
                    <div className="dropdown">
                        <ul>
                            <li>Decoración</li>
                            <li>Iluminación</li>
                            <li>Muebles</li>
                        </ul>
                    </div>
                </li>
                <li className="navbar-item">
                    Baño
                    <span className="dropdown-icon">▼</span>
                    <div className="dropdown">
                        <ul>
                            <li>Decoración</li>
                            <li>Iluminación</li>
                            <li>Muebles</li>
                        </ul>
                    </div>
                </li>
                <li className="navbar-item">
                    Juguetería
                    <span className="dropdown-icon">▼</span>
                    <div className="dropdown">
                        <ul>
                            <li>Decoración</li>
                            <li>Iluminación</li>
                            <li>Muebles</li>
                        </ul>
                    </div>
                </li>
                <li className="navbar-item">
                    Útiles
                    <span className="dropdown-icon">▼</span>
                    <div className="dropdown">
                        <ul>
                            <li>Decoración</li>
                            <li>Iluminación</li>
                            <li>Muebles</li>
                        </ul>
                    </div>
                </li>
                <li className="navbar-item">
                    Jardín
                    <span className="dropdown-icon">▼</span>
                    <div className="dropdown">
                        <ul>
                            <li>Decoración</li>
                            <li>Iluminación</li>
                            <li>Muebles</li>
                        </ul>
                    </div>
                </li>
                <li className="navbar-item">
                    Ferretería
                    <span className="dropdown-icon">▼</span>
                    <div className="dropdown">
                        <ul>
                            <li>Decoración</li>
                            <li>Iluminación</li>
                            <li>Muebles</li>
                        </ul>
                    </div>
                </li>
                <li className="navbar-item">
                    Celebraciones
                    <span className="dropdown-icon">▼</span>
                    <div className="dropdown">
                        <ul>
                            <li>Decoración</li>
                            <li>Iluminación</li>
                            <li>Muebles</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
