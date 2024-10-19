import React, { useState } from 'react';
import AgregarDireccion from './AgregarDireccion'; // Importar el componente
import '../../styles/acc/HistorialDirecciones.css';

const HistorialDirecciones = () => {
  const [direcciones, setDirecciones] = useState([
    {
      id: 1,
      nombre: 'Matías Vásquez',
      rut: '12.345.678-9',
      telefono: '+56 961354',
      region: 'Metropolitana',
      comuna: 'Santiago',
      calleNumero: 'Av. Siempre Viva 742',
    },
    {
      id: 2,
      nombre: 'Juan Pérez',
      rut: '12.345.678-0',
      telefono: '+56 912345',
      region: 'Valparaíso',
      comuna: 'Viña del Mar',
      calleNumero: 'Calle Falsa 123',
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleAdd = () => {
    setMostrarFormulario(true);
  };

  const handleCancel = () => {
    setMostrarFormulario(false);
  };

  const handleConfirm = (nuevaDireccion) => {
    setDirecciones([...direcciones, { id: direcciones.length + 1, ...nuevaDireccion }]);
    setMostrarFormulario(false);
  };

  return (
    <div className="historial-direcciones-container">
      <h2 className="titulo-historial">Historial de Direcciones</h2>
      <div className="direccion-lista">
        {direcciones.map((direccion) => (
          <div key={direccion.id} className="direccion-card">
            <h3 className="direccion-titulo">Dirección de Envío</h3>
            <div className="direccion-detalles">
              <p><strong>Nombre:</strong> {direccion.nombre}</p>
              <p><strong>RUT:</strong> {direccion.rut}</p>
              <p><strong>Teléfono:</strong> {direccion.telefono}</p>
              <p><strong>Región:</strong> {direccion.region}</p>
              <p><strong>Comuna:</strong> {direccion.comuna}</p>
              <p><strong>Calle y Número:</strong> {direccion.calleNumero}</p>
            </div>
          </div>
        ))}

        {/* Mostrar formulario de agregar dirección si se hace clic en agregar */}
        {mostrarFormulario ? (
          <AgregarDireccion onConfirm={handleConfirm} onCancel={handleCancel} />
        ) : (
          <div className="nueva-direccion-card">
            <button className="agregar-btn" onClick={handleAdd}>
              + Agregar Nueva Dirección
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorialDirecciones;
