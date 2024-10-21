import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Para las rutas de navegación
import '../../styles/acc/Miperfil.css';

const HistorialDirecciones = () => {
  const [showModal, setShowModal] = useState(false);  // Estado para controlar el modal

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="perfil-container">
      {/* Barra lateral */}
      <aside className="sidebar">
        <h2>¡Hola Matías Vásquez!</h2>
        <ul className="menu">
          <li><Link to="/perfil" className="menu-item">Información de la cuenta</Link></li>
          <li><Link to="/direcciones" className="menu-item">Direcciones</Link></li>
          <li><Link to="/historial-pedidos" className="menu-item">Historial de Pedidos</Link></li>
          <li><Link to="/preguntas-frecuentes" className="menu-item">Preguntas Frecuentes</Link></li>
          <li><Link to="/logout" className="menu-item logout">Cerrar Sesión</Link></li>
        </ul>
      </aside>

      <main className="profile-content">
        <h3>Historial de Direcciones</h3>
        {/* Botón para abrir el modal */}
        <button onClick={toggleModal} className="add-btn">Agregar Nueva Dirección</button>

        {/* Modal para agregar nuevas direcciones */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={toggleModal}>&times;</span>
              <h4>Agregar Nueva Dirección</h4>
              <form>
                <label htmlFor="direccion">Dirección:</label>
                <input type="text" id="direccion" name="direccion" />

                <label htmlFor="ciudad">Ciudad:</label>
                <input type="text" id="ciudad" name="ciudad" />

                <label htmlFor="region">Región:</label>
                <input type="text" id="region" name="region" />

                <button type="submit" className="save-btn">Guardar Dirección</button>
              </form>
            </div>
          </div>
        )}

        {/* Aquí irían las direcciones existentes */}
        <ul className="direccion-list">
          <li>Dirección 1</li>
          <li>Dirección 2</li>
          {/* Más direcciones... */}
        </ul>
      </main>
    </div>
  );
};

export default HistorialDirecciones;
