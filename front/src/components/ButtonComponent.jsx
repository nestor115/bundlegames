import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/Auth.jsx";


const ButtonComponent = ({ route,buttonText}) => {
    const navigate = useNavigate();
  const { logout } = useAuth();

    const handleClick = async () => {
        if (route === '/login' && buttonText != 'Login') {
            logout();
    }else{
        navigate(route);
    }
    };

    return (
        <button onClick={handleClick}>{buttonText}</button>
    );
};

export default ButtonComponent;
