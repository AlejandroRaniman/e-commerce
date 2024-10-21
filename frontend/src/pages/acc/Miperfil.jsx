import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación
import '../../styles/acc/Miperfil.css';

const MiPerfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: 'Matías Vásquez',
    email: 'matias@gmail.com',
    telefono: '+56 961354',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Información guardada correctamente.');
  };

  return (
    <div className="perfil-container">
      {/* Barra lateral añadida */}
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
        <div className="info-card">
          <h3>Información de la cuenta</h3>
          <div className="info-section">
            <div className="info">
              <h4>Información Personal</h4>
              {isEditing ? (
                <>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={profileData.nombre}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={profileData.telefono}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <p><strong>Nombre:</strong> {profileData.nombre}</p>
                  <p><strong>Email:</strong> {profileData.email}</p>
                  <p><strong>Teléfono:</strong> {profileData.telefono}</p>
                </>
              )}
            </div>
            <div className="actions">
              {isEditing ? (
                <button className="save-btn" onClick={handleSave}>
                  Guardar Cambios
                </button>
              ) : (
                <button className="edit-btn" onClick={handleEditToggle}>
                  Editar Información
                </button>
              )}
            </div>
          </div>

          <div className="password-section">
            <h4>Contraseña</h4>
            <p>*********</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MiPerfil;
