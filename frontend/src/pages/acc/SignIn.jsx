import React from 'react';
import '../../styles/acc/signIn.css'; // Cambiar el nombre del archivo CSS

const SignIn = () => {
    return (
        <div className="sign-in-page">
            <div className="sign-in-container">
                <h2>Ingresa a tu Cuenta</h2>
                <form>
                    <div className="sign-in-form-group">
                        <label htmlFor="email">Correo/Número Teléfono</label>
                        <input type="text" id="email" name="email" required />
                    </div>
                    <div className="sign-in-form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="sign-in-button">Iniciar sesión</button>
                </form>
                
                {/* Enlace para ir a la página de registro */}
                <div className="sign-in-link">
                    <p>¿Aún no tienes una cuenta? <a href="/register">Regístrate ahora</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
