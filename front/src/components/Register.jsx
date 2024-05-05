import React, { useState, useEffect } from 'react';

const Register = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const registerUser = async (userData) =>{
       try{
        const response = await fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Si es necesario para CORS
            },
            body: JSON.stringify(userData),
            credentials: 'include', // Para incluir las cookies en la solicitud
        });
        const responseData = await response.json();
        if (response.ok) {
            console.log(responseData);
            // Aquí puedes manejar la respuesta exitosa según tus necesidades
        } else {
            // Si la respuesta no es exitosa, lanzamos un error con el mensaje del servidor
            throw new Error(responseData.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

    const handleRegister =() => {

        const userData ={
            email: emailValue,
            password: passwordValue
        };
        console.log(userData);

        registerUser(userData);
    }

    

    return(
        <div>
            <h1>Registrarse</h1>
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