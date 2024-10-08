import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './styles/index.css'; // Importar estilos globales

// Componentes
import Header from './components/Header';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Section from './components/section';
import CategoryCarousel from './components/CategoryCarousel';
import ProductCarousel from './components/ProductCarousel';
import ProcessFlow from './components/ProcessFlow';
import Footer from './components/Footer';

// Categorías
import Hogar from './pages/categorias/Hogar';
import Cocina from './pages/categorias/Cocina';
import Baño from './pages/categorias/Baño';
import Jugueteria from './pages/categorias/Jugueteria';
import Utiles from './pages/categorias/Utiles';
import Jardin from './pages/categorias/Jardin';
import Ferreteria from './pages/categorias/Ferreteria';
import Celebraciones from './pages/categorias/Celebraciones';

// Páginas de autenticación
import SignIn from './pages/acc/SignIn';
import Register from './pages/acc/Register';

const Layout = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const toggleDropdown = (label) => setActiveDropdown(activeDropdown === label ? null : label);

    return (
        <div className="App">
            <Header toggleNavbar={toggleNavbar} isNavbarOpen={isNavbarOpen} />
            {!hideNavbar && (
                <Navbar 
                    isOpen={isNavbarOpen} 
                    toggleDropdown={toggleDropdown} 
                    activeDropdown={activeDropdown}
                />
            )}

            <Routes>
                {/* Página principal */}
                <Route
                    path="/"
                    element={
                        <>
                            <Carousel />
                            <Section />
                            <CategoryCarousel />
                            <ProductCarousel />
                            <ProcessFlow />
                        </>
                    }
                />
                {/* Rutas para las categorías */}
                <Route path="/hogar" element={<Hogar />} />
                <Route path="/cocina" element={<Cocina />} />
                <Route path="/baño" element={<Baño />} />
                <Route path="/jugueteria" element={<Jugueteria />} />
                <Route path="/utiles" element={<Utiles />} />
                <Route path="/jardin" element={<Jardin />} />
                <Route path="/ferreteria" element={<Ferreteria />} />
                <Route path="/celebraciones" element={<Celebraciones />} />

                {/* Rutas para las páginas de Login y Registro */}
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
            </Routes>

            {!hideNavbar && <Footer />}
        </div>
    );
};

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;