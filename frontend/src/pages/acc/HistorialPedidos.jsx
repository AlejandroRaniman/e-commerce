import React from 'react';
import { Link } from 'react-router-dom';  // Para las rutas de navegación
import '../../styles/acc/Miperfil.css';   // Asegúrate de que los estilos están bien configurados

const HistorialPedidos = () => {
  return (
    <div className="perfil-container">
      {/* Barra lateral */}
      <aside className="sidebar">
        <h2>¡Hola Matías Vásquez!</h2>
        <ul className="menu">
          <li><Link to="/perfil" className="menu-item">Información de la cuenta</Link></li>
          <li><Link to="/direcciones" className="menu-item">Direcciones</Link></li>
          <li><Link to="/historial-pedidos" className="menu-item active">Historial de Pedidos</Link></li>
          <li><Link to="/preguntas-frecuentes" className="menu-item">Preguntas Frecuentes</Link></li>
          <li><Link to="/logout" className="menu-item logout">Cerrar Sesión</Link></li>
        </ul>
      </aside>

      <main className="profile-content">
        <h3>Historial de Pedidos</h3>
        {/* Aquí puedes agregar el contenido de los pedidos */}
        <ul className="pedido-list">
          <li>
            <strong>Pedido #12345:</strong> Enviado el 15 de octubre, 2024 - <span className="status">Completado</span>
          </li>
          <li>
            <strong>Pedido #12346:</strong> Enviado el 2 de septiembre, 2024 - <span className="status">Pendiente</span>
          </li>
          {/* Más pedidos */}
        </ul>
      </main>
    </div>
  );
};

export default HistorialPedidos;
