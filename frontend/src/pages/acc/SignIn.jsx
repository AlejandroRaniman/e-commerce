import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('/login', { username, password })
            .then(response => {
                if (response.data.success) {
                    // Manejar el inicio de sesión exitoso
                    console.log('Usuario logueado con éxito');
                } else {
                    console.log('Usuario o contraseña incorrectos');
                }
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
            });
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default SignIn;
