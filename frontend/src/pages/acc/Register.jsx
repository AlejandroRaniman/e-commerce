import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/acc/register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                setMessage('Registro exitoso, redirigiendo...');
                setTimeout(() => {
                    navigate('/signin');
                }, 2000);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Ocurrió un error, intente nuevamente');
        }
    };

    return (
        <div className="register-page-huamao">
            <div className="register-container-huamao">
                <h2>Registrar Usuario</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleRegister}>
                    <div className="form-group-huamao">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-huamao">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-huamao">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button-huamao">Registrarse</button>
                </form>
                <div className="login-link-huamao">
                    <p>¿Ya tienes una cuenta? <a href="/signin">Inicia sesión aquí</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;