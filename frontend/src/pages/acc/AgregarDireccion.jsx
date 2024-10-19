import React, { useState } from 'react';
import '../../styles/acc/AgregarDireccion.css'; // Archivo CSS para el estilo

const AgregarDireccion = ({ onConfirm, onCancel }) => {
  const [direccion, setDireccion] = useState({
    nombre: '',
    rut: '',
    telefono: '',
    region: '',
    comuna: '',
    calleNumero: '',
    departamento: ''
  });

  const handleChange = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  return (
    <div className="agregar-direccion-container">
      <h2>Agregar dirección</h2>
      <form className="direccion-form">
        <div className="form-group">
          <label>Información del destinatario*</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo (Nombre y Apellido)"
            value={direccion.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>RUT (Sin puntos y con guión)*</label>
          <input
            type="text"
            name="rut"
            placeholder="Ingrese su RUT sin puntos y con guión"
            value={direccion.rut}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono*</label>
          <input
            type="tel"
            name="telefono"
            placeholder="Ingrese su número de teléfono"
            value={direccion.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Región*</label>
          <select
            name="region"
            value={direccion.region}
            onChange={handleChange}
          >
            <option value="">Seleccione una región</option>
            <option value="Metropolitana">Metropolitana</option>
            <option value="Valparaíso">Valparaíso</option>
            {/* Agregar más opciones de regiones según corresponda */}
          </select>
        </div>
        <div className="form-group">
          <label>Comuna*</label>
          <select
            name="comuna"
            value={direccion.comuna}
            onChange={handleChange}
          >
            <option value="">Seleccione una comuna</option>
            <option value="Santiago">Santiago</option>
            <option value="Viña del Mar">Viña del Mar</option>
            {/* Agregar más opciones de comunas según corresponda */}
          </select>
        </div>
        <div className="form-group">
          <label>Calle y Número*</label>
          <input
            type="text"
            name="calleNumero"
            placeholder="Ingrese el nombre de la calle y número"
            value={direccion.calleNumero}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Dpto. / Casa / Oficina (opcional)</label>
          <input
            type="text"
            name="departamento"
            placeholder="Ejemplo, Oficina3, Casa5"
            value={direccion.departamento}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Descartar cambios
          </button>
          <button type="button" className="confirm-btn" onClick={() => onConfirm(direccion)}>
            Confirmar dirección
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarDireccion;
