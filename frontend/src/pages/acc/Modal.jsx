import React from 'react';
import '../../styles/acc/Modal.css'; // Archivo CSS para el estilo del modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
