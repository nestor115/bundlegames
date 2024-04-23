import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ButtonComponent = ({ route,buttonText}) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        if (route === '/login' && buttonText != 'Login') {
            
        
        try {
            // Llama a tu API para realizar el logout en el backend
            const response = await axios.get('http://127.0.0.1:8000/logout',{ withCredentials: true});

            // Realiza la limpieza local (ejemplo: eliminar tokens, cookies, etc.)

            // Redirige al usuario a la página de login después del logout
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }else{
        navigate(route);
    }

    };

    return (
        <button onClick={handleClick}>{buttonText}</button>
    );
};

export default ButtonComponent;
