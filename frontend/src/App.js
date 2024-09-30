import React from 'react';
import './styles/index.css'; // Importar estilos globales
import Header from './components/Header';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Section from './components/section';
import CategoryCarousel from './components/CategoryCarousel';
import ProductCarousel from './components/ProductCarousel';
import ProcessFlow from './components/ProcessFlow';
import Footer from './components/Footer';


function App() {
    return (
        <div className="App">
            <Header />
            <Navbar />
            <Carousel /> 
            <Section />
            <CategoryCarousel />
            <ProductCarousel />
            <ProcessFlow />
            <Footer />
        </div>
    );
}

export default App;
