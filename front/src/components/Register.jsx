import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const registerUser = async (userData) =>{
       try{
        const response = await axios.post('http://127.0.0.1:8000/register2', userData);
        console.log(response.data);
       } catch (error) {
        if (error.response) {
            // La solicitud fue hecha pero el servidor respondió con un código de error
            console.error('Error:', error.response.data);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error('No response from server:', error.request);
        } else {
            // Algo sucedió en la configuración de la solicitud que provocó un error
            console.error('Error setting up request:', error.message);
        }
    }
};

    const handleRegister =() => {

        const userData ={
            name: nameValue,
            email: emailValue,
            password: passwordValue
        };
        console.log(userData);

        registerUser(userData);
    }

    

    return(
        <div>
            <h1>Registrarse</h1>
            <input type="text" name="name" id="name" placeholder='nombre'
            value={nameValue} 
            onChange={(e)=> setNameValue(e.target.value)}/>
            <input type="email" name="email" id="email" placeholder='correo'
            value={emailValue} 
            onChange={(e)=> setEmailValue(e.target.value)}/>
            <input type="password" name="password" id="password" placeholder='contraseña'
            value={passwordValue} 
            onChange={(e)=> setPasswordValue(e.target.value)}/>
            <button onClick={handleRegister}>Registrarse</button>
        </div>
    )

};
export default Register;