import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/apiClient';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/acc/signIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ username, password });

            if (response.message === 'login_success') {
                login({ username: response.username, role: response.role, access_token: response.access_token });
                setMessage('Inicio de sesión exitoso, redirigiendo...');
                setTimeout(() => {
                    if (response.role === 'admin') {
                        window.location.href = 'http://localhost:5000/admin';
                    } else {
                        navigate('/');
                    }
                }, 2000);
            } else {
                setMessage('Inicio de sesión inválido');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Ocurrió un error, intente nuevamente');
        }
    };

    return (
        <div className="sign-in-page">
            <div className="sign-in-container">
                <h2>Iniciar Sesión</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSignIn}>
                    <div className="sign-in-form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="sign-in-form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="sign-in-button">Iniciar Sesión</button>
                </form>
                <div className="sign-in-link">
                    <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;