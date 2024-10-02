import React from 'react';
import '../styles/Navbar.css'; // Asegúrate de crear este archivo para los estilos

const Navbar = () => {
    return (
<nav class="navbar">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a href="#" class="nav-link">Hogar</a>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Cocina</a>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Baño</a>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Juguetería</a>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Útiles</a>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Jardín</a>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Ferretería</a>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">Subcategoría 1</a>
                    <a href="#" class="dropdown-item">Subcategoría 2</a>
                    <a href="#" class="dropdown-item">Subcategoría 3</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Celebraciones</a>
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
