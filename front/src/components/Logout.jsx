import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Llama a tu API para realizar el logout en el backend
            const response = await axios.post('http://127.0.0.1:8000/logout');

            // Realiza la limpieza local (ejemplo: eliminar tokens, cookies, etc.)

            // Redirige al usuario a la página de login después del logout
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
