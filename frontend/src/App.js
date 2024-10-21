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
import OrderAnimation from './components/OrderAnimation';

// Contextos
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; 

// Páginas
import Carro from './pages/Carro';
import Checkout from './pages/Checkout';
import SignIn from './pages/acc/SignIn';
import Dashboard from './pages/Dashboard';
import Register from './pages/acc/Register';
import Miperfil from './pages/acc/Miperfil';
import HistorialDirecciones from './pages/acc/HistorialDirecciones';
import HistorialPedidos from './pages/acc/HistorialPedidos';
import Categoria from './pages/categorias/Categoria'; // Categorías usando componente genérico

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

        {/* Ruta dinámica para manejar todas las categorías */}
        <Route path="/category/:category" element={<Categoria />} />

        {/* Otras rutas */}
        <Route path="/carro" element={<Carro />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderAnimation />} />

        {/* Rutas para las páginas de Login y Registro */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Miperfil />} />
        <Route path="/direcciones" element={<HistorialDirecciones />} />
        <Route path="/historial-pedidos" element={<HistorialPedidos />} />

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
      <CartProvider> {/* Envolver la aplicación en CartProvider */}
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
