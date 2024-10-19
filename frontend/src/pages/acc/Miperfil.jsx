import React, { useState } from 'react';
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
    // Aquí puedes implementar la lógica para guardar los cambios (enviarlos a la API o base de datos)
    setIsEditing(false);
    alert('Información guardada correctamente.');
  };

  return (
    <div className="perfil-container">
      <aside className="sidebar">
        <h2>¡Hola Matías Vásquez!</h2>
        <ul className="menu">
          <li><a href="#" className="menu-item">Inicio</a></li>
          <li><a href="#" className="menu-item">Ayuda</a></li>
          <li><a href="#" className="menu-item active">Información de la cuenta</a></li>
          <li><a href="#" className="menu-item">Historial de Pedidos</a></li>
          <li><a href="#" className="menu-item">Favoritos</a></li>
          <li><a href="#" className="menu-item">Direcciones</a></li>
          <li><a href="#" className="menu-item logout">Cerrar Sesión</a></li>
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

        {/* Nueva sección de direcciones */}
        <div className="info-card">
          <h3>Direcciones</h3>
          <div className="info-section">
            <h4>Agregar o Editar Dirección</h4>
            <form className="address-form">
              <label htmlFor="address">Dirección</label>
              <input type="text" id="address" name="address" placeholder="Calle, Número, Ciudad, etc." />

              <label htmlFor="city">Ciudad</label>
              <input type="text" id="city" name="city" placeholder="Ciudad" />

              <label htmlFor="postal-code">Código Postal</label>
              <input type="text" id="postal-code" name="postal-code" placeholder="Código Postal" />

              <label htmlFor="region">Región</label>
              <input type="text" id="region" name="region" placeholder="Región" />

              <button type="submit" className="save-btn">Guardar Dirección</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MiPerfil;
