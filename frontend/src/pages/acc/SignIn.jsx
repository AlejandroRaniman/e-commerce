import React, { useState, useContext } from 'react';
import { loginUser } from '../../api/apiClient';
import { AuthContext } from '../../context/AuthContext';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext); // Cambiado de setUser a login

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { username, password };

        try {
            console.log("Sending login request:", data);
            const response = await loginUser(data);
            console.log("Received response:", response);

            if (response.message === 'login_success') {
                // Llamamos a la función `login` del contexto para guardar el usuario y el token
                login({ username: response.username, role: response.role, access_token: response.access_token });
                if (response.role === 'admin') {
                    // Redirigir al panel de administración de Flask-Admin
                    window.location.href = 'http://localhost:5000/admin'; 
                } else {
                    // Redirigir a la página principal si no es administrador
                    window.location.href = '/'; 
                }
            } else {
                setError('Inicio de sesión inválido');
            }
        } catch (err) {
            console.error("Error durante el inicio de sesión", err);
            setError('El inicio de sesión falló. Inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default SignIn;
