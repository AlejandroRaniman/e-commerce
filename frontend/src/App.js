import React from 'react';
import './styles/index.css'; // Importar estilos globales
import Header from './components/Header';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';

function App() {
    return (
        <div className="App">
            {/* Componente Header */}
            <Header />
            {/* Aquí va el resto de tu contenido */}
            <Navbar />
            {/* Aquí va el resto del contenido de tu aplicación */}
            <Carousel /> {/* Tu componente Carousel */}
            {/* Otros componentes o contenido */}
        </div>
    );
}

export default App;
