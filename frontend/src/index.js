import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client'
import './styles/index.css'; // Asegúrate de que la ruta de estilos sea correcta
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
