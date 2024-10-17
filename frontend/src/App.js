import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Carro from './pages/Carro';
import Checkout from './pages/Checkout'; // Asegúrate de que la ruta sea correcta


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
import Dashboard from './pages/Dashboard';
import Register from './pages/acc/Register';

// Componente Home
const Home = () => (
  <>
    <Carousel />
    <Section />
    <CategoryCarousel />
    <ProductCarousel />
    <ProcessFlow />
  </>
);

const Layout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/signin' || location.pathname === '/register';

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user } = useContext(AuthContext); // Obtener el usuario desde el contexto

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
        <Route path="/" element={<Home />} />

        {/* Rutas para las categorías */}
        <Route path="/hogar" element={<Hogar />} />
        <Route path="/cocina" element={<Cocina />} />
        <Route path="/bano" element={<Baño />} />
        <Route path="/jugueteria" element={<Jugueteria />} />
        <Route path="/utiles" element={<Utiles />} />
        <Route path="/jardin" element={<Jardin />} />
        <Route path="/ferreteria" element={<Ferreteria />} />
        <Route path="/celebraciones" element={<Celebraciones />} />
        <Route path="/carro" element={<Carro />} />
        <Route path="/checkout" element={<Checkout />} />
       

       
  
       
  


        {/* Rutas para las páginas de Login y Registro */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida para el Dashboard */}
        <Route
          path="/dashboard"
          element={
            user && user.role === 'admin' ? (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ) : (
              <div>No tienes permisos para acceder a esta página.</div>
            )
          }
        />
      </Routes>

      {!hideNavbar && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
