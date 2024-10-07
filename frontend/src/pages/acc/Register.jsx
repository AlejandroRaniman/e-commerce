import React, { useState } from 'react';
import '../../styles/acc/register.css'; // Asegúrate de crear este archivo CSS

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        contraseña: '',
        confirmarContraseña: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos al backend
        console.log(formData);
    };

    return (
        <div className="register-page-huamao">
            <div className="register-container-huamao">
                <h2>Crea una Cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group-huamao">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </div>
                    <div className="form-group-huamao">
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
                    </div>
                    <div className="form-group-huamao">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group-huamao">
                        <label htmlFor="telefono">Número de Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
                    </div>
                    <div className="form-group-huamao">
                        <label htmlFor="contraseña">Contraseña</label>
                        <input type="password" id="contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
                    </div>
                    <div className="form-group-huamao">
                        <label htmlFor="confirmarContraseña">Confirmar Contraseña</label>
                        <input type="password" id="confirmarContraseña" name="confirmarContraseña" value={formData.confirmarContraseña} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="register-button-huamao">Registrarse</button>
                </form>
                <div className="login-link-huamao">
                    <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
