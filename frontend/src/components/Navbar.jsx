import React from 'react';
import '../styles/Navbar.css'; // Asegúrate de crear este archivo para los estilos
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
<nav class="navbar">
        <ul class="navbar-nav">
            <li class="nav-item">
            <li><Link to="/hogar" className="nav-link">Hogar</Link></li>  {/* Enlace a la página de Hogar */}
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
            <li><Link to="/cocina" className="nav-link">Cocina</Link></li>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
            <li><Link to="/baño" className="nav-link">Baño</Link></li>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
            <li><Link to="/jugueteria" className="nav-link">Jugueteria</Link></li>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
            <li><Link to="/utiles" className="nav-link">Utiles</Link></li>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
            <li><Link to="/jardin" className="nav-link">Jardin</Link></li>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
            <li><Link to="/ferreteria" className="nav-link">Ferreteria</Link></li>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
            <li><Link to="/celebraciones" className="nav-link">Celebracionres</Link></li>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
        </ul>
    </nav>
    );
};

export default Navbar;
